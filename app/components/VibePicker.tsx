"use client";

import { StatusBar } from "./StatusBar";
import { HomeIndicator } from "./HomeIndicator";
import styles from "./VibePicker.module.css";
import type { VibeId } from "../lib/vibes";
import { VIBES } from "../lib/vibes";

type Props = {
  selected: VibeId | null;
  onSelect: (id: VibeId) => void;
  onGenerate: () => void;
};

export function VibePicker({ selected, onSelect, onGenerate }: Props) {
  const rows: VibeId[][] = [
    ["vintage", "street"],
    ["minimal", "maximalist"],
  ];

  return (
    <div className={styles.screen}>
      <StatusBar />

      {/* Hero */}
      <div className={styles.hero}>
        <div className={styles.heroShadow} />
        <div className={styles.heroCardWrap}>
          <img
            className={styles.heroCardImg}
            src="/images/card-hero.png"
            alt="Depop card preview"
          />
        </div>
      </div>

      {/* Body */}
      <div className={styles.body}>
        <h1 className={styles.title}>What&rsquo;s your Depop vibe?</h1>
        <div className={styles.divider} />

        <div className={styles.grid}>
          {rows.map((row, rowIdx) => (
            <div className={styles.row} key={rowIdx}>
              {row.map((id, colIdx) => {
                const vibe = VIBES[id];
                const isSelected = selected === id;
                const delay = rowIdx * 2 * 50 + colIdx * 50;
                return (
                  <button
                    key={id}
                    type="button"
                    className={`${styles.card} ${isSelected ? styles.cardSelected : ""}`}
                    aria-pressed={isSelected}
                    onClick={() => onSelect(id)}
                    style={{ ["--enter-delay" as string]: `${delay}ms` }}
                  >
                    <div className={styles.cardImageWrap}>
                      <img className={styles.cardImage} src={vibe.image} alt="" />
                    </div>
                    <p className={styles.cardLabel}>{vibe.label}</p>
                  </button>
                );
              })}
            </div>
          ))}

          <button
            type="button"
            className={`${styles.helpCard} ${selected === "help" ? styles.helpCardSelected : ""}`}
            aria-pressed={selected === "help"}
            onClick={() => onSelect("help")}
          >
            <span className={styles.helpIcon}>
              <img src="/images/magic-wand.png" alt="" />
            </span>
            <span className={styles.helpText}>
              <span className={styles.helpTitle}>Help me choose</span>
              <span className={styles.helpSubtitle}>Trust us, we know your style!</span>
            </span>
          </button>
        </div>

        <div className={styles.bodySpacer} />
      </div>

      {/* CTA */}
      <div className={styles.cta}>
        <button
          type="button"
          className={styles.ctaButton}
          disabled={!selected}
          onClick={onGenerate}
        >
          Generate card
        </button>
      </div>

      <HomeIndicator />
    </div>
  );
}
