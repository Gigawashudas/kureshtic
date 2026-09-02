"use client";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
interface ProjectDeleteButtonProps {
  projectId: string;
  projectTitle: string;
}
export default function ProjectDeleteButton({ projectId, projectTitle }: ProjectDeleteButtonProps) {
  const router = useRouter();
  const [isConfirming, setIsConfirming] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  useEffect(() => {
    if (!isConfirming || isDeleting) {
      return;
    }
    const timeout = window.setTimeout(() => {
      setIsConfirming(false);
    }, 5000);
    return () => {
      window.clearTimeout(timeout);
    };
  }, [isConfirming, isDeleting]);
  async function handleDelete() {
    if (!isConfirming) {
      setIsConfirming(true);
      return;
    }
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/admin/projects/${projectId}`, { method: "DELETE" });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Project could not be deleted.");
      }
      router.refresh();
    } catch (error) {
      console.error("PROJECT DELETE ERROR:", error);
      setIsDeleting(false);
      setIsConfirming(false);
    }
  }
  return (
    <button type="button" onClick={handleDelete} disabled={isDeleting} aria-label={isConfirming ? `Confirm deletion of ${projectTitle}` : `Delete ${projectTitle}`} className={`k-button inline-flex items-center gap-2 transition-all disabled:cursor-not-allowed disabled:opacity-60 ${isConfirming ? "border-error bg-error text-white hover:bg-error/90" : "k-button-secondary text-error hover:border-error hover:bg-error/10 hover:text-error"}`}>
      {" "}
      <Trash2 className="h-4 w-4" /> {isDeleting ? "Deleting..." : isConfirming ? "Confirm delete" : "Delete"}{" "}
    </button>
  );
}
