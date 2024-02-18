import React, { useContext } from 'react';

import LanguageButton from '@/components/language/LanguageButton';

import TranslationApi from '@/api/Translate';

import type { TranslationLanguage } from '@/types';

import { TRANSLATION_LANGUAGES } from '@/constants';

import TranslateLanguageContext from '@/context/LanguageContext';

import showToast from '@/utils/showToast';

interface LanguageContainerProps {
  onTextTranslate: (value: string) => void;
  onTextTranslating: (value: boolean) => void;
}

const LanguageContainer = ({
  onTextTranslate,
  onTextTranslating,
}: LanguageContainerProps): React.JSX.Element => {
  const { languageCode, translateText } = useContext(TranslateLanguageContext);

  const handleTranslation = async (translatedLangCode: string) => {
    if (!languageCode || !translateText) {
      showToast('error', 'Please provide text to translate!');

      return;
    }

    try {
      onTextTranslating(true);

      const res = await TranslationApi.translate({
        codeFrom: languageCode,
        codeTo: translatedLangCode,
        translateText,
      });

      const { trans } = await res.json();

      onTextTranslate(trans);
    } catch (error) {
      let errorMessage = '';

      if (error instanceof Error) errorMessage = error.message;
      else if (typeof error === 'string') errorMessage = error;

      showToast('error', errorMessage);
    } finally {
      onTextTranslating(false);
    }
  };

  return (
    <>
      <h2 className="secondary-heading">Select Language</h2>
      <div className="select-language-container">
        {TRANSLATION_LANGUAGES.map(
          ({ id, language, code }: TranslationLanguage) => (
            <LanguageButton onClick={() => handleTranslation(code)} key={id}>
              {language}
            </LanguageButton>
          ),
        )}
      </div>
    </>
  );
};

export default LanguageContainer;
