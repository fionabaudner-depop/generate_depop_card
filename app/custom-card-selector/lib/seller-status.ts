/**
 * Seller-status model for the Custom Card Selector "Earned" cards.
 *
 * In production these values would come from the user's profile + sales data.
 * For the prototype we hardcode a `DemoUserStatus` constant so the demo flow
 * always tells the same story. Swapping it to a different state (e.g.
 * "champion" with everything unlocked) is a one-line change at the bottom of
 * this file.
 */

export type AccountType = "personal" | "business";

export type DemoUserStatus = {
  /** Total completed sales. */
  salesCount: number;
  /** Whether the user has completed identity verification. */
  isVerified: boolean;
  /** Personal vs business account. */
  accountType: AccountType;
  /** How long the user has been on Depop, in months. */
  memberMonths: number;
};

/**
 * Discriminated union covering every kind of unlock our earned cards support.
 * Add new conditions here as the rewards system grows (ratings, payout volume,
 * referrals, etc.).
 */
export type UnlockCondition =
  | { type: "sales"; target: number }
  | { type: "verified" }
  | { type: "business" }
  | { type: "anniversary"; years: number };

/**
 * Demo user state.
 *
 * Currently set to "newcomer": just made their first sale, personal account,
 * not verified, joined six months ago. Result: First sale unlocked, every
 * other earned card locked with progress copy.
 *
 * To showcase a different scenario (e.g. Top tier seller), nudge the values
 * below. No other code changes are required.
 */
export const DEMO_USER_STATUS: DemoUserStatus = {
  salesCount: 5,
  isVerified: false,
  accountType: "personal",
  memberMonths: 6,
};

/**
 * Returns true when the user has met the unlock condition for an earned card.
 */
export function isDesignUnlocked(
  condition: UnlockCondition,
  status: DemoUserStatus = DEMO_USER_STATUS
): boolean {
  switch (condition.type) {
    case "sales":
      return status.salesCount >= condition.target;
    case "verified":
      return status.isVerified;
    case "business":
      return status.accountType === "business";
    case "anniversary":
      return status.memberMonths >= condition.years * 12;
  }
}

/**
 * Short progress string that sits under the design title in the selector.
 * Returns an empty string if the design is already unlocked.
 */
export function getUnlockProgress(
  condition: UnlockCondition,
  status: DemoUserStatus = DEMO_USER_STATUS
): string {
  if (isDesignUnlocked(condition, status)) return "";

  switch (condition.type) {
    case "sales":
      return `${status.salesCount} of ${condition.target} sales to unlock`;
    case "verified":
      return "Verify your ID to unlock";
    case "business":
      return "Switch to a business account to unlock";
    case "anniversary": {
      const targetMonths = condition.years * 12;
      const remainingMonths = Math.max(1, targetMonths - status.memberMonths);
      const remainingYears = Math.round((remainingMonths / 12) * 10) / 10;
      return remainingYears >= 1
        ? `${remainingYears} year${remainingYears === 1 ? "" : "s"} to go`
        : `${remainingMonths} month${remainingMonths === 1 ? "" : "s"} to go`;
    }
  }
}

/**
 * Short headline shown on the locked-card overlay. Identifies what the user is
 * working towards in plain language.
 */
export function getUnlockHeadline(condition: UnlockCondition): string {
  switch (condition.type) {
    case "sales":
      if (condition.target <= 10) return "Rising star";
      if (condition.target <= 50) return "Top seller";
      return `${condition.target} sales`;
    case "verified":
      return "Verified seller";
    case "business":
      return "Business account";
    case "anniversary":
      return `${condition.years} year anniversary`;
  }
}
