import React, { useState } from 'react';

import MicrophoneIcon from '@/components/icons/Microphone';

import type { TranslationConfig } from '@/types';

import { DEFAULT_TRANSLATION_CONFIG } from '@/constants';

const getPlaceholderText = (
  isTranslationOptionEnglish: boolean,
  isMultipleWordsTranslated: boolean,
): string => {
  if (isTranslationOptionEnglish && isMultipleWordsTranslated)
    return 'Enter comma separated multiple words. Example: hello, world, how, are, you';

  if (isTranslationOptionEnglish && !isMultipleWordsTranslated)
    return 'Enter english text to translate';

  return 'Enter text to translate';
};

const TranslateTextInput = (): React.JSX.Element => {
  const [translationConfig, setTranslationConfig] = useState<TranslationConfig>(
    DEFAULT_TRANSLATION_CONFIG,
  );

  const { translationOption, isMultipleWordsTranslated } = translationConfig;
  const isTranslationOptionEnglish = translationOption === 'english';
  const inputPlaceholder = getPlaceholderText(
    isTranslationOptionEnglish,
    isMultipleWordsTranslated,
  );

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
    });
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
          />
        </label>
      </div>

      {translateMultipleWordsCheckbox}

      <div className="translate-text-input-container">
        <input
          className="translate-text-input"
          type="text"
          placeholder={inputPlaceholder}
        />
        {microphoneButtonIcon}
      </div>
    </>
  );
};

export default TranslateTextInput;
