const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_HOST = import.meta.env.VITE_API_HOST;

const DETECT_URL = `${BASE_URL}api/v1/translator/detect-language`;
const TRANSLATE_URL = `${BASE_URL}api/v1/translator/text`;
const CONTENT_TYPE = 'application/x-www-form-urlencoded';

interface TranslateParams {
  codeFrom: string;
  codeTo: string;
  translateText: string;
}

class TranslationApi {
  static detect(body: URLSearchParams) {
    const options = {
      method: 'POST',
      headers: {
        'content-type': CONTENT_TYPE,
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': API_HOST,
      },
      body,
    };

    return fetch(DETECT_URL, options);
  }

  static translate({ codeFrom, codeTo, translateText }: TranslateParams) {
    const encodedParams = new URLSearchParams();

    encodedParams.set('from', codeFrom);
    encodedParams.set('to', codeTo);
    encodedParams.set('text', translateText);

    const options = {
      method: 'POST',
      headers: {
        'content-type': CONTENT_TYPE,
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': API_HOST,
      },
      body: encodedParams,
    };

    return fetch(TRANSLATE_URL, options);
  }
}

export default TranslationApi;
