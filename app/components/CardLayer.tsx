"use client";

import type { CSSProperties } from "react";
import { VIBES, type VibeId } from "../lib/vibes";
import styles from "./CardLayer.module.css";

export type CardMode = "avatar" | "balance";

type Props = {
  vibeId: VibeId | null;
  username: string;
  mode: CardMode;
  visible: boolean;
};

export function CardLayer({ vibeId, username, mode, visible }: Props) {
  if (!vibeId) return null;
  const vibe = VIBES[vibeId];

  const cardStyle = {
    "--card-bg": vibe.cardGradient,
    "--card-text": vibe.cardTextColor,
    "--card-bg-solid": vibe.cardTextColor === "#FFFFFF" ? "#1a1a1a" : "#ffffff",
  } as CSSProperties;

  const className = [
    styles.layer,
    styles[mode],
    visible ? styles.visible : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={className} aria-hidden="true">
      <div className={styles.card} style={cardStyle}>
        <div className={styles.sheen} />

        {/* Avatar variant content */}
        <div className={styles.avatarContent}>
          <span className={styles.logo}>d</span>
          <span className={styles.chip} aria-hidden="true" />
          <span className={styles.handle}>@{username.replace(/^@/, "")}</span>
        </div>

        {/* Balance variant content */}
        <div className={styles.balanceContent}>
          <div className={styles.watermark} aria-hidden="true" />
          <div className={styles.balanceHeader}>
            <span>Your</span>
            <span className={styles.depop} aria-label="depop" />
            <span>balance</span>
          </div>
          <div className={styles.balanceAmount}>$30.00</div>
          <div className={styles.balanceDivider} aria-hidden="true" />
          <div className={styles.balancePending}>$0.00 pending</div>
        </div>
      </div>
    </div>
  );
}
