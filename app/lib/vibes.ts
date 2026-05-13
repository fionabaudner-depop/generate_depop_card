export type VibeId = "vintage" | "street" | "minimal" | "maximalist" | "help";

export type Vibe = {
  id: VibeId;
  label: string;
  image: string;
  tagline: string;
  cardGradient: string;
  cardTextColor: string;
  accent: string;
  perks: string[];
};

export const VIBES: Record<VibeId, Vibe> = {
  vintage: {
    id: "vintage",
    label: "Vintage Hunter",
    image: "/images/vintage-handbag.png",
    tagline: "You hunt down one-of-a-kind pieces with a story — the older and rarer, the better.",
    cardGradient: "linear-gradient(135deg, #C39867 0%, #6B4423 100%)",
    cardTextColor: "#FBF1E2",
    accent: "#F2D7A9",
    perks: ["1.5× cashback on vintage", "Early drops from top hunters", "Free shipping on rare finds"],
  },
  street: {
    id: "street",
    label: "Street Stylist",
    image: "/images/sneaker.png",
    tagline: "Hyped drops, fresh kicks and bold fits — your style lives where culture moves.",
    cardGradient: "linear-gradient(135deg, #FF2300 0%, #1A1A1A 100%)",
    cardTextColor: "#FFFFFF",
    accent: "#FF6A4D",
    perks: ["Priority authentication", "Sneaker drop alerts", "2× cashback on streetwear"],
  },
  minimal: {
    id: "minimal",
    label: "Minimal Modern",
    image: "/images/clothes-hanger.png",
    tagline: "Clean lines, neutral tones and quiet quality — a wardrobe that does more with less.",
    cardGradient: "linear-gradient(135deg, #EDEAE3 0%, #C9C4BC 100%)",
    cardTextColor: "#1A1A1A",
    accent: "#8C8275",
    perks: ["Capsule wardrobe edits", "Lower fees on resale", "Carbon‑offset shipping"],
  },
  maximalist: {
    id: "maximalist",
    label: "Fashion Maximalist",
    image: "/images/pink-boot.png",
    tagline: "More colour, more print, more personality — you treat every fit like a main character moment.",
    cardGradient: "linear-gradient(135deg, #FF6FB5 0%, #7A1FA2 100%)",
    cardTextColor: "#FFFFFF",
    accent: "#FFD1E8",
    perks: ["Trending now feed", "Stylist matchmaking", "Bold fit cashback"],
  },
  help: {
    id: "help",
    label: "Surprise Me",
    image: "/images/magic-wand.png",
    tagline: "We picked your vibe based on the styles you love most on Depop.",
    cardGradient: "linear-gradient(135deg, #1A1A1A 0%, #4A4A4A 50%, #8A8A8A 100%)",
    cardTextColor: "#FFFFFF",
    accent: "#FF2300",
    perks: ["A little of everything", "Mystery monthly drop", "Always‑on cashback"],
  },
};
