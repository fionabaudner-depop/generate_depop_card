import styles from "./StatusBar.module.css";

export function StatusBar({ time = "09:41" }: { time?: string }) {
  return (
    <div className={styles.bar} aria-hidden="true">
      <span className={styles.time}>{time}</span>
      <div className={styles.icons}>
        {/* Signal */}
        <svg width="17" height="11" viewBox="0 0 17 11" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <rect x="0" y="7" width="3" height="4" rx="0.6" />
          <rect x="4.5" y="5" width="3" height="6" rx="0.6" />
          <rect x="9" y="2.5" width="3" height="8.5" rx="0.6" />
          <rect x="13.5" y="0" width="3" height="11" rx="0.6" />
        </svg>
        {/* Wifi */}
        <svg width="15" height="11" viewBox="0 0 15 11" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.5 1.5c2.7 0 5.2 1 7.1 2.7l-1.4 1.4A8 8 0 0 0 7.5 3.4 8 8 0 0 0 1.8 5.6L.4 4.2A10 10 0 0 1 7.5 1.5Z" />
          <path d="M7.5 5.5c1.6 0 3.1.6 4.3 1.6l-1.4 1.4a4.5 4.5 0 0 0-2.9-1 4.5 4.5 0 0 0-2.9 1L3.2 7.1A6.5 6.5 0 0 1 7.5 5.5Z" />
          <circle cx="7.5" cy="10" r="1.5" />
        </svg>
        {/* Battery */}
        <svg width="27" height="13" viewBox="0 0 27 13" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="0.5" y="0.5" width="22" height="12" rx="3" stroke="currentColor" strokeOpacity="0.35" />
          <rect x="2" y="2" width="19" height="9" rx="1.5" fill="currentColor" />
          <rect x="23.5" y="4" width="2" height="5" rx="1" fill="currentColor" fillOpacity="0.4" />
        </svg>
      </div>
    </div>
  );
}
