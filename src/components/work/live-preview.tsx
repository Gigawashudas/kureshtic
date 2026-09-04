"use client";

import { useEffect, useRef, useState } from "react";

export type PreviewMode = "desktop" | "mobile";

interface LivePreviewProps {
  title: string;
  liveUrl: string;
  mode: PreviewMode;
}

interface PreviewFrameProps {
  title: string;
  liveUrl: string;
  onLoad: () => void;
}

function LoadingOverlay() {
  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center bg-[var(--background)]/95 backdrop-blur-sm">
      <div className="flex flex-col items-center text-center">
        <div className="relative flex h-10 w-10 items-center justify-center">
          <span className="absolute h-10 w-10 animate-ping rounded-full border border-[var(--accent)]/30" />
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent)]" />
        </div>

        <p className="mt-4 text-sm font-medium text-[var(--text-primary)]">Loading preview</p>

        <p className="mt-1 text-xs text-[var(--text-muted)]">Connecting to the live website</p>
      </div>
    </div>
  );
}

function DesktopPreview({ title, liveUrl, onLoad }: PreviewFrameProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);

  const VIEWPORT_WIDTH = 1440;
  const VIEWPORT_HEIGHT = 900;
  const BROWSER_BAR_HEIGHT = 40;

  useEffect(() => {
    function updateScale() {
      const container = containerRef.current;

      if (!container) {
        return;
      }

      const width = container.clientWidth;
      const height = container.clientHeight;

      if (!width || !height) {
        return;
      }

      const widthScale = width / VIEWPORT_WIDTH;
      const heightScale = height / VIEWPORT_HEIGHT;

      setScale(Math.min(widthScale, heightScale, 1));
    }

    updateScale();

    const container = containerRef.current;

    if (!container) {
      return;
    }

    const observer = new ResizeObserver(updateScale);

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 flex items-center justify-center overflow-hidden bg-[var(--background)]">
      <div
        className="relative shrink-0 origin-center overflow-hidden bg-[var(--background)]"
        style={{
          width: `${VIEWPORT_WIDTH * scale}px`,
          height: `${VIEWPORT_HEIGHT * scale}px`,
        }}
      >
        <div
          className="absolute left-0 top-0 origin-top-left"
          style={{
            width: `${VIEWPORT_WIDTH}px`,
            height: `${VIEWPORT_HEIGHT}px`,
            transform: `scale(${scale})`,
          }}
        >
          <div
            className="flex items-center gap-2 border-b border-[var(--border)] bg-[var(--background)] px-4"
            style={{
              width: `${VIEWPORT_WIDTH}px`,
              height: `${BROWSER_BAR_HEIGHT}px`,
            }}
          >
            <span className="h-2.5 w-2.5 rounded-full border border-[var(--border-strong)]" />
            <span className="h-2.5 w-2.5 rounded-full border border-[var(--border-strong)]" />
            <span className="h-2.5 w-2.5 rounded-full border border-[var(--border-strong)]" />

            <div className="ml-3 flex h-6 flex-1 items-center border border-[var(--border)] px-3">
              <span className="truncate text-[10px] text-[var(--text-muted)]">{liveUrl}</span>
            </div>
          </div>

          <iframe
            key={`${liveUrl}-desktop`}
            src={liveUrl}
            title={`${title} desktop preview`}
            className="block border-0"
            style={{
              width: `${VIEWPORT_WIDTH}px`,
              height: `${VIEWPORT_HEIGHT - BROWSER_BAR_HEIGHT}px`,
            }}
            loading="eager"
            onLoad={onLoad}
          />
        </div>
      </div>
    </div>
  );
}

function MobilePreview({ title, liveUrl, onLoad }: PreviewFrameProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.7);

  const MOBILE_WIDTH = 400;
  const MOBILE_HEIGHT = 750;

  useEffect(() => {
    function updateScale() {
      const container = containerRef.current;

      if (!container) {
        return;
      }

      const width = container.clientWidth;
      const height = container.clientHeight;

      if (!width || !height) {
        return;
      }

      const horizontalPadding = 32;
      const verticalPadding = 32;

      const availableWidth = Math.max(width - horizontalPadding, 0);

      const availableHeight = Math.max(height - verticalPadding, 0);

      const widthScale = availableWidth / MOBILE_WIDTH;
      const heightScale = availableHeight / MOBILE_HEIGHT;

      setScale(Math.min(widthScale, heightScale, 1));
    }

    updateScale();

    const container = containerRef.current;

    if (!container) {
      return;
    }

    const observer = new ResizeObserver(updateScale);

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 flex items-center justify-center overflow-hidden bg-[var(--surface-muted)]">
      <div
        className="relative shrink-0 overflow-hidden rounded-[10px] bg-[var(--background)] shadow-sm"
        style={{
          width: `${MOBILE_WIDTH * scale}px`,
          height: `${MOBILE_HEIGHT * scale}px`,
        }}
      >
        <iframe
          key={`${liveUrl}-mobile`}
          src={liveUrl}
          title={`${title} mobile preview`}
          className="absolute left-0 top-0 block origin-top-left border-0"
          style={{
            width: `${MOBILE_WIDTH}px`,
            height: `${MOBILE_HEIGHT}px`,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
          loading="eager"
          onLoad={onLoad}
        />
      </div>
    </div>
  );
}

export function LivePreview({ title, liveUrl, mode }: LivePreviewProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const id = window.setTimeout(() => {
      setIsLoading(true);
    }, 0);

    return () => {
      window.clearTimeout(id);
    };
  }, [liveUrl, mode]);

  if (!liveUrl) {
    return (
      <div className="flex h-[752px] items-center justify-center bg-[var(--surface-muted)] lg:aspect-[16/10] lg:h-auto">
        <div className="text-center">
          <p className="text-sm font-medium text-[var(--text-primary)]">Live preview coming soon</p>

          <p className="mt-1 text-xs text-[var(--text-muted)]">This project will be connected shortly.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-[752px] w-full overflow-hidden bg-[var(--surface-muted)] lg:aspect-[16/10] lg:h-auto">
      {mode === "desktop" ? <DesktopPreview title={title} liveUrl={liveUrl} onLoad={() => setIsLoading(false)} /> : <MobilePreview title={title} liveUrl={liveUrl} onLoad={() => setIsLoading(false)} />}

      {isLoading && <LoadingOverlay />}
    </div>
  );
}
