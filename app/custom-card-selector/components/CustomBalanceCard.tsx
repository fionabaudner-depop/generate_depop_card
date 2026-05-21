import type { CSSProperties } from "react";
import styles from "./CustomBalanceCard.module.css";
import type { BadgeIconId, CardVariant } from "../lib/card-designs";

type Badge = {
  icon: BadgeIconId;
  label: string;
};

type Props = {
  variant: CardVariant;
  size?: "default" | "hero";
  className?: string;
  /** Optional achievement badge stamped on the card surface (top-right). */
  badge?: Badge | null;
};

export function CustomBalanceCard({ variant, size = "default", className, badge }: Props) {
  const style = {
    "--card-bg": variant.cardGradient,
    "--card-text": variant.cardTextColor,
  } as CSSProperties;

  const classes = [
    styles.card,
    size === "hero" ? styles.hero : styles.default,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} style={style}>
      <div className={styles.watermark} aria-hidden="true" />

      <div className={styles.header}>
        <span>Your</span>
        <span className={styles.depop} aria-label="depop" />
        <span>balance</span>
      </div>

      <div className={styles.amount}>$30.00</div>
      <div className={styles.divider} aria-hidden="true" />
      <div className={styles.pending}>$0.00 pending</div>

      {badge ? (
        <div className={styles.badge} aria-hidden="true">
          <span className={styles.badgeIcon}>
            <BadgeIcon icon={badge.icon} />
          </span>
          <span className={styles.badgeLabel}>{badge.label}</span>
        </div>
      ) : null}
    </div>
  );
}

/** Inline SVG glyphs for the achievement-badge slot. All paths inherit
 * `currentColor` so they tint to the card's text colour automatically. */
function BadgeIcon({ icon }: { icon: BadgeIconId }) {
  switch (icon) {
    case "ribbon":
      return (
        <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
          <path
            d="M8 1.5l1.7 3.4 3.8.5-2.7 2.7.6 3.7L8 10.1l-3.4 1.7.6-3.7L2.5 5.4l3.8-.5L8 1.5z"
            fill="currentColor"
          />
          <path
            d="M5 10.5L4 14l4-2 4 2-1-3.5"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      );
    case "spark":
      return (
        <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
          <path
            d="M8 1.5l1.5 4.5 4.5 1.5-4.5 1.5L8 13.5l-1.5-4.5L2 7.5l4.5-1.5L8 1.5z"
            fill="currentColor"
          />
        </svg>
      );
    case "star":
      return (
        <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
          <path
            d="M8 1.5l1.95 4.4 4.8.45-3.6 3.2 1.05 4.7L8 11.85 3.8 14.25l1.05-4.7-3.6-3.2 4.8-.45L8 1.5z"
            fill="currentColor"
          />
        </svg>
      );
    case "shield":
      return (
        <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
          <path
            d="M8 1.5l5 1.5v4.5c0 3-2 5.4-5 6.5-3-1.1-5-3.5-5-6.5V3l5-1.5z"
            fill="currentColor"
          />
          <path
            d="M5.5 8l1.7 1.8L10.8 6"
            stroke="var(--card-bg-strong, #1a1a1a)"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "briefcase":
      return (
        <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
          <rect x="2" y="5" width="12" height="9" rx="1.5" fill="currentColor" />
          <path
            d="M5.5 5V3.5a1 1 0 011-1h3a1 1 0 011 1V5"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      );
    case "anniversary":
      return (
        <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
          <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.4" fill="none" />
          <circle cx="8" cy="8" r="3" fill="currentColor" />
          <path d="M8 1v3M8 12v3M1 8h3M12 8h3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      );
  }
}
