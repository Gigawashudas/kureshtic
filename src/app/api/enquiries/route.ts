import { NextResponse } from "next/server";
import { z } from "zod";

import { rateLimit } from "@/lib/rate-limit";
import { supabaseAdmin } from "@/lib/supabase/server";

const enquirySchema = z.object({
  website: z.string().max(0).optional(),
  name: z.string().trim().min(2, "Please enter your name.").max(100, "Name is too long."),
  email: z.string().trim().email("Please enter a valid email address."),
  company: z.string().trim().max(150, "Company name is too long.").optional().or(z.literal("")),
  projectType: z.enum(["Website", "Web Application", "Mobile Application", "Digital System", "Not Sure Yet"]),
  message: z.string().trim().min(10, "Please tell us a little about your project.").max(5000, "Message is too long."),
});

function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }

  return request.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(request: Request) {
  const clientIp = getClientIp(request);
  const limit = rateLimit(clientIp);

  if (!limit.success) {
    const retryAfter = Math.max(1, Math.ceil((limit.resetAt - Date.now()) / 1000));

    return NextResponse.json(
      {
        success: false,
        message: "Too many enquiries from this connection. Please try again later.",
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(retryAfter),
        },
      },
    );
  }

  try {
    const body: unknown = await request.json();

    const result = enquirySchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Please check the information you entered.",
          errors: result.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const { website, name, email, company, projectType, message } = result.data;

    if (website) {
      return NextResponse.json({
        success: true,
        message: "Your enquiry has been received.",
      });
    }

    const { error } = await supabaseAdmin.from("enquiries").insert({
      name,
      email,
      company: company || null,
      project_type: projectType,
      message,
    });

    if (error) {
      console.error("Supabase enquiry error:", error);

      return NextResponse.json(
        {
          success: false,
          message: "We could not submit your enquiry right now. Please try again.",
        },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Your enquiry has been received.",
    });
  } catch (error) {
    console.error("Enquiry API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong while submitting your enquiry. Please try again.",
      },
      { status: 500 },
    );
  }
}
