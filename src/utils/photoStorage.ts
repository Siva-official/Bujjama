// Utilities for saving, loading, and broadcasting uploaded photos across all frames

export interface PhotoSlotConfig {
  slotId: string;
  defaultTitle: string;
  defaultCaption: string;
  recommendedPhoto: string;
  pageName: string;
}

export const PHOTO_SLOTS: PhotoSlotConfig[] = [
  {
    slotId: 'birthday-spotlight',
    defaultTitle: 'Happy Birthday Bujjama ✨',
    defaultCaption: 'Today, the spotlight belongs to you. ❤️',
    recommendedPhoto: 'WhatsApp Image 2026-08-16 at 11.01.59 PM (Birthday Poster Edit / Red & Gold Lehenga)',
    pageName: 'Page 2: Birthday Reveal',
  },
  {
    slotId: 'her-01',
    defaultTitle: 'Golden Hour Glow 🌾',
    defaultCaption: 'Radiant in traditional red & gold amidst the golden field.',
    recommendedPhoto: 'WhatsApp Image 2026-08-16 at 10.03.18 PM (Golden Grass Field Red-Gold Saree)',
    pageName: 'Page 4: Her Gallery #1',
  },
  {
    slotId: 'her-02',
    defaultTitle: 'Forest Wanderer 🌲',
    defaultCaption: 'Free spirit with flowing hair in the tall eucalyptus grove.',
    recommendedPhoto: 'WhatsApp Image 2026-08-16 at 10.03.15 PM (Eucalyptus Forest Ombre Skirt)',
    pageName: 'Page 4: Her Gallery #2',
  },
  {
    slotId: 'her-03',
    defaultTitle: 'Candid Joy ☀️',
    defaultCaption: 'A sweet smile that warms the entire room.',
    recommendedPhoto: 'WhatsApp Image 2026-08-16 at 10.03.13 PM (Meadow Candid Red & Gold)',
    pageName: 'Page 4: Her Gallery #3',
  },
  {
    slotId: 'her-04',
    defaultTitle: 'Heritage Fortress Explorer 🏛️',
    defaultCaption: 'Framed by ancient stone archways and bright smiles.',
    recommendedPhoto: 'WhatsApp Image 2026-08-16 at 10.03.10 PM (Palace Stone Archway Floral Top)',
    pageName: 'Page 4: Her Gallery #4',
  },
  {
    slotId: 'her-05',
    defaultTitle: 'Sunlit Sparkle ✨',
    defaultCaption: 'Sunbeams filtering through leaves on a beautiful face.',
    recommendedPhoto: 'WhatsApp Image 2026-08-16 at 10.03.04 PM (Sunlit Bokeh Close-up Portrait)',
    pageName: 'Page 4: Her Gallery #5',
  },
  {
    slotId: 'her-06',
    defaultTitle: 'A Royal Twirl 💙',
    defaultCaption: 'Twirling like a princess before the carved palace wall.',
    recommendedPhoto: 'WhatsApp Image 2026-08-16 at 10.02.57 PM (Palace Wall Peacock Blue Gown Twirl)',
    pageName: 'Page 4: Her Gallery #6',
  },
  {
    slotId: 'together-01',
    defaultTitle: 'At the Heritage Gate 🚪',
    defaultCaption: 'Seated gracefully by the antique carved palace door.',
    recommendedPhoto: 'WhatsApp Image 2026-08-16 at 10.02.54 PM (Seated by Carved Wooden Door)',
    pageName: 'Page 4: Special Memory #1',
  },
  {
    slotId: 'together-02',
    defaultTitle: 'Flowing Hair & Grace 👑',
    defaultCaption: 'Every swirl captures a moment of pure magic.',
    recommendedPhoto: 'WhatsApp Image 2026-08-16 at 10.02.51 PM (Palace Wall Back Twirl)',
    pageName: 'Page 4: Special Memory #2',
  },
  {
    slotId: 'letter-memory',
    defaultTitle: 'A Timeless Reflection 🪞',
    defaultCaption: 'Mirror reflection in the grand palace museum gallery.',
    recommendedPhoto: 'WhatsApp Image 2026-08-16 at 10.02.47 PM (Gilded Mirror Reflection)',
    pageName: 'Page 6: Personal Letter Keepsake',
  },
  {
    slotId: 'gift-surprise',
    defaultTitle: 'Wonder in the Historic Hall 🛡️',
    defaultCaption: 'Eyes filled with awe inside the grand armory museum.',
    recommendedPhoto: 'WhatsApp Image 2026-08-16 at 10.02.45 PM (Museum Armory Hall Twirl)',
    pageName: 'Page 7: The Final Surprise Gift',
  },
  {
    slotId: 'finale-spotlight',
    defaultTitle: 'Queen of the Golden Palace 🏰✨',
    defaultCaption: 'Grace and poise beside the grand marble pillars under golden chandeliers.',
    recommendedPhoto: 'WhatsApp Image 2026-08-16 at 10.02.38 PM (Golden Palace Pillars & Chandelier)',
    pageName: 'Page 8: The Grand Finale',
  },
];

const STORAGE_PREFIX = 'birthday_app_photo_';

export function getStoredPhoto(slotId: string): string | null {
  try {
    return localStorage.getItem(`${STORAGE_PREFIX}${slotId}`);
  } catch (e) {
    return null;
  }
}

export function setStoredPhoto(slotId: string, dataUrl: string): void {
  try {
    localStorage.setItem(`${STORAGE_PREFIX}${slotId}`, dataUrl);
    window.dispatchEvent(new CustomEvent('photo-updated', { detail: { slotId, dataUrl } }));
  } catch (e) {
    console.error('Failed to save photo to localStorage', e);
  }
}

export function removeStoredPhoto(slotId: string): void {
  try {
    localStorage.removeItem(`${STORAGE_PREFIX}${slotId}`);
    window.dispatchEvent(new CustomEvent('photo-updated', { detail: { slotId, dataUrl: null } }));
  } catch (e) {
    console.error('Failed to remove photo from localStorage', e);
  }
}

export function getAllStoredPhotos(): Record<string, string> {
  const photos: Record<string, string> = {};
  PHOTO_SLOTS.forEach((slot) => {
    const saved = getStoredPhoto(slot.slotId);
    if (saved) {
      photos[slot.slotId] = saved;
    }
  });
  return photos;
}
