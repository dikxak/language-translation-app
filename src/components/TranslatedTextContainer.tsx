import { useState } from 'react';

import { TranslatedContainerStyles } from '@/types';

import {
  DEFAULT_TRANSLATED_TEXT_CONTAINER_STYLES,
  FONT_SIZE_CONFIGURATION,
} from '@/constants';

interface TranslatedTextContainerProps {
  translatedText: string;
  translating: boolean;
}

const TranslatedTextContainer = ({
  translatedText,
  translating,
}: TranslatedTextContainerProps): React.JSX.Element => {
  const [containerStyles, setContainerStyles] =
    useState<TranslatedContainerStyles>(
      DEFAULT_TRANSLATED_TEXT_CONTAINER_STYLES,
    );

  const { max, min, step } = FONT_SIZE_CONFIGURATION;
  const { fontSize, color, backgroundColor } = containerStyles;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const inputValue = name === 'fontSize' ? +value : value;

    setContainerStyles({ ...containerStyles, [name]: inputValue });
  };

  const isStartTranslationMsgVisible = !translating && !translatedText;
  const isTranslated = translatedText && !translating;

  return (
    <>
      <h2 className="secondary-heading">Output</h2>
      <div className="translated-text-container">
        {isTranslated && (
          <div className="customization-container">
            <label htmlFor="fontSize">
              Update font size ({`${fontSize}px`})
              <div>
                <input
                  id="fontSize"
                  name="fontSize"
                  type="range"
                  min={min}
                  max={max}
                  step={step}
                  value={fontSize}
                  onChange={handleInputChange}
                />
              </div>
            </label>

            <label htmlFor="textColor">
              Update text color
              <input
                id="textColor"
                name="color"
                type="color"
                value={color}
                onChange={handleInputChange}
              />
            </label>

            <label htmlFor="backgroundColor">
              Update background
              <input
                id="backgroundColor"
                name="backgroundColor"
                type="color"
                value={backgroundColor}
                onChange={handleInputChange}
              />
            </label>
          </div>
        )}

        <div
          style={containerStyles}
          className={`translated-text ${isTranslated ? 'ellipse-open-animation' : ''}`}
        >
          {isTranslated ? translatedText : ''}
        </div>

        {isStartTranslationMsgVisible && (
          <p className="start-translation-msg">Start translating words!</p>
        )}

        {translating && (
          <div className="loader-container">
            <div className="loader" />
            <span>Translating</span>
          </div>
        )}
      </div>
    </>
  );
};

export default TranslatedTextContainer;
