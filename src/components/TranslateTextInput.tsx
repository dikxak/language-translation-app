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

const TranslateTextInput = (): React.JSX.Element => {
  const [translationConfig, setTranslationConfig] = useState<TranslationConfig>(
    DEFAULT_TRANSLATION_CONFIG,
  );
  const [isLanguageDetecting, setIsLanguageDetecting] =
    useState<boolean>(false);
  const [detectedLanguage, setDetectedLanguage] = useState<string>('');

  const { translationOption, isMultipleWordsTranslated, translateText } =
    translationConfig;

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
    setDetectedLanguage('');
    setTranslationConfig({
      ...translationConfig,
      translateText: e.target.value,
    });
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
      } catch (error) {
        showToast('error', "Couldn't detect language at the moment!");
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

      <div className="translate-text-input-container">
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
      <ToastContainer />
    </>
  );
};

export default TranslateTextInput;
