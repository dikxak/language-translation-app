export interface TranslationConfig {
  translationOption: string;
  isMultipleWordsTranslated: boolean;
}

export interface TranslationLanguage {
  id: number;
  language: string;
}

export interface TranslatedContainerStyles {
  fontSize: number;
  color: string;
  backgroundColor: string;
}
