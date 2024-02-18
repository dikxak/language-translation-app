import type { TranslationLanguage, TranslatedContainerStyles } from '@/types';

export const DEFAULT_TRANSLATION_CONFIG = {
  translateText: '',
  translationOption: 'auto',
  translateLanguageCode: '',
  isMultipleWordsTranslated: false,
  translateTextError: '',
};

export const TRANSLATION_LANGUAGES: TranslationLanguage[] = [
  {
    id: 1,
    language: '🇳🇵Nepali',
    code: 'ne',
  },
  {
    id: 2,
    language: '🇪🇸 Spanish',
    code: 'es',
  },
  {
    id: 3,
    language: '🇩🇪 German',
    code: 'de',
  },
  {
    id: 4,
    language: ' 🇨🇳 Chinese',
    code: 'zh',
  },
  {
    id: 5,
    language: '🇮🇳 Hindi',
    code: 'hi',
  },
  {
    id: 6,
    language: '🇮🇹 Italian',
    code: 'it',
  },
  {
    id: 7,
    language: '🇸🇪 Swedish',
    code: 'sv',
  },
  {
    id: 8,
    language: '🇯🇵 Japanese',
    code: 'ja',
  },
  {
    id: 9,
    language: '🇵🇹 Portuguese',
    code: 'pt',
  },
  {
    id: 10,
    language: '🇬🇧 English',
    code: 'en',
  },
];

export const DEFAULT_TRANSLATED_TEXT_CONTAINER_STYLES: TranslatedContainerStyles =
  {
    fontSize: 32,
    color: '#1c1d1a',
    backgroundColor: '#f8df6d',
  };

export const FONT_SIZE_CONFIGURATION = {
  min: 16,
  max: 64,
  step: 4,
};
