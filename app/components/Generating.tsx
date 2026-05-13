"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { StatusBar } from "./StatusBar";
import { HomeIndicator } from "./HomeIndicator";
import styles from "./Generating.module.css";
import { VIBES, type VibeId } from "../lib/vibes";

type Props = {
  vibeId: VibeId;
  onDone: () => void;
};

const DURATION_MS = 2800;

const STEPS = [
  "Reading your vibe...",
  "Mixing your colours...",
  "Embossing your name...",
  "Almost ready!",
];

export function Generating({ vibeId, onDone }: Props) {
  const vibe = VIBES[vibeId];
  const [progress, setProgress] = useState(0);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / DURATION_MS);
      setProgress(t);
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        // Tiny pause at full so the bar visibly completes before transitioning.
        window.setTimeout(() => onDoneRef.current(), 220);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Slow reveal: illustration scales from 0.7 → 1, fades from 0.4 → 1.
  const illoStyle = useMemo<CSSProperties>(
    () => ({
      transform: `scale(${0.7 + progress * 0.3})`,
      opacity: 0.4 + progress * 0.6,
    }),
    [progress]
  );

  const stageStyle = {
    "--vibe-glow": vibe.accent,
    "--glow-opacity": progress.toString(),
  } as CSSProperties;

  const stepIndex = Math.min(STEPS.length - 1, Math.floor(progress * STEPS.length));

  return (
    <div className={styles.screen} style={stageStyle}>
      <StatusBar />
      <div className={styles.statusBarSpacer} aria-hidden="true" />

      <div className={styles.stage}>
        <div className={styles.illoWrap}>
          <div className={styles.glow} aria-hidden="true" />
          <img
            src={vibe.image}
            alt=""
            className={styles.illo}
            style={illoStyle}
            aria-hidden="true"
          />
        </div>

        <div className={styles.progress}>
          <div
            className={styles.progressTrack}
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progress * 100)}
            aria-label={`Generating your ${vibe.label} card`}
          >
            <div className={styles.progressFill} style={{ width: `${progress * 100}%` }} />
          </div>

          <div className={styles.copy}>
            <h2 className={styles.title}>Generating your card</h2>
            <p className={styles.subtitle} key={stepIndex}>
              {STEPS[stepIndex]}
            </p>
          </div>
        </div>
      </div>

      <div className={styles.footerSpacer} aria-hidden="true" />
      <HomeIndicator />
    </div>
  );
}
