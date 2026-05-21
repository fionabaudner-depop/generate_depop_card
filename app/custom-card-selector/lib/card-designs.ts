/**
 * Card design library for the Custom Card Selector prototype.
 *
 * A "design" is a themed concept (e.g. Depop classic, Y2K, Top seller).
 * Each design has multiple "variants" — colour/pattern options the user can
 * pick from a swatch row. Both pieces map to the same CSS surface treatments
 * used by `CustomBalanceCard`.
 *
 * Designs are split into two categories:
 *  - `design`  — always-available styling cards (free for everyone).
 *  - `earned`  — status-themed cards unlocked through the seller journey.
 *                Each earned design carries `earned` metadata describing the
 *                achievement (badge icon + label + unlock condition).
 */

import type { UnlockCondition } from "./seller-status";

export type CardVariant = {
  id: string;
  label: string;
  /** CSS background for the picker swatch (circular). */
  swatch: string;
  /** Background applied to the actual balance card. */
  cardGradient: string;
  /** Foreground text colour on the card. */
  cardTextColor: "#ffffff" | "#1a1a1a";
  /** Optional pattern overlay (svg/png url) layered above the gradient. */
  pattern?: string;
};

export type BadgeIconId =
  | "ribbon"
  | "spark"
  | "star"
  | "shield"
  | "briefcase"
  | "anniversary";

export type EarnedMeta = {
  /** Achievement icon shown on the card surface and in the lock overlay. */
  icon: BadgeIconId;
  /** Short label printed under the icon on the card (e.g. "TOP SELLER"). */
  label: string;
  /** What the user has to do to unlock this design. */
  unlock: UnlockCondition;
};

export type CardDesign = {
  id: string;
  name: string;
  description: string;
  availability: string;
  availabilityTone: "neutral" | "limited" | "new";
  category: "design" | "earned";
  variants: CardVariant[];
  /** Set when `category === "earned"`. */
  earned?: EarnedMeta;
};

export const CARD_DESIGNS: CardDesign[] = [
  // ----------------------------- DESIGN CARDS ------------------------------
  {
    id: "classic",
    name: "Depop classic",
    description: "The card that started it all. Bold, bright, recognisable — your way.",
    availability: "Free",
    availabilityTone: "neutral",
    category: "design",
    variants: [
      {
        id: "red",
        label: "Red",
        swatch:
          "radial-gradient(circle at 30% 30%, #e20020 0%, #ba0130 45%, #410f4f 100%)",
        cardGradient:
          "radial-gradient(120% 90% at 50% 0%, #e20020 0%, #ba0130 40%, #91013f 70%, #410f4f 100%)",
        cardTextColor: "#ffffff",
      },
      {
        id: "midnight",
        label: "Midnight",
        swatch: "linear-gradient(135deg, #0a0a14 0%, #2a2a3a 100%)",
        cardGradient: "linear-gradient(135deg, #0a0a14 0%, #1f1f33 60%, #2a2a3a 100%)",
        cardTextColor: "#ffffff",
      },
      {
        id: "rose",
        label: "Rose",
        swatch: "linear-gradient(135deg, #ff6fb5 0%, #c4297f 100%)",
        cardGradient: "linear-gradient(135deg, #ff6fb5 0%, #c4297f 65%, #7a1554 100%)",
        cardTextColor: "#ffffff",
      },
      {
        id: "olive",
        label: "Olive",
        swatch: "linear-gradient(135deg, #5e6e3a 0%, #2a3618 100%)",
        cardGradient: "linear-gradient(135deg, #5e6e3a 0%, #3e4a24 60%, #2a3618 100%)",
        cardTextColor: "#ffffff",
      },
      {
        id: "linen",
        label: "Linen",
        swatch: "linear-gradient(135deg, #f3eedf 0%, #c8bca0 100%)",
        cardGradient: "linear-gradient(135deg, #f3eedf 0%, #ddd2b6 50%, #c8bca0 100%)",
        cardTextColor: "#1a1a1a",
      },
    ],
  },
  {
    id: "vintage",
    name: "Vintage edit",
    description: "Inspired by your favourite era. Sepia tones, soft warmth, lived-in character.",
    availability: "Free",
    availabilityTone: "neutral",
    category: "design",
    variants: [
      {
        id: "sepia",
        label: "Sepia",
        swatch: "linear-gradient(135deg, #a07655 0%, #4a3220 100%)",
        cardGradient: "linear-gradient(135deg, #c69973 0%, #8b6442 55%, #4a3220 100%)",
        cardTextColor: "#ffffff",
      },
      {
        id: "denim",
        label: "Denim",
        swatch: "linear-gradient(135deg, #5a7a9f 0%, #2a3e5a 100%)",
        cardGradient: "linear-gradient(135deg, #7a98ba 0%, #4a6788 55%, #2a3e5a 100%)",
        cardTextColor: "#ffffff",
      },
      {
        id: "rust",
        label: "Rust",
        swatch: "linear-gradient(135deg, #c4623a 0%, #6b2818 100%)",
        cardGradient: "linear-gradient(135deg, #d97e54 0%, #a44a2a 55%, #6b2818 100%)",
        cardTextColor: "#ffffff",
      },
      {
        id: "moss",
        label: "Moss",
        swatch: "linear-gradient(135deg, #7a8a55 0%, #2e3a1f 100%)",
        cardGradient: "linear-gradient(135deg, #93a36a 0%, #5e6e3f 55%, #2e3a1f 100%)",
        cardTextColor: "#ffffff",
      },
      {
        id: "bone",
        label: "Bone",
        swatch: "linear-gradient(135deg, #ede2cc 0%, #b5a384 100%)",
        cardGradient: "linear-gradient(135deg, #f4ebd6 0%, #d4c4a1 50%, #b5a384 100%)",
        cardTextColor: "#1a1a1a",
      },
    ],
  },
  {
    id: "y2k",
    name: "Y2K",
    description: "Chrome dreams. Liquid metal finishes for the iridescent generation.",
    availability: "New",
    availabilityTone: "new",
    category: "design",
    variants: [
      {
        id: "holo",
        label: "Holo",
        swatch:
          "linear-gradient(135deg, #c5e8ff 0%, #ffd6f5 30%, #d6c5ff 60%, #c5fff0 100%)",
        cardGradient:
          "linear-gradient(135deg, #c5e8ff 0%, #ffd6f5 30%, #d6c5ff 60%, #c5fff0 100%)",
        cardTextColor: "#1a1a1a",
      },
      {
        id: "chrome",
        label: "Chrome",
        swatch:
          "linear-gradient(135deg, #f5f5f5 0%, #bbbbbb 40%, #f5f5f5 60%, #888888 100%)",
        cardGradient:
          "linear-gradient(135deg, #f5f5f5 0%, #c5c5c5 30%, #f5f5f5 50%, #a5a5a5 80%, #d5d5d5 100%)",
        cardTextColor: "#1a1a1a",
      },
      {
        id: "neon",
        label: "Neon",
        swatch: "linear-gradient(135deg, #00f0ff 0%, #ff00d4 100%)",
        cardGradient: "linear-gradient(135deg, #00f0ff 0%, #6a4fff 45%, #ff00d4 100%)",
        cardTextColor: "#ffffff",
      },
      {
        id: "sunset",
        label: "Sunset",
        swatch: "linear-gradient(135deg, #ffb347 0%, #ff5f6d 60%, #c44569 100%)",
        cardGradient: "linear-gradient(135deg, #ffd166 0%, #ff8a5b 35%, #ff5f6d 70%, #c44569 100%)",
        cardTextColor: "#ffffff",
      },
    ],
  },

  // ------------------------------ EARNED CARDS -----------------------------
  {
    id: "first-sale",
    name: "First sale",
    description: "Your first sale on Depop — and it deserves a card to match.",
    availability: "Earned",
    availabilityTone: "new",
    category: "earned",
    earned: {
      icon: "ribbon",
      label: "First sale",
      unlock: { type: "sales", target: 1 },
    },
    variants: [
      {
        id: "confetti",
        label: "Confetti",
        swatch: "linear-gradient(135deg, #ffd166 0%, #ff8a5b 60%, #e23e57 100%)",
        cardGradient:
          "linear-gradient(135deg, #ffd86b 0%, #ff8a5b 50%, #e23e57 100%)",
        cardTextColor: "#ffffff",
      },
      {
        id: "dawn",
        label: "Dawn",
        swatch: "linear-gradient(135deg, #ffe1ec 0%, #ff9ec4 60%, #c4297f 100%)",
        cardGradient:
          "linear-gradient(135deg, #ffe1ec 0%, #ffa9cc 45%, #c4297f 100%)",
        cardTextColor: "#1a1a1a",
      },
    ],
  },
  {
    id: "rising-star",
    name: "Rising star",
    description: "Made it past your tenth sale. Things are picking up.",
    availability: "Earned",
    availabilityTone: "new",
    category: "earned",
    earned: {
      icon: "spark",
      label: "Rising star",
      unlock: { type: "sales", target: 10 },
    },
    variants: [
      {
        id: "aurora",
        label: "Aurora",
        swatch: "linear-gradient(135deg, #6ee7ff 0%, #6a4fff 60%, #c33dff 100%)",
        cardGradient:
          "linear-gradient(135deg, #5fd6ff 0%, #6a4fff 50%, #c33dff 100%)",
        cardTextColor: "#ffffff",
      },
      {
        id: "sunrise",
        label: "Sunrise",
        swatch: "linear-gradient(135deg, #ffd166 0%, #ef476f 100%)",
        cardGradient:
          "linear-gradient(135deg, #ffe27a 0%, #ff8a5b 45%, #ef476f 100%)",
        cardTextColor: "#ffffff",
      },
    ],
  },
  {
    id: "top-seller",
    name: "Top seller",
    description: "Reserved for Depop's Top Sellers. Premium finishes, real pride.",
    availability: "Earned",
    availabilityTone: "limited",
    category: "earned",
    earned: {
      icon: "star",
      label: "Top seller",
      unlock: { type: "sales", target: 50 },
    },
    variants: [
      {
        id: "gold-foil",
        label: "Gold foil",
        swatch: "linear-gradient(135deg, #ffe9a3 0%, #d4a017 50%, #6e4e0a 100%)",
        cardGradient:
          "linear-gradient(135deg, #ffe9a3 0%, #f1c84b 35%, #b3870f 70%, #6e4e0a 100%)",
        cardTextColor: "#1a1a1a",
      },
      {
        id: "platinum",
        label: "Platinum",
        swatch: "linear-gradient(135deg, #f3f4f7 0%, #b6bac4 50%, #6c707a 100%)",
        cardGradient:
          "linear-gradient(135deg, #f3f4f7 0%, #d6d9e0 35%, #9ea3ad 70%, #6c707a 100%)",
        cardTextColor: "#1a1a1a",
      },
      {
        id: "rose-gold",
        label: "Rose gold",
        swatch: "linear-gradient(135deg, #ffd9c9 0%, #d68d75 50%, #7e3a2c 100%)",
        cardGradient:
          "linear-gradient(135deg, #ffd9c9 0%, #e8a48a 35%, #b8624a 70%, #7e3a2c 100%)",
        cardTextColor: "#1a1a1a",
      },
    ],
  },
  {
    id: "anniversary",
    name: "5 year anniversary",
    description: "Five years on Depop and still going. A vintage badge for veterans.",
    availability: "Earned",
    availabilityTone: "limited",
    category: "earned",
    earned: {
      icon: "anniversary",
      label: "5 years",
      unlock: { type: "anniversary", years: 5 },
    },
    variants: [
      {
        id: "heritage",
        label: "Heritage",
        swatch: "linear-gradient(135deg, #d2b48c 0%, #5b3a1a 100%)",
        cardGradient:
          "linear-gradient(135deg, #e8c89a 0%, #a37644 50%, #5b3a1a 100%)",
        cardTextColor: "#ffffff",
      },
      {
        id: "gilded",
        label: "Gilded",
        swatch: "linear-gradient(135deg, #f9e0a2 0%, #8a5a1a 100%)",
        cardGradient:
          "linear-gradient(135deg, #f9e0a2 0%, #c89c3e 45%, #8a5a1a 100%)",
        cardTextColor: "#1a1a1a",
      },
    ],
  },
];

export function getDesign(id: string): CardDesign {
  return CARD_DESIGNS.find((d) => d.id === id) ?? CARD_DESIGNS[0];
}

export function getVariant(designId: string, variantId: string): CardVariant {
  const design = getDesign(designId);
  return design.variants.find((v) => v.id === variantId) ?? design.variants[0];
}
