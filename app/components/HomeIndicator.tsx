import styles from "./HomeIndicator.module.css";

export function HomeIndicator({ dark = true }: { dark?: boolean }) {
  return (
    <div
      className={styles.indicator}
      aria-hidden="true"
      style={{ background: dark ? "var(--colour-surface-primary-base)" : "#ffffff" }}
    />
  );
}
