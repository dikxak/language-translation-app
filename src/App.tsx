import Container from '@/components/Container';
import TranslateTextInput from '@/components/TranslateTextInput';
import LanguageContainer from '@/components/language/LanguageContainer';
import TranslatedTextContainer from '@/components/TranslatedTextContainer';

const App = () => (
  <Container>
    <h1 className="primary-heading">Translation App</h1>
    <TranslateTextInput />
    <LanguageContainer />
    <TranslatedTextContainer />
  </Container>
);

export default App;
