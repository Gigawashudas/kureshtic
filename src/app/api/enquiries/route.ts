import { NextResponse } from "next/server";

import { Resend } from "resend";
import { z } from "zod";

import { createAdminClient } from "@/lib/supabase/admin";
import { rateLimit } from "@/lib/rate-limit";

const enquirySchema = z.object({
  website: z.string().max(0).optional(),

  firstName: z.string().trim().min(2, "Please enter your first name.").max(50, "First name is too long."),

  lastName: z.string().trim().min(2, "Please enter your last name.").max(50, "Last name is too long."),

  email: z.string().trim().email("Please enter a valid email address.").max(254, "Email address is too long."),

  phone: z.string().trim().min(7, "Please enter a valid phone number.").max(30, "Phone number is too long."),

  company: z.string().trim().max(100, "Company name is too long.").optional(),

  projectType: z.enum(["Website", "Web Application", "Mobile Application", "Digital System", "Not Sure Yet"]),

  message: z.string().trim().min(10, "Please tell us a little more about your project.").max(5000, "Message is too long."),
});

export async function POST(request: Request) {
  try {
    const forwardedFor = request.headers.get("x-forwarded-for");
    const realIp = request.headers.get("x-real-ip");

    const ip = forwardedFor?.split(",")[0]?.trim() || realIp || "unknown";

    const allowed = rateLimit(ip);

    if (!allowed) {
      return NextResponse.json(
        {
          error: "Too many enquiries. Please try again later.",
        },
        { status: 429 },
      );
    }

    const body = await request.json();

    const result = enquirySchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          error: "Please check the information you entered.",
          issues: result.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const { website, firstName, lastName, email, phone, company, projectType, message } = result.data;

    if (website) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    const supabase = createAdminClient();

    const { error } = await supabase.from("enquiries").insert({
      first_name: firstName,
      last_name: lastName,
      email,
      phone,
      company: company || null,
      project_type: projectType,
      message,
      status: "new",
    });

    if (error) {
      console.error("Supabase enquiry insert error:", error);

      return NextResponse.json(
        {
          error: "We could not submit your enquiry. Please try again.",
        },
        { status: 500 },
      );
    }

    const resendApiKey = process.env.RESEND_API_KEY;

    if (!resendApiKey) {
      console.error("Missing RESEND_API_KEY");

      return NextResponse.json(
        {
          success: true,
          message: "Your enquiry has been submitted successfully.",
        },
        { status: 201 },
      );
    }

    const resend = new Resend(resendApiKey);

    const { error: emailError } = await resend.emails.send({
      from: "KURESHTIC <hello@kureshtic.com>",
      to: ["hreevud@gmail.com"],
      replyTo: email,
      subject: `New KURESHTIC Enquiry — ${projectType}`,
      text: ["New KURESHTIC enquiry", "", `Name: ${firstName} ${lastName}`, `Email: ${email}`, `Phone: ${phone}`, `Company: ${company || "Not provided"}`, `Project Type: ${projectType}`, "", "Message:", message].join("\n"),
    });

    if (emailError) {
      console.error("Resend enquiry notification error:", emailError);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Your enquiry has been submitted successfully.",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Enquiry API error:", error);

    return NextResponse.json(
      {
        error: "Something went wrong. Please try again.",
      },
      { status: 500 },
    );
  }
}
