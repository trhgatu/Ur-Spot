export type Language = 'en' | 'vi';

export interface Translations {
  [key: string]: {
    [key in Language]: string;
  };
}

export const translations: Translations = {
  // Navigation
  'nav.regions': {
    en: 'Regions',
    vi: 'Vùng'
  },
  'nav.compare': {
    en: 'Compare',
    vi: 'So sánh'
  },
  'nav.evolution': {
    en: 'Evolution',
    vi: 'Tiến hóa'
  },
  'nav.favorites': {
    en: 'Favorites',
    vi: 'Yêu thích'
  },
  'nav.allPokemon': {
    en: 'All Pokemon',
    vi: 'Tất cả Pokémon'
  },
};