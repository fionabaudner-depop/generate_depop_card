import Link from "next/link";
import type { ReactNode } from "react";
import styles from "./page.module.css";

type Prototype = {
  id: string;
  href: string;
  title: string;
  description: string;
  status: "live" | "coming-soon";
  statusLabel: string;
  preview: ReactNode;
};

const PROTOTYPES: Prototype[] = [
  {
    id: "depop-vibe-selector",
    href: "/depop-vibe-selector",
    title: "Depop Vibe selector",
    description:
      "Generate a personalised Depop Balance card by picking a style vibe — vintage, street, minimal or maximalist.",
    status: "live",
    statusLabel: "Live",
    preview: (
      <div className={`${styles.preview} ${styles.previewVibe}`} aria-hidden="true">
        <div className={`${styles.miniCard} ${styles.miniCardVibe}`}>
          <span className={styles.miniLogo}>d</span>
          <span className={styles.miniChip} />
          <span className={styles.miniHandle}>@style.maker</span>
        </div>
      </div>
    ),
  },
  {
    id: "custom-card-selector",
    href: "/custom-card-selector",
    title: "Custom Card Selector",
    description:
      "Build your own balance card from the ground up — pick colours, patterns and accents directly.",
    status: "coming-soon",
    statusLabel: "In development",
    preview: (
      <div className={`${styles.preview} ${styles.previewCustom}`} aria-hidden="true">
        <div className={`${styles.miniCard} ${styles.miniCardCustom}`}>
          <span className={styles.miniLogo}>d</span>
        </div>
        <div className={styles.swatchStack}>
          <span className={styles.swatch} />
          <span className={styles.swatch} />
          <span className={styles.swatch} />
          <span className={styles.swatch} />
        </div>
      </div>
    ),
  },
];

export default function Dashboard() {
  return (
    <div className={styles.shell}>
      <div className={styles.container}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>Payments · Hackweek 2026</p>
          <h1 className={styles.title}>Customise Balance Card prototypes</h1>
          <p className={styles.subtitle}>
            Variations exploring different ways to let sellers personalise their Depop
            Balance card. Pick one to walk through.
          </p>
        </header>

        <section className={styles.grid}>
          {PROTOTYPES.map((p) => (
            <Link
              key={p.id}
              href={p.href}
              className={`${styles.card} ${p.status === "coming-soon" ? styles.comingSoon : ""}`}
            >
              {p.preview}
              <div className={styles.body}>
                <div className={styles.meta}>
                  <span
                    className={`${styles.badge} ${
                      p.status === "live" ? styles.badgeLive : styles.badgeSoon
                    }`}
                  >
                    {p.statusLabel}
                  </span>
                </div>
                <h2 className={styles.cardTitle}>{p.title}</h2>
                <p className={styles.cardDescription}>{p.description}</p>
                <span className={styles.cardCta}>
                  Open prototype
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path
                      d="M3 7h8M7 3l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </section>

        <footer className={styles.footer}>
          <p className={styles.footerText}>
            All prototypes use the Thrift design system and the Payments 2026 Figma source of truth.
          </p>
        </footer>
      </div>
    </div>
  );
}
