"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ImagePlus, Save, X } from "lucide-react";
import { FormEvent, useState } from "react";
import { createClient } from "@/lib/supabase/client";
const categories = ["Website", "Web Application", "Mobile Application", "Digital System"] as const;
const technologyAreas = ["Digital Experiences", "Applications", "Data & Systems", "Integrations", "Automation", "Intelligent Solutions"];
const MAX_IMAGE_SIZE = 10 * 1024 * 1024;
function generateSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}
function sanitizeFileName(fileName: string) {
  return fileName
    .toLowerCase()
    .replace(/[^a-z0-9.-]/g, "-")
    .replace(/-+/g, "-");
}
function normalizeProjectUrl(value: string) {
  const trimmedValue = value.trim();
  if (!trimmedValue) {
    return null;
  }
  if (/^[a-z][a-z\d+.-]*:\/\//i.test(trimmedValue)) {
    return trimmedValue;
  }
  return `https://${trimmedValue}`;
}
export default function NewProjectPage() {
  const router = useRouter();
  const supabase = createClient();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState<(typeof categories)[number]>("Website");
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [clientName, setClientName] = useState("");
  const [projectUrl, setProjectUrl] = useState("");
  const [selectedTechnologyAreas, setSelectedTechnologyAreas] = useState<string[]>([]);
  const [featured, setFeatured] = useState(false);
  const [published, setPublished] = useState(false);
  const [sortOrder, setSortOrder] = useState("0");
  const [desktopImage, setDesktopImage] = useState<File | null>(null);
  const [mobileImage, setMobileImage] = useState<File | null>(null);
  const [galleryImages, setGalleryImages] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  function handleTitleChange(value: string) {
    setTitle(value);
    if (!slug || slug === generateSlug(title)) {
      setSlug(generateSlug(value));
    }
  }
  function toggleTechnologyArea(area: string) {
    setSelectedTechnologyAreas((current) => (current.includes(area) ? current.filter((item) => item !== area) : [...current, area]));
  }
  function validateImage(file: File) {
    if (!file.type.startsWith("image/")) {
      return "Only image files are allowed.";
    }
    if (file.size > MAX_IMAGE_SIZE) {
      return "Each image must be smaller than 10 MB.";
    }
    return null;
  }
  function handleDesktopImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    const validationError = validateImage(file);
    if (validationError) {
      setError(validationError);
      event.target.value = "";
      return;
    }
    setError("");
    setDesktopImage(file);
    event.target.value = "";
  }
  function handleMobileImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    const validationError = validateImage(file);
    if (validationError) {
      setError(validationError);
      event.target.value = "";
      return;
    }
    setError("");
    setMobileImage(file);
    event.target.value = "";
  }
  function handleGalleryImagesChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);
    if (files.length === 0) {
      return;
    }
    for (const file of files) {
      const validationError = validateImage(file);
      if (validationError) {
        setError(validationError);
        event.target.value = "";
        return;
      }
    }
    setError("");
    setGalleryImages((current) => [...current, ...files]);
    event.target.value = "";
  }
  function removeDesktopImage() {
    setDesktopImage(null);
  }
  function removeMobileImage() {
    setMobileImage(null);
  }
  function removeGalleryImage(index: number) {
    setGalleryImages((current) => current.filter((_, imageIndex) => imageIndex !== index));
  }
  async function uploadImage(projectId: string, file: File, type: "desktop" | "mobile" | "gallery", index?: number) {
    const safeFileName = sanitizeFileName(file.name);
    const timestamp = Date.now();
    let filePath: string;
    if (type === "desktop") {
      filePath = `projects/${projectId}/desktop-${timestamp}-${safeFileName}`;
    } else if (type === "mobile") {
      filePath = `projects/${projectId}/mobile-${timestamp}-${safeFileName}`;
    } else {
      filePath = `projects/${projectId}/gallery-${index ?? 0}-${timestamp}-${safeFileName}`;
    }
    const { error: uploadError } = await supabase.storage.from("project-images").upload(filePath, file, { cacheControl: "3600", upsert: false });
    if (uploadError) {
      throw new Error(uploadError.message);
    }
    return filePath;
  }
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (!title.trim()) {
      setError("Please enter a project title.");
      return;
    }
    if (!slug.trim()) {
      setError("Please enter a project slug.");
      return;
    }
    if (!shortDescription.trim()) {
      setError("Please enter a short description.");
      return;
    }
    if (!description.trim()) {
      setError("Please enter a project description.");
      return;
    }
    if (!desktopImage) {
      setError("Please upload the desktop view image.");
      return;
    }
    if (!mobileImage) {
      setError("Please upload the mobile view image.");
      return;
    }
    setSubmitting(true);
    let projectId: string | null = null;
    let uploadedDesktopPath: string | null = null;
    let uploadedMobilePath: string | null = null;
    const uploadedGalleryPaths: string[] = [];
    try {
      const { data: project, error: insertError } = await supabase
        .from("projects")
        .insert({ title: title.trim(), slug: slug.trim(), category, short_description: shortDescription.trim(), description: description.trim(), client_name: clientName.trim() || null, project_url: normalizeProjectUrl(projectUrl), technology_areas: selectedTechnologyAreas, featured, published, sort_order: Number(sortOrder) || 0 })
        .select("id")
        .single();
      if (insertError) {
        if (insertError.code === "23505") {
          throw new Error("A project with this slug already exists.");
        }
        throw new Error(insertError.message);
      }
      projectId = project.id;
      uploadedDesktopPath = await uploadImage(project.id, desktopImage, "desktop");
      uploadedMobilePath = await uploadImage(project.id, mobileImage, "mobile");
      for (let index = 0; index < galleryImages.length; index += 1) {
        const filePath = await uploadImage(project.id, galleryImages[index], "gallery", index);
        uploadedGalleryPaths.push(filePath);
      }
      const { error: updateError } = await supabase.from("projects").update({ desktop_image: uploadedDesktopPath, mobile_image: uploadedMobilePath, gallery: uploadedGalleryPaths }).eq("id", project.id);
      if (updateError) {
        throw new Error(updateError.message);
      }
      router.push("/admin/projects");
      router.refresh();
    } catch (submissionError) {
      const cleanupPaths = [uploadedDesktopPath, uploadedMobilePath, ...uploadedGalleryPaths].filter((path): path is string => Boolean(path));
      if (cleanupPaths.length > 0) {
        await supabase.storage.from("project-images").remove(cleanupPaths);
      }
      if (projectId) {
        await supabase.from("projects").delete().eq("id", projectId);
      }
      setError(submissionError instanceof Error ? submissionError.message : "Something went wrong while creating the project.");
    } finally {
      setSubmitting(false);
    }
  }
  return (
    <main className="min-h-screen bg-background text-foreground">
      {" "}
      <div className="k-container py-8 md:py-12">
        {" "}
        <Link href="/admin/projects" className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
          {" "}
          <ArrowLeft className="h-4 w-4" /> Back to projects{" "}
        </Link>{" "}
        <header className="mb-10">
          {" "}
          <p className="k-eyebrow mb-3"> Admin / Projects / New </p> <h1 className="k-heading-1"> Create Project </h1> <p className="k-body-large mt-3 max-w-2xl text-muted-foreground"> Add a project to the KURESHTIC portfolio. </p>{" "}
        </header>{" "}
        <form onSubmit={handleSubmit} className="max-w-4xl space-y-8">
          {" "}
          <section className="rounded-xl border border-border bg-surface p-6 md:p-8">
            {" "}
            <div className="mb-6">
              {" "}
              <p className="k-eyebrow mb-2"> Basic information </p> <h2 className="k-heading-3"> Project details </h2>{" "}
            </div>{" "}
            <div className="space-y-6">
              {" "}
              <div>
                {" "}
                <label htmlFor="title" className="mb-2 block text-sm font-medium">
                  {" "}
                  Project title{" "}
                </label>{" "}
                <input id="title" type="text" value={title} onChange={(event) => handleTitleChange(event.target.value)} placeholder="NOVA" className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-accent" />{" "}
              </div>{" "}
              <div>
                {" "}
                <label htmlFor="slug" className="mb-2 block text-sm font-medium">
                  {" "}
                  Slug{" "}
                </label>{" "}
                <input id="slug" type="text" value={slug} onChange={(event) => setSlug(generateSlug(event.target.value))} placeholder="nova" className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-accent" /> <p className="mt-2 text-xs text-muted-foreground"> Used in the project URL. </p>{" "}
              </div>{" "}
              <div>
                {" "}
                <label htmlFor="category" className="mb-2 block text-sm font-medium">
                  {" "}
                  Category{" "}
                </label>{" "}
                <select id="category" value={category} onChange={(event) => setCategory(event.target.value as (typeof categories)[number])} className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-accent">
                  {" "}
                  {categories.map((item) => (
                    <option key={item} value={item}>
                      {" "}
                      {item}{" "}
                    </option>
                  ))}{" "}
                </select>{" "}
              </div>{" "}
              <div>
                {" "}
                <label htmlFor="shortDescription" className="mb-2 block text-sm font-medium">
                  {" "}
                  Short description{" "}
                </label>{" "}
                <textarea id="shortDescription" value={shortDescription} onChange={(event) => setShortDescription(event.target.value)} placeholder="A short description used in project cards." rows={3} className="w-full resize-y rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-accent" />{" "}
              </div>{" "}
              <div>
                {" "}
                <label htmlFor="description" className="mb-2 block text-sm font-medium">
                  {" "}
                  Full description{" "}
                </label>{" "}
                <textarea id="description" value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Describe the project, problem, solution, and outcome." rows={8} className="w-full resize-y rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-accent" />{" "}
              </div>{" "}
            </div>{" "}
          </section>{" "}
          <section className="rounded-xl border border-border bg-surface p-6 md:p-8">
            {" "}
            <div className="mb-6">
              {" "}
              <p className="k-eyebrow mb-2"> Additional information </p> <h2 className="k-heading-3"> Project context </h2>{" "}
            </div>{" "}
            <div className="space-y-6">
              {" "}
              <div>
                {" "}
                <label htmlFor="clientName" className="mb-2 block text-sm font-medium">
                  {" "}
                  Client name{" "}
                </label>{" "}
                <input id="clientName" type="text" value={clientName} onChange={(event) => setClientName(event.target.value)} placeholder="Optional" className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-accent" />{" "}
              </div>{" "}
              <div>
                {" "}
                <label htmlFor="projectUrl" className="mb-2 block text-sm font-medium">
                  {" "}
                  Project URL{" "}
                </label>{" "}
                <input id="projectUrl" type="text" inputMode="url" value={projectUrl} onChange={(event) => setProjectUrl(event.target.value)} placeholder="example.com" className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-accent" /> <p className="mt-2 text-xs text-muted-foreground"> Optional. HTTPS will be added automatically when no protocol is provided. </p>{" "}
              </div>{" "}
              <div>
                {" "}
                <p className="mb-3 text-sm font-medium"> Technology areas </p>{" "}
                <div className="grid gap-3 sm:grid-cols-2">
                  {" "}
                  {technologyAreas.map((area) => {
                    const selected = selectedTechnologyAreas.includes(area);
                    return (
                      <label key={area} className="flex cursor-pointer items-center gap-3 rounded-lg border border-border px-4 py-3 text-sm transition-colors hover:border-accent">
                        {" "}
                        <input type="checkbox" checked={selected} onChange={() => toggleTechnologyArea(area)} className="h-4 w-4 accent-accent" /> <span>{area}</span>{" "}
                      </label>
                    );
                  })}{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
          </section>{" "}
          <section className="rounded-xl border border-border bg-surface p-6 md:p-8">
            {" "}
            <div className="mb-6">
              {" "}
              <p className="k-eyebrow mb-2"> Media </p> <h2 className="k-heading-3"> Desktop & mobile views </h2> <p className="k-body mt-2 text-muted-foreground"> These two images represent the primary desktop and mobile versions of the project. Both are required. </p>{" "}
            </div>{" "}
            <div className="grid gap-6 md:grid-cols-2">
              {" "}
              <div>
                {" "}
                <label htmlFor="desktopImage" className="mb-3 block text-sm font-medium">
                  {" "}
                  Desktop view image <span className="ml-1 text-accent">*</span>{" "}
                </label>{" "}
                {desktopImage ? (
                  <div className="rounded-lg border border-border p-4">
                    {" "}
                    <div className="flex items-center justify-between gap-4">
                      {" "}
                      <div className="flex min-w-0 items-center gap-3">
                        {" "}
                        <ImagePlus className="h-5 w-5 shrink-0 text-accent" />{" "}
                        <div className="min-w-0">
                          {" "}
                          <p className="truncate text-sm font-medium"> {desktopImage.name} </p> <p className="text-xs text-muted-foreground"> {(desktopImage.size / 1024 / 1024).toFixed(2)} MB </p>{" "}
                        </div>{" "}
                      </div>{" "}
                      <button type="button" onClick={removeDesktopImage} className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground" aria-label="Remove desktop view image">
                        {" "}
                        <X className="h-4 w-4" />{" "}
                      </button>{" "}
                    </div>{" "}
                  </div>
                ) : (
                  <label htmlFor="desktopImage" className="flex min-h-52 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-border px-6 py-10 text-center transition-colors hover:border-accent">
                    {" "}
                    <ImagePlus className="mb-3 h-7 w-7 text-muted-foreground" /> <span className="text-sm font-medium"> Choose desktop image </span> <span className="mt-1 text-xs text-muted-foreground"> Landscape screenshot </span> <span className="mt-1 text-xs text-muted-foreground"> JPG, PNG, WebP </span>{" "}
                  </label>
                )}{" "}
                <input id="desktopImage" type="file" accept="image/*" onChange={handleDesktopImageChange} className="sr-only" />{" "}
              </div>{" "}
              <div>
                {" "}
                <label htmlFor="mobileImage" className="mb-3 block text-sm font-medium">
                  {" "}
                  Mobile view image <span className="ml-1 text-accent">*</span>{" "}
                </label>{" "}
                {mobileImage ? (
                  <div className="rounded-lg border border-border p-4">
                    {" "}
                    <div className="flex items-center justify-between gap-4">
                      {" "}
                      <div className="flex min-w-0 items-center gap-3">
                        {" "}
                        <ImagePlus className="h-5 w-5 shrink-0 text-accent" />{" "}
                        <div className="min-w-0">
                          {" "}
                          <p className="truncate text-sm font-medium"> {mobileImage.name} </p> <p className="text-xs text-muted-foreground"> {(mobileImage.size / 1024 / 1024).toFixed(2)} MB </p>{" "}
                        </div>{" "}
                      </div>{" "}
                      <button type="button" onClick={removeMobileImage} className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground" aria-label="Remove mobile view image">
                        {" "}
                        <X className="h-4 w-4" />{" "}
                      </button>{" "}
                    </div>{" "}
                  </div>
                ) : (
                  <label htmlFor="mobileImage" className="flex min-h-52 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-border px-6 py-10 text-center transition-colors hover:border-accent">
                    {" "}
                    <ImagePlus className="mb-3 h-7 w-7 text-muted-foreground" /> <span className="text-sm font-medium"> Choose mobile image </span> <span className="mt-1 text-xs text-muted-foreground"> Portrait screenshot </span> <span className="mt-1 text-xs text-muted-foreground"> JPG, PNG, WebP </span>{" "}
                  </label>
                )}{" "}
                <input id="mobileImage" type="file" accept="image/*" onChange={handleMobileImageChange} className="sr-only" />{" "}
              </div>{" "}
            </div>{" "}
          </section>{" "}
          <section className="rounded-xl border border-border bg-surface p-6 md:p-8">
            {" "}
            <div className="mb-6">
              {" "}
              <p className="k-eyebrow mb-2"> Gallery </p> <h2 className="k-heading-3"> Additional project images </h2> <p className="k-body mt-2 text-muted-foreground"> Optional. Add additional images to show details, screens, features, or other parts of the project. </p>{" "}
            </div>{" "}
            <div>
              {" "}
              <label htmlFor="galleryImages" className="flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-border px-6 py-10 text-center transition-colors hover:border-accent">
                {" "}
                <ImagePlus className="mb-3 h-7 w-7 text-muted-foreground" /> <span className="text-sm font-medium"> Add gallery images </span> <span className="mt-1 text-xs text-muted-foreground"> Optional · You can select multiple images </span> <span className="mt-1 text-xs text-muted-foreground"> JPG, PNG, WebP · Maximum 10 MB each </span>{" "}
              </label>{" "}
              <input id="galleryImages" type="file" accept="image/*" multiple onChange={handleGalleryImagesChange} className="sr-only" />{" "}
              {galleryImages.length > 0 ? (
                <div className="mt-4 space-y-2">
                  {" "}
                  {galleryImages.map((file, index) => (
                    <div key={`${file.name}-${file.size}-${index}`} className="flex items-center justify-between gap-4 rounded-lg border border-border px-4 py-3">
                      {" "}
                      <div className="flex min-w-0 items-center gap-3">
                        {" "}
                        <ImagePlus className="h-4 w-4 shrink-0 text-muted-foreground" />{" "}
                        <div className="min-w-0">
                          {" "}
                          <p className="truncate text-sm"> {file.name} </p> <p className="text-xs text-muted-foreground"> {(file.size / 1024 / 1024).toFixed(2)} MB </p>{" "}
                        </div>{" "}
                      </div>{" "}
                      <button type="button" onClick={() => removeGalleryImage(index)} className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground" aria-label={`Remove ${file.name}`}>
                        {" "}
                        <X className="h-4 w-4" />{" "}
                      </button>{" "}
                    </div>
                  ))}{" "}
                </div>
              ) : null}{" "}
            </div>{" "}
          </section>{" "}
          <section className="rounded-xl border border-border bg-surface p-6 md:p-8">
            {" "}
            <div className="mb-6">
              {" "}
              <p className="k-eyebrow mb-2"> Publishing </p> <h2 className="k-heading-3"> Visibility & ordering </h2>{" "}
            </div>{" "}
            <div className="space-y-5">
              {" "}
              <label className="flex cursor-pointer items-start gap-3">
                {" "}
                <input type="checkbox" checked={featured} onChange={(event) => setFeatured(event.target.checked)} className="mt-0.5 h-4 w-4 accent-accent" />{" "}
                <span>
                  {" "}
                  <span className="block text-sm font-medium"> Featured project </span> <span className="mt-1 block text-xs text-muted-foreground"> Show this project in the homepage Featured Work section. </span>{" "}
                </span>{" "}
              </label>{" "}
              <label className="flex cursor-pointer items-start gap-3">
                {" "}
                <input type="checkbox" checked={published} onChange={(event) => setPublished(event.target.checked)} className="mt-0.5 h-4 w-4 accent-accent" />{" "}
                <span>
                  {" "}
                  <span className="block text-sm font-medium"> Published </span> <span className="mt-1 block text-xs text-muted-foreground"> Make this project visible on the public website. </span>{" "}
                </span>{" "}
              </label>{" "}
              <div className="max-w-xs">
                {" "}
                <label htmlFor="sortOrder" className="mb-2 block text-sm font-medium">
                  {" "}
                  Sort order{" "}
                </label>{" "}
                <input id="sortOrder" type="number" min="0" value={sortOrder} onChange={(event) => setSortOrder(event.target.value)} className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-accent" /> <p className="mt-2 text-xs text-muted-foreground"> Lower numbers appear first. </p>{" "}
              </div>{" "}
            </div>{" "}
          </section>{" "}
          {error ? (
            <div role="alert" className="rounded-lg border border-error/30 bg-error/5 px-4 py-3 text-sm text-error">
              {" "}
              {error}{" "}
            </div>
          ) : null}{" "}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            {" "}
            <button type="submit" disabled={submitting} className="k-button k-button-primary inline-flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-60">
              {" "}
              <Save className="h-4 w-4" /> {submitting ? "Creating Project..." : "Create Project"}{" "}
            </button>{" "}
            <Link href="/admin/projects" className="k-button k-button-secondary inline-flex items-center justify-center">
              {" "}
              Cancel{" "}
            </Link>{" "}
          </div>{" "}
        </form>{" "}
      </div>{" "}
    </main>
  );
}
