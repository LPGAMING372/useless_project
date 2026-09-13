import { hashString, mulberry32, clamp } from "./hash";

export const CAUSES_OF_DEATH = [
  "Severe procrastination",
  "Lack of funding",
  "Nobody asked",
  "Scope creep",
  "Lost motivation",
  "Already exists",
  "Too ambitious",
  "Founder went to sleep",
  "Skill issue",
  "Nobody understood it",
  "Overthinking",
  "\u201CI'll build it tomorrow\u201D",
  "Unexplained circumstances",
];

const RARE_CAUSE = "Killed by the developer";
const LEGENDARY_CAUSE = "This idea was too powerful. We had to bury it.";

const BUZZWORDS = [
  "ai",
  "blockchain",
  "uber for",
  "netflix for",
  "airbnb for",
  "tinder for",
  "social media for",
  "app for",
  "platform",
  "web3",
  "nft",
  "metaverse",
  "crypto",
  "subscription",
  "algorithm",
];

const GRANDIOSE_WORDS = [
  "revolutionize",
  "disrupt",
  "every",
  "everyone",
  "world",
  "global",
  "billion",
  "million",
  "industry",
  "future",
  "forever",
  "change the way",
];

const EPITAPH_TEMPLATES = [
  (title) => `Here lies "${title}", loved by no market whatsoever.`,
  (title) => `"${title}" — gone before the first commit.`,
  (title) => `It seemed brilliant at 2 a.m. Rest now, "${title}".`,
  (title) => `"${title}" fought scope creep and lost.`,
  (title) => `A moment of silence for "${title}", taken too soon by a group chat that said "eh".`,
  (title) => `"${title}" — pitched once, buried twice as fast.`,
  (title) => `In loving memory of "${title}", which never made it past a sticky note.`,
  (title) => `"${title}" is survived by seventeen abandoned browser tabs.`,
  (title) => `They said "${title}" would change everything. It changed nothing.`,
  (title) => `Here lies "${title}". The domain name is still available.`,
  (title) => `"${title}" — beloved in theory, unopened in practice.`,
  (title) => `Farewell, "${title}". Your Notion page will be missed.`,
];

const LAST_WORDS = [
  "I'll start tomorrow.",
  "It just needs one more feature.",
  "Someone else has probably already thought of this.",
  "I'll validate the idea first... eventually.",
  "It works perfectly in my head.",
  "I was going to make a pitch deck.",
  "Let me just finish this one Netflix episode first.",
  "The MVP was 90% done. Mentally.",
  "I bought the domain, that counts for something.",
  "It only needed funding, a team, and time.",
  "I'll ask ChatGPT to build it later.",
  "This was going to be my resignation letter idea.",
];

const LEGENDARY_EPITAPH =
  "Some ideas are too dangerous for this world. This is one of them.";
const LEGENDARY_LAST_WORDS = "You're not ready for this yet.";

function includesAny(text, list) {
  return list.some((word) => text.includes(word));
}

/**
 * Judge a submitted idea and produce its full death record.
 * `recentSubmissionCount` lets callers factor in rapid-fire burying
 * (handled by the caller for the "lots of ideas to get rid of" easter egg).
 */
export function judgeIdea({ title, description }) {
  const rawTitle = (title || "").trim();
  const rawDescription = (description || "").trim();
  const combined = `${rawTitle} ${rawDescription}`.toLowerCase();
  const combinedLength = rawTitle.length + rawDescription.length;

  const seed = hashString(combined || "blank idea") ^ Date.now();
  const random = mulberry32(seed >>> 0);

  const buzzwordHits = BUZZWORDS.filter((w) => combined.includes(w)).length;
  const grandioseHits = GRANDIOSE_WORDS.filter((w) => combined.includes(w)).length;

  // --- Base uselessness: more buzzwords = funnier = more useless ---
  let uselessness = 35 + buzzwordHits * 9 + Math.floor(random() * 30);
  uselessness = clamp(uselessness, 4, 99);

  // --- Ambition: grandiosity + sheer length of the pitch ---
  let ambition = grandioseHits * 14 + Math.min(combinedLength / 3, 40) + random() * 20;
  ambition = clamp(Math.round(ambition), 2, 100);

  // --- Resurrection chance: inverse of uselessness, with noise ---
  let resurrectionChance = clamp(
    Math.round(100 - uselessness * 0.8 + (random() - 0.5) * 20),
    1,
    97
  );

  let causeOfDeath;
  let epitaph;
  let lastWords;
  let legendary = false;
  let easterEgg = null;

  const roll = random();

  // --- Easter eggs (checked before the ordinary causes) ---
  if (/^i\s*don'?t\s*know$/i.test(combined.trim())) {
    causeOfDeath = "Lack of an idea.";
    easterEgg = "no-idea";
  } else if (combinedLength > 420) {
    causeOfDeath = "Died of unnecessary complexity.";
    easterEgg = "too-long";
  } else if (roll > 0.995) {
    // ~0.5% — the legendary, extremely rare outcome
    causeOfDeath = LEGENDARY_CAUSE;
    epitaph = LEGENDARY_EPITAPH;
    lastWords = LEGENDARY_LAST_WORDS;
    uselessness = 100;
    resurrectionChance = 0;
    legendary = true;
    easterEgg = "legendary";
  } else if (roll > 0.97) {
    // ~2.5% — rare
    causeOfDeath = RARE_CAUSE;
    easterEgg = "rare";
  } else {
    const index = Math.floor(random() * CAUSES_OF_DEATH.length);
    causeOfDeath = CAUSES_OF_DEATH[index];
  }

  if (!epitaph) {
    const epitaphIndex = Math.floor(random() * EPITAPH_TEMPLATES.length);
    epitaph = EPITAPH_TEMPLATES[epitaphIndex](rawTitle || "Untitled Idea");
  }
  if (!lastWords) {
    const lastWordsIndex = Math.floor(random() * LAST_WORDS.length);
    lastWords = LAST_WORDS[lastWordsIndex];
  }

  return {
    uselessness,
    resurrectionChance,
    ambition,
    causeOfDeath,
    epitaph,
    lastWords,
    legendary,
    easterEgg,
  };
}

export const JUDGMENT_STEPS = [
  "Checking originality...",
  "Checking usefulness...",
  "Checking practicality...",
  "Checking chance of completion...",
  "Consulting the void...",
];
