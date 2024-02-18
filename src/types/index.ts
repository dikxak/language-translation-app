export interface TranslationConfig {
  translateText: string;
  translationOption: string;
  translateTextError: string;
  translateLanguageCode: string;
  isMultipleWordsTranslated: boolean;
}

export interface TranslationLanguage {
  id: number;
  language: string;
  code: string;
}

export interface TranslatedContainerStyles {
  fontSize: number;
  color: string;
  backgroundColor: string;
}

export interface AutoDetectFetchResponse {
  source_lang: string;
  trust_level: number;
  source_lang_code: string;
}
