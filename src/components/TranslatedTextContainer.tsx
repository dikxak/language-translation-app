import { useState } from 'react';

import { TranslatedContainerStyles } from '@/types';

import { DEFAULT_TRANSLATED_TEXT_CONTAINER_STYLES } from '@/constants';

const TranslatedTextContainer = (): React.JSX.Element => {
  const [containerStyles, setContainerStyles] =
    useState<TranslatedContainerStyles>(
      DEFAULT_TRANSLATED_TEXT_CONTAINER_STYLES,
    );

  const { fontSize, color, backgroundColor } = containerStyles;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const inputValue = name === 'fontSize' ? +value : value;

    setContainerStyles({ ...containerStyles, [name]: inputValue });
  };

  return (
    <>
      <h2 className="secondary-heading">Output</h2>
      <div className="translated-text-container">
        <div className="customization-container">
          <label htmlFor="fontSize">
            Update font size ({`${fontSize}px`})
            <div>
              <input
                id="fontSize"
                name="fontSize"
                type="range"
                min="16"
                max="64"
                step="4"
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
        <div style={containerStyles} className="translated-text">
          Hola!
        </div>
      </div>
    </>
  );
};

export default TranslatedTextContainer;
