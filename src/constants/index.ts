import type { TranslationLanguage, TranslatedContainerStyles } from '@/types';

export const DEFAULT_TRANSLATION_CONFIG = {
  translationOption: 'auto',
  isMultipleWordsTranslated: false,
};

export const TRANSLATION_LANGUAGES: TranslationLanguage[] = [
  {
    id: 1,
    language: '🇳🇵Nepali',
  },
  {
    id: 2,
    language: '🇪🇸 Spanish',
  },
  {
    id: 3,
    language: '🇩🇪 German',
  },
  {
    id: 4,
    language: ' 🇨🇳 Chinese',
  },
  {
    id: 5,
    language: '🇮🇳 Hindi',
  },
  {
    id: 6,
    language: '🇮🇹 Italian',
  },
  {
    id: 7,
    language: '🇸🇪 Swedish',
  },
  {
    id: 8,
    language: '🇯🇵 Japanese',
  },
  {
    id: 9,
    language: '🇵🇹 Portuguese',
  },
  {
    id: 10,
    language: '🇬🇧 English',
  },
];

export const DEFAULT_TRANSLATED_TEXT_CONTAINER_STYLES: TranslatedContainerStyles =
  {
    fontSize: 32,
    color: '#1c1d1a',
    backgroundColor: '#f8df6d',
  };
