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
    <div className="absolute inset-0 z-20 flex items-center justify-center bg-background/95 backdrop-blur-sm">
      <div className="flex flex-col items-center text-center">
        <div className="relative flex h-10 w-10 items-center justify-center">
          <span className="absolute h-10 w-10 animate-ping rounded-full border border-[var(--accent)]/30" />
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent)]" />
        </div>

        <p className="mt-4 text-sm font-medium text-foreground">Loading preview</p>

        <p className="mt-1 text-xs text-muted-foreground">Connecting to the live website</p>
      </div>
    </div>
  );
}

function DesktopPreview({ title, liveUrl, onLoad }: PreviewFrameProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    function updateScale() {
      const width = container.clientWidth;

      if (!width) {
        return;
      }

      setScale(width / 1440);
    }

    updateScale();

    const observer = new ResizeObserver(updateScale);

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden bg-background">
      <div
        className="absolute left-0 top-0 origin-top-left"
        style={{
          width: "1440px",
          height: "900px",
          transform: `scale(${scale})`,
        }}
      >
        <div className="flex h-10 items-center gap-2 bg-background px-4">
          <span className="h-2.5 w-2.5 rounded-full border border-border" />
          <span className="h-2.5 w-2.5 rounded-full border border-border" />
          <span className="h-2.5 w-2.5 rounded-full border border-border" />

          <div className="ml-3 flex h-6 flex-1 items-center border border-border px-3">
            <span className="truncate text-[10px] text-muted-foreground">{liveUrl}</span>
          </div>
        </div>

        <iframe key={`${liveUrl}-desktop`} src={liveUrl} title={`${title} desktop preview`} className="block h-[860px] w-[1440px] border-0" loading="eager" onLoad={onLoad} />
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
    const container = containerRef.current;

    if (!container) {
      return;
    }

    function updateScale() {
      const width = container.clientWidth;
      const height = container.clientHeight;

      if (!width || !height) {
        return;
      }

      const availableWidth = Math.min(width - 32, MOBILE_WIDTH);

      const availableHeight = height - 32;

      const widthScale = availableWidth / MOBILE_WIDTH;
      const heightScale = availableHeight / MOBILE_HEIGHT;

      setScale(Math.min(widthScale, heightScale, 1));
    }

    updateScale();

    const observer = new ResizeObserver(updateScale);

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 flex items-center justify-center overflow-hidden bg-muted/20">
      <div
        className="relative shrink-0 overflow-hidden rounded bg-background"
        style={{
          width: `${MOBILE_WIDTH * scale}px`,
          height: `${MOBILE_HEIGHT * scale}px`,
        }}
      >
        <div
          className="absolute left-0 top-0 origin-top-left"
          style={{
            width: `${MOBILE_WIDTH}px`,
            height: `${MOBILE_HEIGHT}px`,
            transform: `scale(${scale})`,
          }}
        >
          <iframe
            key={`${liveUrl}-mobile`}
            src={liveUrl}
            title={`${title} mobile preview`}
            className="absolute left-0 top-0 block border-0"
            style={{
              width: `${MOBILE_WIDTH}px`,
              height: `${MOBILE_HEIGHT}px`,
              margin: 0,
              padding: 0,
            }}
            loading="eager"
            onLoad={onLoad}
          />
        </div>
      </div>
    </div>
  );
}

export function LivePreview({ title, liveUrl, mode }: LivePreviewProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setIsLoading(true);
    }, 0);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [liveUrl, mode]);

  if (!liveUrl) {
    return (
      <div className="flex h-[752px] items-center justify-center bg-muted/20 lg:aspect-[16/10] lg:h-auto">
        <div className="text-center">
          <p className="text-sm font-medium text-foreground">Live preview coming soon</p>

          <p className="mt-1 text-xs text-muted-foreground">This project will be connected shortly.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-[752px] w-full overflow-hidden bg-muted/20 lg:aspect-[16/10] lg:h-auto">
      {mode === "desktop" ? <DesktopPreview title={title} liveUrl={liveUrl} onLoad={() => setIsLoading(false)} /> : <MobilePreview title={title} liveUrl={liveUrl} onLoad={() => setIsLoading(false)} />}

      {isLoading && <LoadingOverlay />}
    </div>
  );
}
