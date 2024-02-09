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

export default getPlaceholderText;
