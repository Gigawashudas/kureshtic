"use client";

import Link from "next/link";
import { ArrowLeft, ImagePlus, Save, Trash2, Upload, X } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

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

  if (/^[a-z][a-z0-9+.-]*:\/\//i.test(trimmedValue)) {
    return trimmedValue;
  }

  return `https://${trimmedValue}`;
}

interface Project {
  id: string;
  title: string;
  slug: string;
  category: (typeof categories)[number];
  short_description: string;
  description: string;
  client_name: string | null;
  project_url: string | null;
  cover_image: string | null;
  mobile_image: string | null;
  gallery: string[];
  technology_areas: string[];
  featured: boolean;
  published: boolean;
  sort_order: number;
}

interface ExistingImage {
  path: string;
  url: string;
}

export default function EditProjectPage() {
  const params = useParams();
  const router = useRouter();

  const [supabase] = useState(() => createClient());

  const projectId = typeof params.id === "string" ? params.id : "";

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

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

  const [existingDesktopImage, setExistingDesktopImage] = useState<ExistingImage | null>(null);
  const [existingMobileImage, setExistingMobileImage] = useState<ExistingImage | null>(null);

  const [removeExistingDesktop, setRemoveExistingDesktop] = useState(false);
  const [removeExistingMobile, setRemoveExistingMobile] = useState(false);

  const [existingGallery, setExistingGallery] = useState<ExistingImage[]>([]);
  const [removedGalleryPaths, setRemovedGalleryPaths] = useState<string[]>([]);

  const [newDesktopImage, setNewDesktopImage] = useState<File | null>(null);
  const [newDesktopPreview, setNewDesktopPreview] = useState<string | null>(null);

  const [newMobileImage, setNewMobileImage] = useState<File | null>(null);
  const [newMobilePreview, setNewMobilePreview] = useState<string | null>(null);

  const [newGalleryImages, setNewGalleryImages] = useState<File[]>([]);
  const [newGalleryPreviews, setNewGalleryPreviews] = useState<string[]>([]);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    async function loadProject() {
      if (!projectId) {
        setError("Invalid project ID.");
        setLoading(false);
        return;
      }

      const { data, error: fetchError } = await supabase.from("projects").select("id, title, slug, category, short_description, description, client_name, project_url, cover_image, mobile_image, gallery, technology_areas, featured, published, sort_order").eq("id", projectId).single();

      if (fetchError) {
        setError(fetchError.message);
        setLoading(false);
        return;
      }

      const project = data as Project;

      setTitle(project.title);
      setSlug(project.slug);
      setCategory(project.category);
      setShortDescription(project.short_description);
      setDescription(project.description);
      setClientName(project.client_name ?? "");
      setProjectUrl(project.project_url ?? "");
      setSelectedTechnologyAreas(project.technology_areas ?? []);
      setFeatured(project.featured);
      setPublished(project.published);
      setSortOrder(String(project.sort_order));

      const imageResponse = await fetch(`/api/admin/projects/${projectId}/images`, {
        method: "GET",
        cache: "no-store",
      });

      if (!imageResponse.ok) {
        const imageResult = await imageResponse.json().catch(() => null);

        throw new Error(imageResult?.error || "Project images could not be loaded.");
      }

      const imageResult = await imageResponse.json();

      setExistingDesktopImage(imageResult.desktop ?? null);
      setExistingMobileImage(imageResult.mobile ?? null);
      setExistingGallery(imageResult.gallery ?? []);

      setLoading(false);
    }

    loadProject().catch((loadError) => {
      setError(loadError instanceof Error ? loadError.message : "Something went wrong while loading the project.");

      setLoading(false);
    });
  }, [projectId, supabase]);

  useEffect(() => {
    if (!newDesktopImage) {
      setNewDesktopPreview(null);
      return;
    }

    const previewUrl = URL.createObjectURL(newDesktopImage);

    setNewDesktopPreview(previewUrl);

    return () => {
      URL.revokeObjectURL(previewUrl);
    };
  }, [newDesktopImage]);

  useEffect(() => {
    if (!newMobileImage) {
      setNewMobilePreview(null);
      return;
    }

    const previewUrl = URL.createObjectURL(newMobileImage);

    setNewMobilePreview(previewUrl);

    return () => {
      URL.revokeObjectURL(previewUrl);
    };
  }, [newMobileImage]);

  useEffect(() => {
    const previewUrls = newGalleryImages.map((file) => URL.createObjectURL(file));

    setNewGalleryPreviews(previewUrls);

    return () => {
      previewUrls.forEach((url) => {
        URL.revokeObjectURL(url);
      });
    };
  }, [newGalleryImages]);

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
    setNewDesktopImage(file);
    setRemoveExistingDesktop(false);

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
    setNewMobileImage(file);
    setRemoveExistingMobile(false);

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

    setNewGalleryImages((current) => [...current, ...files]);

    event.target.value = "";
  }

  function removeNewDesktopImage() {
    setNewDesktopImage(null);
  }

  function removeExistingDesktopImage() {
    setRemoveExistingDesktop(true);
    setExistingDesktopImage(null);
    setNewDesktopImage(null);
  }

  function removeNewMobileImage() {
    setNewMobileImage(null);
  }

  function removeExistingMobileImage() {
    setRemoveExistingMobile(true);
    setExistingMobileImage(null);
    setNewMobileImage(null);
  }

  function removeExistingGalleryImage(path: string) {
    setExistingGallery((current) => current.filter((image) => image.path !== path));

    setRemovedGalleryPaths((current) => (current.includes(path) ? current : [...current, path]));
  }

  function removeNewGalleryImage(index: number) {
    setNewGalleryImages((current) => current.filter((_, imageIndex) => imageIndex !== index));
  }

  async function uploadImage(file: File, type: "desktop" | "mobile" | "gallery", index?: number) {
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

    const { error: uploadError } = await supabase.storage.from("project-images").upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

    if (uploadError) {
      throw new Error(uploadError.message);
    }

    return filePath;
  }

  async function deleteStorageFiles(paths: string[]) {
    if (paths.length === 0) {
      return;
    }

    const { error: deleteError } = await supabase.storage.from("project-images").remove(paths);

    if (deleteError) {
      throw new Error(deleteError.message);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setSuccess(false);

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

    if (!existingDesktopImage && !newDesktopImage) {
      setError("Please provide a desktop view image.");
      return;
    }

    if (!existingMobileImage && !newMobileImage) {
      setError("Please provide a mobile view image.");
      return;
    }

    setSubmitting(true);

    const uploadedPaths: string[] = [];

    try {
      let updatedDesktopPath = existingDesktopImage?.path ?? null;
      let updatedMobilePath = existingMobileImage?.path ?? null;

      const previousDesktopPath = existingDesktopImage?.path ?? null;
      const previousMobilePath = existingMobileImage?.path ?? null;

      if (removeExistingDesktop) {
        updatedDesktopPath = null;
      }

      if (removeExistingMobile) {
        updatedMobilePath = null;
      }

      if (newDesktopImage) {
        const uploadedDesktopPath = await uploadImage(newDesktopImage, "desktop");

        uploadedPaths.push(uploadedDesktopPath);
        updatedDesktopPath = uploadedDesktopPath;
      }

      if (newMobileImage) {
        const uploadedMobilePath = await uploadImage(newMobileImage, "mobile");

        uploadedPaths.push(uploadedMobilePath);
        updatedMobilePath = uploadedMobilePath;
      }

      const updatedGalleryPaths = existingGallery.map((image) => image.path);

      for (let index = 0; index < newGalleryImages.length; index += 1) {
        const uploadedGalleryPath = await uploadImage(newGalleryImages[index], "gallery", existingGallery.length + index);

        uploadedPaths.push(uploadedGalleryPath);
        updatedGalleryPaths.push(uploadedGalleryPath);
      }

      const { error: updateError } = await supabase
        .from("projects")
        .update({
          title: title.trim(),
          slug: slug.trim(),
          category,
          short_description: shortDescription.trim(),
          description: description.trim(),
          client_name: clientName.trim() || null,
          project_url: normalizeProjectUrl(projectUrl),
          cover_image: updatedDesktopPath,
          mobile_image: updatedMobilePath,
          gallery: updatedGalleryPaths,
          technology_areas: selectedTechnologyAreas,
          featured,
          published,
          sort_order: Number(sortOrder) || 0,
          updated_at: new Date().toISOString(),
        })
        .eq("id", projectId);

      if (updateError) {
        if (updateError.code === "23505") {
          throw new Error("A project with this slug already exists.");
        }

        throw new Error(updateError.message);
      }

      const filesToDelete = [...removedGalleryPaths];

      if (previousDesktopPath && previousDesktopPath !== updatedDesktopPath) {
        filesToDelete.push(previousDesktopPath);
      }

      if (previousMobilePath && previousMobilePath !== updatedMobilePath) {
        filesToDelete.push(previousMobilePath);
      }

      await deleteStorageFiles(Array.from(new Set(filesToDelete)));

      setSuccess(true);

      router.push("/admin/projects");
      router.refresh();
    } catch (submissionError) {
      if (uploadedPaths.length > 0) {
        try {
          await deleteStorageFiles(uploadedPaths);
        } catch {
          // Preserve the original submission error.
        }
      }

      setError(submissionError instanceof Error ? submissionError.message : "Something went wrong while updating the project.");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-background text-foreground">
        <div className="k-container py-8 md:py-12">
          <div className="max-w-4xl space-y-8">
            <div className="h-5 w-32 animate-pulse rounded bg-muted" />

            <div className="space-y-3">
              <div className="h-4 w-32 animate-pulse rounded bg-muted" />
              <div className="h-10 w-64 animate-pulse rounded bg-muted" />
              <div className="h-5 w-full max-w-2xl animate-pulse rounded bg-muted" />
            </div>

            <div className="space-y-6 rounded-xl border border-border bg-surface p-6 md:p-8">
              <div className="h-6 w-40 animate-pulse rounded bg-muted" />
              <div className="h-12 w-full animate-pulse rounded-lg bg-muted" />
              <div className="h-12 w-full animate-pulse rounded-lg bg-muted" />
              <div className="h-32 w-full animate-pulse rounded-lg bg-muted" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error && !title) {
    return (
      <main className="min-h-screen bg-background text-foreground">
        <div className="k-container py-8 md:py-12">
          <Link href="/admin/projects" className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Back to projects
          </Link>

          <div role="alert" className="max-w-2xl rounded-lg border border-error/30 bg-error/5 px-4 py-3 text-sm text-error">
            {error}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="k-container py-8 md:py-12">
        <Link href="/admin/projects" className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
          <ArrowLeft className="h-4 w-4" />
          Back to projects
        </Link>

        <header className="mb-10">
          <p className="k-eyebrow mb-3">Admin / Projects / Edit</p>

          <h1 className="k-heading-1">Edit Project</h1>

          <p className="k-body-large mt-3 max-w-2xl text-muted-foreground">Update the project information and media used across the KURESHTIC portfolio.</p>
        </header>

        <form onSubmit={handleSubmit} className="max-w-4xl space-y-8">
          <section className="rounded-xl border border-border bg-surface p-6 md:p-8">
            <div className="mb-6">
              <p className="k-eyebrow mb-2">Basic information</p>

              <h2 className="k-heading-3">Project details</h2>
            </div>

            <div className="space-y-6">
              <div>
                <label htmlFor="title" className="mb-2 block text-sm font-medium">
                  Project title
                </label>

                <input id="title" type="text" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="NOVA" className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-accent" />
              </div>

              <div>
                <label htmlFor="slug" className="mb-2 block text-sm font-medium">
                  Slug
                </label>

                <input id="slug" type="text" value={slug} onChange={(event) => setSlug(generateSlug(event.target.value))} placeholder="nova" className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-accent" />

                <p className="mt-2 text-xs text-muted-foreground">Used in the project URL.</p>
              </div>

              <div>
                <label htmlFor="category" className="mb-2 block text-sm font-medium">
                  Category
                </label>

                <select id="category" value={category} onChange={(event) => setCategory(event.target.value as (typeof categories)[number])} className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-accent">
                  {categories.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="shortDescription" className="mb-2 block text-sm font-medium">
                  Short description
                </label>

                <textarea id="shortDescription" value={shortDescription} onChange={(event) => setShortDescription(event.target.value)} placeholder="A short description used in project cards." rows={3} className="w-full resize-y rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-accent" />
              </div>

              <div>
                <label htmlFor="description" className="mb-2 block text-sm font-medium">
                  Full description
                </label>

                <textarea id="description" value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Describe the project, problem, solution, and outcome." rows={8} className="w-full resize-y rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-accent" />
              </div>
            </div>
          </section>

          <section className="rounded-xl border border-border bg-surface p-6 md:p-8">
            <div className="mb-6">
              <p className="k-eyebrow mb-2">Additional information</p>

              <h2 className="k-heading-3">Project context</h2>
            </div>

            <div className="space-y-6">
              <div>
                <label htmlFor="clientName" className="mb-2 block text-sm font-medium">
                  Client name
                </label>

                <input id="clientName" type="text" value={clientName} onChange={(event) => setClientName(event.target.value)} placeholder="Optional" className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-accent" />
              </div>

              <div>
                <label htmlFor="projectUrl" className="mb-2 block text-sm font-medium">
                  Project URL
                </label>

                <input id="projectUrl" type="text" inputMode="url" value={projectUrl} onChange={(event) => setProjectUrl(event.target.value)} placeholder="example.com" className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-accent" />

                <p className="mt-2 text-xs text-muted-foreground">Optional. HTTPS will be added automatically when no protocol is provided.</p>
              </div>

              <div>
                <p className="mb-3 text-sm font-medium">Technology areas</p>

                <div className="grid gap-3 sm:grid-cols-2">
                  {technologyAreas.map((area) => {
                    const selected = selectedTechnologyAreas.includes(area);

                    return (
                      <label key={area} className="flex cursor-pointer items-center gap-3 rounded-lg border border-border px-4 py-3 text-sm transition-colors hover:border-accent">
                        <input type="checkbox" checked={selected} onChange={() => toggleTechnologyArea(area)} className="h-4 w-4 accent-accent" />

                        <span>{area}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-xl border border-border bg-surface p-6 md:p-8">
            <div className="mb-6">
              <p className="k-eyebrow mb-2">Media</p>

              <h2 className="k-heading-3">Project views</h2>

              <p className="k-body mt-2 text-muted-foreground">Add the desktop and mobile versions of the project. These are the primary project visuals. Maximum file size is 10 MB per image.</p>
            </div>

            <div className="space-y-10">
              <div>
                <div className="mb-3 flex items-center justify-between gap-4">
                  <label htmlFor="desktopImage" className="text-sm font-medium">
                    Desktop view
                  </label>

                  {existingDesktopImage && !newDesktopImage ? <span className="text-xs text-muted-foreground">Current desktop image</span> : null}
                </div>

                {newDesktopImage && newDesktopPreview ? (
                  <div className="overflow-hidden rounded-lg border border-border">
                    <div className="aspect-video bg-muted">
                      <img src={newDesktopPreview} alt="New desktop view preview" className="h-full w-full object-contain" />
                    </div>

                    <div className="flex items-center justify-between gap-4 p-4">
                      <div className="flex min-w-0 items-center gap-3">
                        <Upload className="h-5 w-5 shrink-0 text-accent" />

                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium">{newDesktopImage.name}</p>

                          <p className="text-xs text-muted-foreground">{(newDesktopImage.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                      </div>

                      <button type="button" onClick={removeNewDesktopImage} className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground" aria-label="Remove new desktop image">
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ) : existingDesktopImage ? (
                  <div className="overflow-hidden rounded-lg border border-border">
                    <div className="aspect-video bg-muted">
                      <img src={existingDesktopImage.url} alt={`${title} desktop view`} className="h-full w-full object-contain" />
                    </div>

                    <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
                      <p className="truncate text-sm text-muted-foreground">Existing desktop image</p>

                      <div className="flex flex-wrap gap-2">
                        <label htmlFor="desktopImage" className="k-button k-button-secondary inline-flex cursor-pointer items-center justify-center gap-2 text-sm">
                          <Upload className="h-4 w-4" />
                          Replace
                        </label>

                        <button type="button" onClick={removeExistingDesktopImage} className="k-button inline-flex items-center justify-center gap-2 border border-error/30 text-sm text-error transition-colors hover:bg-error/5">
                          <Trash2 className="h-4 w-4" />
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <label htmlFor="desktopImage" className="flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-border px-6 py-10 text-center transition-colors hover:border-accent">
                    <ImagePlus className="mb-3 h-7 w-7 text-muted-foreground" />

                    <span className="text-sm font-medium">Choose desktop image</span>

                    <span className="mt-1 text-xs text-muted-foreground">Recommended landscape screenshot</span>
                  </label>
                )}

                <input id="desktopImage" type="file" accept="image/*" onChange={handleDesktopImageChange} className="sr-only" />
              </div>

              <div>
                <div className="mb-3 flex items-center justify-between gap-4">
                  <label htmlFor="mobileImage" className="text-sm font-medium">
                    Mobile view
                  </label>

                  {existingMobileImage && !newMobileImage ? <span className="text-xs text-muted-foreground">Current mobile image</span> : null}
                </div>

                {newMobileImage && newMobilePreview ? (
                  <div className="overflow-hidden rounded-lg border border-border">
                    <div className="flex min-h-[360px] items-center justify-center bg-muted p-6">
                      <img src={newMobilePreview} alt="New mobile view preview" className="max-h-[520px] max-w-full object-contain" />
                    </div>

                    <div className="flex items-center justify-between gap-4 p-4">
                      <div className="flex min-w-0 items-center gap-3">
                        <Upload className="h-5 w-5 shrink-0 text-accent" />

                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium">{newMobileImage.name}</p>

                          <p className="text-xs text-muted-foreground">{(newMobileImage.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                      </div>

                      <button type="button" onClick={removeNewMobileImage} className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground" aria-label="Remove new mobile image">
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ) : existingMobileImage ? (
                  <div className="overflow-hidden rounded-lg border border-border">
                    <div className="flex min-h-[360px] items-center justify-center bg-muted p-6">
                      <img src={existingMobileImage.url} alt={`${title} mobile view`} className="max-h-[520px] max-w-full object-contain" />
                    </div>

                    <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
                      <p className="truncate text-sm text-muted-foreground">Existing mobile image</p>

                      <div className="flex flex-wrap gap-2">
                        <label htmlFor="mobileImage" className="k-button k-button-secondary inline-flex cursor-pointer items-center justify-center gap-2 text-sm">
                          <Upload className="h-4 w-4" />
                          Replace
                        </label>

                        <button type="button" onClick={removeExistingMobileImage} className="k-button inline-flex items-center justify-center gap-2 border border-error/30 text-sm text-error transition-colors hover:bg-error/5">
                          <Trash2 className="h-4 w-4" />
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <label htmlFor="mobileImage" className="flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-border px-6 py-10 text-center transition-colors hover:border-accent">
                    <ImagePlus className="mb-3 h-7 w-7 text-muted-foreground" />

                    <span className="text-sm font-medium">Choose mobile image</span>

                    <span className="mt-1 text-xs text-muted-foreground">Recommended portrait screenshot</span>
                  </label>
                )}

                <input id="mobileImage" type="file" accept="image/*" onChange={handleMobileImageChange} className="sr-only" />
              </div>

              <div className="border-t border-border pt-10">
                <div className="mb-3 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium">Gallery</p>

                    <p className="mt-1 text-xs text-muted-foreground">Optional additional project images.</p>
                  </div>

                  <span className="text-xs text-muted-foreground">
                    {existingGallery.length} {existingGallery.length === 1 ? "image" : "images"}
                  </span>
                </div>

                {existingGallery.length > 0 ? (
                  <div className="grid gap-4 sm:grid-cols-2">
                    {existingGallery.map((image, index) => (
                      <div key={image.path} className="overflow-hidden rounded-lg border border-border">
                        <div className="aspect-video bg-muted">
                          <img src={image.url} alt={`${title} gallery image ${index + 1}`} className="h-full w-full object-contain" />
                        </div>

                        <div className="flex items-center justify-between gap-3 p-3">
                          <p className="truncate text-xs text-muted-foreground">Gallery image {index + 1}</p>

                          <button type="button" onClick={() => removeExistingGalleryImage(image.path)} className="shrink-0 rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-error" aria-label={`Remove gallery image ${index + 1}`}>
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-lg border border-dashed border-border px-6 py-8 text-center">
                    <p className="text-sm text-muted-foreground">No gallery images currently uploaded.</p>
                  </div>
                )}

                <label htmlFor="newGalleryImages" className="mt-4 flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-border px-6 py-10 text-center transition-colors hover:border-accent">
                  <ImagePlus className="mb-3 h-7 w-7 text-muted-foreground" />

                  <span className="text-sm font-medium">Add gallery images</span>

                  <span className="mt-1 text-xs text-muted-foreground">Optional. You can select multiple images.</span>
                </label>

                <input id="newGalleryImages" type="file" accept="image/*" multiple onChange={handleGalleryImagesChange} className="sr-only" />

                {newGalleryImages.length > 0 ? (
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    {newGalleryImages.map((file, index) => (
                      <div key={`${file.name}-${file.size}-${index}`} className="overflow-hidden rounded-lg border border-border">
                        {newGalleryPreviews[index] ? (
                          <div className="aspect-video bg-muted">
                            <img src={newGalleryPreviews[index]} alt={`New gallery preview ${index + 1}`} className="h-full w-full object-contain" />
                          </div>
                        ) : null}

                        <div className="flex items-center justify-between gap-4 p-3">
                          <div className="min-w-0">
                            <p className="truncate text-sm">{file.name}</p>

                            <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                          </div>

                          <button type="button" onClick={() => removeNewGalleryImage(index)} className="shrink-0 rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground" aria-label={`Remove ${file.name}`}>
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          </section>

          <section className="rounded-xl border border-border bg-surface p-6 md:p-8">
            <div className="mb-6">
              <p className="k-eyebrow mb-2">Publishing</p>

              <h2 className="k-heading-3">Visibility & ordering</h2>
            </div>

            <div className="space-y-5">
              <label className="flex cursor-pointer items-start gap-3">
                <input type="checkbox" checked={featured} onChange={(event) => setFeatured(event.target.checked)} className="mt-0.5 h-4 w-4 accent-accent" />

                <span>
                  <span className="block text-sm font-medium">Featured project</span>

                  <span className="mt-1 block text-xs text-muted-foreground">Show this project in the homepage Featured Work section.</span>
                </span>
              </label>

              <label className="flex cursor-pointer items-start gap-3">
                <input type="checkbox" checked={published} onChange={(event) => setPublished(event.target.checked)} className="mt-0.5 h-4 w-4 accent-accent" />

                <span>
                  <span className="block text-sm font-medium">Published</span>

                  <span className="mt-1 block text-xs text-muted-foreground">Make this project visible on the public website.</span>
                </span>
              </label>

              <div className="max-w-xs">
                <label htmlFor="sortOrder" className="mb-2 block text-sm font-medium">
                  Sort order
                </label>

                <input id="sortOrder" type="number" min="0" value={sortOrder} onChange={(event) => setSortOrder(event.target.value)} className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-accent" />

                <p className="mt-2 text-xs text-muted-foreground">Lower numbers appear first.</p>
              </div>
            </div>
          </section>

          {error ? (
            <div role="alert" className="rounded-lg border border-error/30 bg-error/5 px-4 py-3 text-sm text-error">
              {error}
            </div>
          ) : null}

          {success ? (
            <div role="status" className="rounded-lg border border-success/30 bg-success/5 px-4 py-3 text-sm text-success">
              Project updated successfully.
            </div>
          ) : null}

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <button type="submit" disabled={submitting} className="k-button k-button-primary inline-flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-60">
              <Save className="h-4 w-4" />
              {submitting ? "Saving Changes..." : "Save Changes"}
            </button>

            <Link href="/admin/projects" className="k-button k-button-secondary inline-flex items-center justify-center">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
