import { useMemo, useState } from 'react';

import Container from '@/components/Container';
import TranslateTextInput from '@/components/TranslateTextInput';
import LanguageContainer from '@/components/language/LanguageContainer';
import TranslatedTextContainer from '@/components/TranslatedTextContainer';

import TranslateLanguageContext from '@/context/LanguageContext';

import { DEFAULT_TRANSLATION_CONFIG } from '@/constants';

import { type TranslationConfig } from '@/types';

const App = () => {
  const [translationConfig, setTranslationConfig] = useState<TranslationConfig>(
    DEFAULT_TRANSLATION_CONFIG,
  );
  const [translatedText, setTranslatedText] = useState<string>('');
  const [isTextTranslating, setIsTextTranslating] = useState<boolean>(false);

  const { translateText, translateLanguageCode } = translationConfig;

  const handleTextTranslate = (translatedTextValue: string) => {
    setTranslatedText(translatedTextValue);
  };

  const translateLanguageContextValue = useMemo(
    () => ({
      translateText,
      languageCode: translateLanguageCode,
    }),
    [translateText, translateLanguageCode],
  );

  return (
    <TranslateLanguageContext.Provider value={translateLanguageContextValue}>
      <Container>
        <h1 className="primary-heading">Translation App</h1>
        <TranslateTextInput
          translationConfig={translationConfig}
          setTranslationConfig={setTranslationConfig}
        />
        <LanguageContainer
          onTextTranslate={handleTextTranslate}
          onTextTranslating={setIsTextTranslating}
        />
        <TranslatedTextContainer
          translatedText={translatedText}
          translating={isTextTranslating}
        />
      </Container>
    </TranslateLanguageContext.Provider>
  );
};

export default App;
