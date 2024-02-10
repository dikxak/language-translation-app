import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';

import MicrophoneIcon from '@/components/icons/Microphone';
import DotsLoader from '@/components/DotsLoader';

import TranslationApi from '@/api/Translate';

import { DEFAULT_TRANSLATION_CONFIG } from '@/constants';
import LANGUAGE_CODES from '@/constants/languageCodes';

import { type AutoDetectFetchResponse, type TranslationConfig } from '@/types';

import useDebouncedValue from '@/hooks/useDebouncedValue';

import showToast from '@/utils/showToast';
import getPlaceholderText from '@/utils/getPlaceholderText';

const MAX_CHARACTERS_ALLOWED = 75;

const TranslateTextInput = (): React.JSX.Element => {
  const [translationConfig, setTranslationConfig] = useState<TranslationConfig>(
    DEFAULT_TRANSLATION_CONFIG,
  );
  const [isLanguageDetecting, setIsLanguageDetecting] =
    useState<boolean>(false);
  const [detectedLanguage, setDetectedLanguage] = useState<string>('');

  const {
    translationOption,
    isMultipleWordsTranslated,
    translateText,
    translateTextError,
  } = translationConfig;

  const debouncedTranslateText = useDebouncedValue<string>(
    !(translationOption === 'english') ? translateText : '',
    500,
  );

  const isTranslationOptionEnglish = translationOption === 'english';
  const inputPlaceholder = getPlaceholderText(
    isTranslationOptionEnglish,
    isMultipleWordsTranslated,
  );

  const handleTranslateTextChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = e.target;

    if (value.length > MAX_CHARACTERS_ALLOWED) {
      setTranslationConfig({
        ...translationConfig,
        translateTextError: `Only ${MAX_CHARACTERS_ALLOWED} characters are allowed`,
      });

      return;
    }

    setTranslationConfig({
      ...translationConfig,
      translateText: value,
      translateTextError: '',
    });
    setDetectedLanguage('');
  };

  const handleTranslationOptionChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newIsMultipleWordsTranslated =
      e.target.value === 'auto'
        ? false
        : translationConfig.isMultipleWordsTranslated;

    setTranslationConfig({
      ...translationConfig,
      translationOption: e.target.value,
      isMultipleWordsTranslated: newIsMultipleWordsTranslated,
      translateText: '',
    });
    setDetectedLanguage('');
    setIsLanguageDetecting(false);
  };

  const handleMultipleTranslationChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setTranslationConfig({
      ...translationConfig,
      isMultipleWordsTranslated: e.target.checked,
    });
  };

  const translateMultipleWordsCheckbox = isTranslationOptionEnglish && (
    <label className="multiple-words-checkbox" htmlFor="multipleWords">
      <input
        id="multipleWords"
        type="checkbox"
        onChange={handleMultipleTranslationChange}
      />
      Translate multiple words
    </label>
  );

  const microphoneButtonIcon = isTranslationOptionEnglish &&
    !isMultipleWordsTranslated && (
      <button type="button" className="microphone-icon">
        <MicrophoneIcon />
      </button>
    );

  const dotsLoader = isLanguageDetecting && !isTranslationOptionEnglish && (
    <DotsLoader />
  );

  useEffect(() => {
    const detectLanguage = async () => {
      try {
        setIsLanguageDetecting(true);

        const response = await TranslationApi.detect(
          new URLSearchParams({ text: debouncedTranslateText }),
        );
        const { source_lang_code: languageCode }: AutoDetectFetchResponse =
          await response.json();

        setDetectedLanguage(LANGUAGE_CODES[languageCode]);
      } catch (error: unknown) {
        let errorMessage = '';

        if (error instanceof Error) errorMessage = error.message;
        else if (typeof error === 'string') errorMessage = error;

        showToast('error', errorMessage);
      } finally {
        setIsLanguageDetecting(false);
      }
    };

    if (debouncedTranslateText) detectLanguage();
  }, [debouncedTranslateText]);

  return (
    <>
      <div className="translate-text-options">
        <label htmlFor="autoDetect">
          Auto detect
          <input
            id="autoDetect"
            type="radio"
            name="translationOption"
            checked={!isTranslationOptionEnglish}
            value="auto"
            onChange={handleTranslationOptionChange}
            disabled={isLanguageDetecting}
          />
        </label>

        <label htmlFor="english">
          English
          <input
            id="english"
            type="radio"
            name="translationOption"
            checked={isTranslationOptionEnglish}
            value="english"
            onChange={handleTranslationOptionChange}
            disabled={isLanguageDetecting}
          />
        </label>
      </div>

      {translateMultipleWordsCheckbox}

      <div
        style={{ marginBottom: translateTextError ? '0.75rem' : '2rem' }}
        className="translate-text-input-container"
      >
        <input
          className="translate-text-input"
          type="text"
          placeholder={inputPlaceholder}
          value={translateText}
          onChange={handleTranslateTextChange}
          disabled={isLanguageDetecting}
        />
        {microphoneButtonIcon}
        {dotsLoader}
        {detectedLanguage && (
          <span className="detected-language">{detectedLanguage}</span>
        )}
      </div>
      {translateTextError && (
        <p className="error-text translate-text-error">{translateTextError}</p>
      )}
      <ToastContainer />
    </>
  );
};

export default TranslateTextInput;
