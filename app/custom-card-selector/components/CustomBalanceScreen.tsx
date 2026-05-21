"use client";

import type { ReactNode } from "react";
import { StatusBar } from "../../components/StatusBar";
import { HomeIndicator } from "../../components/HomeIndicator";
import { CustomBalanceCard } from "./CustomBalanceCard";
import type { BadgeIconId, CardVariant } from "../lib/card-designs";
import styles from "./CustomBalanceScreen.module.css";

type Props = {
  variant: CardVariant;
  /** Optional achievement badge stamped on the saved card (earned designs). */
  badge?: { icon: BadgeIconId; label: string } | null;
  onCustomise: () => void;
  onBack: () => void;
};

export function CustomBalanceScreen({ variant, badge, onCustomise, onBack }: Props) {
  return (
    <div className={styles.screen}>
      <StatusBar />
      <div className={styles.statusBarSpacer} aria-hidden="true" />

      <div className={styles.navBar}>
        <button type="button" className={styles.backBtn} aria-label="Back" onClick={onBack}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path
              d="M12.5 4.5L6.5 10l6 5.5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <h1 className={styles.title}>Depop Balance</h1>
      </div>

      {/* Card hero — the customise icon overlaps the bottom-right corner. */}
      <div className={styles.cardWrap}>
        <div className={styles.cardContainer}>
          <CustomBalanceCard variant={variant} badge={badge ?? null} />
          <button
            type="button"
            className={styles.customiseIconBtn}
            onClick={onCustomise}
            aria-label="Customise your card"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              {/* Magic wand handle — diagonal stick from lower-left to upper-right */}
              <path
                d="M3 17L11 9"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              {/* Star at the wand tip */}
              <path
                d="M14 3L15 5.5L17.5 6.5L15 7.5L14 10L13 7.5L10.5 6.5L13 5.5Z"
                fill="currentColor"
              />
              {/* Smaller floating sparkle for the magic trail */}
              <path
                d="M16.5 12.5L16.9 13.5L17.9 13.9L16.9 14.3L16.5 15.3L16.1 14.3L15.1 13.9L16.1 13.5Z"
                fill="currentColor"
                opacity="0.75"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Withdraw — full width again now that the customise icon lives on the card. */}
      <div className={styles.withdrawWrap}>
        <button type="button" className={styles.withdraw}>
          Withdraw
        </button>
      </div>

      <div className={styles.thickDivider} aria-hidden="true" />

      <div className={styles.transactions}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Latest transactions</h2>
          <button type="button" className={styles.seeAll}>
            See all
          </button>
        </div>

        <div className={styles.dateLabel}>Monday, 10 November</div>

        <button type="button" className={styles.tx}>
          <span className={styles.txAvatarWrap} aria-hidden="true">
            <span className={styles.txAvatar} />
            <span className={styles.txBadge}>
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                <path
                  d="M1.5 4.2L3.2 5.8 6.5 2.4"
                  stroke="white"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </span>
          <span className={styles.txMain}>
            <span className={styles.txTitle}>Sold</span>
            <span className={styles.txDesc}>Item description</span>
            <span className={styles.txMeta}>Paid</span>
          </span>
          <span className={styles.txAmount}>+$30.00</span>
        </button>
      </div>

      <TabBar />
      <HomeIndicator />
    </div>
  );
}

function TabBar() {
  return (
    <div className={styles.tabBar} aria-hidden="true">
      <Tab label="Home" icon={<IconHome filled />} />
      <Tab label="Discover" icon={<IconSearch />} />
      <Tab label="Sell" icon={<IconSell />} />
      <Tab label="Inbox" icon={<IconInbox />} />
      <Tab label="My Depop" icon={<IconProfile />} selected withBadge />
    </div>
  );
}

function Tab({
  label,
  icon,
  selected = false,
  withBadge = false,
}: {
  label: string;
  icon: ReactNode;
  selected?: boolean;
  withBadge?: boolean;
}) {
  return (
    <div className={`${styles.tab} ${selected ? styles.tabSelected : ""}`}>
      <span className={styles.tabIcon}>{icon}</span>
      <span className={styles.tabLabel}>{label}</span>
      {withBadge && <span className={styles.tabBadge} />}
    </div>
  );
}

function IconHome({ filled = false }: { filled?: boolean }) {
  return filled ? (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 3l9 7v11h-6v-7H9v7H3V10z" />
    </svg>
  ) : (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M3 10l9-7 9 7v11h-6v-7H9v7H3z" strokeLinejoin="round" />
    </svg>
  );
}

function IconSearch() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="11" cy="11" r="6.5" />
      <path d="M16 16l4 4" strokeLinecap="round" />
    </svg>
  );
}

function IconSell() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 5v14M5 12h14" strokeLinecap="round" />
    </svg>
  );
}

function IconInbox() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M3 6h18v12H3z" strokeLinejoin="round" />
      <path d="M3 6l9 7 9-7" strokeLinejoin="round" />
    </svg>
  );
}

function IconProfile() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="8" r="4" />
      <path
        d="M4 21c1-4 4-6 8-6s7 2 8 6"
        stroke="currentColor"
        strokeWidth="1.6"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}
