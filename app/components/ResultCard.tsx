"use client";

import { useMemo } from "react";
import type { CSSProperties } from "react";
import { StatusBar } from "./StatusBar";
import { HomeIndicator } from "./HomeIndicator";
import styles from "./ResultCard.module.css";
import { VIBES, type VibeId } from "../lib/vibes";

type Props = {
  vibeId: VibeId;
  onSave: () => void;
  onTryAnother: () => void;
  onClose: () => void;
};

// Sparkles are placed on a circle around the avatar so they twinkle on the halo edge.
const SPARKLE_COUNT = 10;
const SPARKLE_RADIUS = 150;

export function ResultCard({ vibeId, onSave, onTryAnother, onClose }: Props) {
  const vibe = VIBES[vibeId];

  // Pull the first colour out of the gradient as the halo / ring colour.
  const haloColor = vibe.accent;

  const stageStyle = {
    "--screen-glow": `${haloColor}33`,
    "--avatar-glow": `${haloColor}99`,
    "--avatar-ring": haloColor,
    "--avatar-sparkle": vibe.cardTextColor === "#1A1A1A" ? haloColor : "#ffffff",
  } as CSSProperties;

  const sparkles = useMemo(() => {
    return Array.from({ length: SPARKLE_COUNT }).map((_, i) => {
      const angle = (i / SPARKLE_COUNT) * Math.PI * 2;
      const x = Math.cos(angle) * SPARKLE_RADIUS;
      const y = Math.sin(angle) * SPARKLE_RADIUS;
      return {
        transform: `translate(${x}px, ${y}px)`,
        animationDelay: `${(i * 0.18) % 2.4}s`,
        animationDuration: `${2 + (i % 3) * 0.4}s`,
      };
    });
  }, []);

  return (
    <div className={styles.screen} style={stageStyle}>
      <StatusBar />
      <div className={styles.statusBarSpacer} aria-hidden="true" />

      <div className={styles.navRow}>
        <button
          type="button"
          className={styles.closeBtn}
          aria-label="Close"
          onClick={onClose}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path
              d="M4 4l12 12M16 4L4 16"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      <div className={styles.stage}>
        <div className={styles.pedestal}>
          <div className={styles.halo} aria-hidden="true" />
          <div className={styles.ring} aria-hidden="true" />
          <div className={styles.ringInner} aria-hidden="true" />

          {sparkles.map((s, i) => (
            <span
              key={i}
              className={styles.sparkle}
              style={{
                transform: s.transform,
                animationDelay: s.animationDelay,
                animationDuration: s.animationDuration,
              }}
              aria-hidden="true"
            />
          ))}

          {/* The card itself is rendered by the page-level CardLayer so it can
              persist + morph into the balance slot. This component owns the
              halo, ring and sparkles framing it. */}
        </div>
      </div>

      <div className={styles.label}>
        <h1 className={styles.vibeName}>{vibe.label}</h1>
        <p className={styles.tagline}>{vibe.tagline}</p>
      </div>

      <div className={styles.cta}>
        <button type="button" className={styles.primary} onClick={onSave}>
          Save
        </button>
        <button type="button" className={styles.secondary} onClick={onTryAnother}>
          Try another style
        </button>
      </div>

      <HomeIndicator />
    </div>
  );
}
