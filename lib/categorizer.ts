import { CATEGORIES, type Category } from "./story-types";

// Weighted keywords for each of the six shades
const THEME_KEYWORDS: Record<Category, { primary: string[]; secondary: string[] }> = {
  Motherhood: {
    primary: [
      "mother", "motherhood", "pregnancy", "pregnant", "postpartum", "baby",
      "toddler", "child", "children", "nursing", "breastfeeding", "birth",
      "giving birth", "daughter", "son", "maternity", "newborn", "parenting",
      "mama", "mom", "infant", "labor", "trimester", "miscarriage"
    ],
    secondary: [
      "nursery", "sleepless", "night feed", "diaper", "pediatrician", "family",
      "crying", "crib", "stroller", "pumping", "preschool", "bedtime", "belly"
    ],
  },
  Career: {
    primary: [
      "career", "promotion", "promoted", "salary", "job", "corporate", "office",
      "manager", "boss", "workplace", "colleagues", "interview", "quit", "resigned",
      "resignation", "founder", "startup", "business", "client", "profession",
      "ambition", "ambitious", "raise", "layoff", "laid off", "hired", "fired"
    ],
    secondary: [
      "desk", "resume", "meeting", "colleague", "work", "ladder", "profession",
      "industry", "executive", "company", "leadership", "commute", "overtime",
      "pay", "negotiate", "negotiation", "working"
    ],
  },
  Health: {
    primary: [
      "health", "healing", "diagnosis", "diagnosed", "doctor", "hospital",
      "chronic", "illness", "disease", "therapy", "therapist", "mental health",
      "depression", "anxiety", "surgery", "recovery", "medicine", "medication",
      "body", "pain", "treatment", "remission", "disorder", "exhaustion", "burnout"
    ],
    secondary: [
      "clinic", "symptom", "fatigue", "breath", "resting", "rest", "wellness",
      "breathe", "healing", "medical", "patient", "nurse", "panic", "trauma"
    ],
  },
  "Love & Loss": {
    primary: [
      "grief", "loss", "grieving", "heartbreak", "heartbroken", "divorce",
      "divorced", "breakup", "broke up", "husband", "partner", "boyfriend",
      "marriage", "ex", "passed away", "died", "death", "funeral", "widow",
      "mourning", "mourn", "goodbye", "loss of", "lonely", "loneliness"
    ],
    secondary: [
      "wedding", "rings", "separated", "separation", "tears", "memories",
      "grave", "crying", "alone", "miss him", "miss her", "unrequited", "sorrow"
    ],
  },
  "Starting Over": {
    primary: [
      "starting over", "fresh start", "new beginning", "begin again", "rebuild",
      "rebuilt", "restarting", "relocated", "moving away", "new city", "suitcases",
      "second chance", "reinvent", "reinvention", "thirty", "forty", "fifty",
      "blank page", "turning point", "reset", "unfamiliar"
    ],
    secondary: [
      "packed", "moved", "apartment", "boxes", "leap", "unknown", "scared",
      "courage", "stranger", "new chapter", "freedom", "independent", "fresh"
    ],
  },
  Identity: {
    primary: [
      "identity", "who i am", "womanhood", "woman", "heritage", "culture",
      "roots", "boundaries", "self-worth", "authenticity", "belonging",
      "permission", "perfectionism", "unapologetic", "own terms", "finding myself",
      "voice", "confidence", "people pleasing"
    ],
    secondary: [
      "expectations", "shame", "worth", "mask", "pretending", "proud",
      "discover", "discovered", "mirror", "reflection", "quiet", "truth"
    ],
  },
};

export type CategoryPrediction = {
  category: Category;
  confidence: "high" | "medium" | "low";
  scores: Record<Category, number>;
};

export function predictCategory(title: string, body: string): CategoryPrediction {
  const cleanTitle = title.toLowerCase();
  const cleanBody = body.toLowerCase();

  const scores: Record<Category, number> = {
    Career: 0,
    Motherhood: 0,
    Identity: 0,
    Health: 0,
    "Love & Loss": 0,
    "Starting Over": 0,
  };

  for (const cat of CATEGORIES) {
    const { primary, secondary } = THEME_KEYWORDS[cat];

    // Primary keywords in title count for 6 points
    for (const kw of primary) {
      if (cleanTitle.includes(kw)) {
        scores[cat] += 6;
      }
      // Primary in body count for 2 points per occurrence (up to 4 matches)
      const matches = cleanBody.split(kw).length - 1;
      scores[cat] += Math.min(matches, 4) * 2;
    }

    // Secondary keywords in title count for 3 points
    for (const kw of secondary) {
      if (cleanTitle.includes(kw)) {
        scores[cat] += 3;
      }
      // Secondary in body count for 1 point
      const matches = cleanBody.split(kw).length - 1;
      scores[cat] += Math.min(matches, 3);
    }
  }

  // Find category with highest score
  let bestCategory: Category = "Identity";
  let maxScore = -1;

  for (const cat of CATEGORIES) {
    if (scores[cat] > maxScore) {
      maxScore = scores[cat];
      bestCategory = cat;
    }
  }

  let confidence: "high" | "medium" | "low" = "low";
  if (maxScore >= 8) {
    confidence = "high";
  } else if (maxScore >= 4) {
    confidence = "medium";
  }

  return {
    category: bestCategory,
    confidence,
    scores,
  };
}
