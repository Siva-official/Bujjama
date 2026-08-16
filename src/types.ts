export interface LifeChapter {
  id: string;
  chapter: string; // e.g. "Chapter 01"
  age: string; // e.g. "0–5 Years"
  title: string; // e.g. "The Little One"
  description: string;
  quote: string;
  icon: string;
  tag?: string;
  isSpecial?: boolean;
}

export interface AgeMilestone {
  ageLabel: string;
  subtitle: string;
  icon?: string;
}

export interface PhotoItem {
  id: string;
  image: string;
  caption: string;
  title?: string;
  category?: 'her';
  section?: 'smile' | 'moments' | 'versions';
  layoutSpan?: 'portrait' | 'landscape' | 'large' | 'standard';
  location?: string;
  date?: string;
}

export interface LoveQuality {
  id: string;
  number: string;
  title: string;
  shortTag?: string;
  message: string;
  icon: string;
}

export interface LetterConfig {
  greeting: string;
  paragraphs: string[];
  closing: string;
  signatureName: string;
  secretMessage?: string;
}

export interface FinalSurpriseConfig {
  introLine1: string;
  introLine2: string;
  introButtonText: string;
  oneLastThing: string;
  reminderMessage: string;
  birthdayWishTitle: string;
  wishesList: string[];
  finalPrompt: string;
  closing: string;
  signatureName: string;
  footerText: string;
  replayButtonText: string;
  finalPhoto?: string;
}
