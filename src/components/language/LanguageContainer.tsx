import React from 'react';

import LanguageButton from '@/components/language/LanguageButton';

import type { TranslationLanguage } from '@/types';

import { TRANSLATION_LANGUAGES } from '@/constants';

const LanguageContainer = (): React.JSX.Element => (
  <>
    <h2 className="secondary-heading">Select Language</h2>
    <div className="select-language-container">
      {TRANSLATION_LANGUAGES.map(({ id, language }: TranslationLanguage) => (
        <LanguageButton key={id}>{language}</LanguageButton>
      ))}
    </div>
  </>
);

export default LanguageContainer;
