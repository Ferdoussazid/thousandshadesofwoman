export type AgeGroup = "teens" | "twenties-thirties" | "forties-fifties" | "sixty-plus";

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  category: "shades" | "jewelry" | "bags" | "scarves";
  age_group: AgeGroup | null;
  color_from: string;
  color_to: string;
  featured: boolean;
}

export interface AgeCollection {
  key: AgeGroup;
  title: string;
  ageLabel: string;
  tagline: string;
  gradient: string;
}

export const AGE_COLLECTIONS: AgeCollection[] = [
  {
    key: "teens",
    title: "The Dreamer",
    ageLabel: "Teens",
    tagline: "Playful frames in candy tones for the girl discovering her shine.",
    gradient: "from-pink-300 via-rose-300 to-fuchsia-400",
  },
  {
    key: "twenties-thirties",
    title: "The Visionary",
    ageLabel: "20s – 30s",
    tagline: "Bold silhouettes for the woman building her world.",
    gradient: "from-amber-300 via-orange-300 to-rose-400",
  },
  {
    key: "forties-fifties",
    title: "The Icon",
    ageLabel: "40s – 50s",
    tagline: "Refined classics that carry confidence in every curve.",
    gradient: "from-rose-400 via-red-300 to-amber-300",
  },
  {
    key: "sixty-plus",
    title: "The Legend",
    ageLabel: "60+",
    tagline: "Timeless elegance for the woman who wrote her own story.",
    gradient: "from-violet-300 via-purple-300 to-rose-300",
  },
];

export const AGE_GROUP_LABELS: Record<AgeGroup, string> = {
  teens: "Teens",
  "twenties-thirties": "20s – 30s",
  "forties-fifties": "40s – 50s",
  "sixty-plus": "60+",
};
