"use client";

import { useCallback, useState } from "react";
import { StatusBar } from "./StatusBar";
import { HomeIndicator } from "./HomeIndicator";
import styles from "./Splash.module.css";

type Props = {
  onGetStarted: () => void;
  onClose?: () => void;
};

// Brief delay so the card-pop animation is visible before the screen transitions.
const POP_DURATION_MS = 260;

export function Splash({ onGetStarted, onClose }: Props) {
  const [pressed, setPressed] = useState(false);

  const handlePrimary = useCallback(() => {
    if (pressed) return;
    setPressed(true);
    window.setTimeout(onGetStarted, POP_DURATION_MS);
  }, [pressed, onGetStarted]);

  return (
    <div className={styles.screen}>
      <StatusBar />

      {/* Reserve space for the absolute StatusBar so flex children sit beneath it. */}
      <div className={styles.statusBarSpacer} aria-hidden="true" />

      <div className={styles.navRow}>
        <button
          type="button"
          className={styles.closeBtn}
          aria-label="Close"
          onClick={onClose ?? onGetStarted}
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

      <div className={styles.main}>
        <div className={`${styles.heroWrap} ${pressed ? styles.heroWrapPressed : ""}`}>
          <img className={styles.heroImg} src="/images/card-hero.png" alt="Depop balance card" />
          <div className={styles.heroShadow} aria-hidden="true" />
        </div>

        <div className={styles.copy}>
          <h1 className={styles.title}>Your earnings - your balance</h1>
          <p className={styles.subtitle}>Customise your balance card in just a few clicks.</p>
        </div>

        <div className={styles.ctaSpacer} aria-hidden="true" />
      </div>

      <div className={styles.cta}>
        <button type="button" className={styles.primary} onClick={handlePrimary}>
          Get started
        </button>
      </div>

      <HomeIndicator />
    </div>
  );
}
