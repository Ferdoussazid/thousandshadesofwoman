import type { StaticImageData } from "next/image";
import type { Category } from "./stories";

// Photos from Unsplash (free license: commercial use, no attribution required).
// Static imports let next/image size them and add a blur placeholder.
import heroPinkSuit from "@/assets/images/hero-pink-suit.jpg";
import womenLaughing from "@/assets/images/women-laughing.jpg";
import womenTogether from "@/assets/images/women-together-stairs.jpg";
import womenCircle from "@/assets/images/women-circle.jpg";
import risingSunset from "@/assets/images/rising-sunset.jpg";
import floralRose from "@/assets/images/floral-rose.jpg";
import floralCosmos from "@/assets/images/floral-cosmos.jpg";
import career from "@/assets/images/career.jpg";
import motherhood from "@/assets/images/motherhood.jpg";
import identity from "@/assets/images/identity.jpg";
import health from "@/assets/images/health.jpg";
import loveAndLoss from "@/assets/images/love-and-loss.jpg";
import startingOver from "@/assets/images/starting-over.jpg";

export const IMAGES = {
  heroPinkSuit,
  womenLaughing,
  womenTogether,
  womenCircle,
  risingSunset,
  floralRose,
  floralCosmos,
};

type CategoryImage = { src: StaticImageData; alt: string; blurb: string };

export const CATEGORY_IMAGES: Record<Category, CategoryImage> = {
  Career: {
    src: career,
    alt: "A woman with long braids working on a laptop at her desk",
    blurb: "Ambition, rest, and redefining success",
  },
  Motherhood: {
    src: motherhood,
    alt: "A smiling mother holding her baby close in soft window light",
    blurb: "The love, the exhaustion, the becoming",
  },
  Identity: {
    src: identity,
    alt: "A woman in a pink patterned dress and sunglasses among green trees",
    blurb: "Who you are, on your own terms",
  },
  Health: {
    src: health,
    alt: "A woman's hand brushing through tall golden grass",
    blurb: "Bodies, minds, and healing slowly",
  },
  "Love & Loss": {
    src: loveAndLoss,
    alt: "Three women sitting on a bench with their arms around each other",
    blurb: "Holding on and letting go",
  },
  "Starting Over": {
    src: startingOver,
    alt: "Silhouettes of three women dancing with raised arms at sunset",
    blurb: "Second chances and brave beginnings",
  },
};
