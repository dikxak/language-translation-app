import { createContext } from 'react';

interface TranslateLanguageContextType {
  translateText: string;
  languageCode: string;
}

const TranslateLanguageContext = createContext<TranslateLanguageContextType>({
  translateText: '',
  languageCode: '',
});

export default TranslateLanguageContext;
