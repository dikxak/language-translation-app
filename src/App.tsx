import Container from '@/components/Container';
import TranslateTextInput from '@/components/TranslateTextInput';
import LanguageContainer from '@/components/language/LanguageContainer';

const App = () => (
  <Container>
    <h1 className="primary-heading">Translation App</h1>
    <TranslateTextInput />
    <LanguageContainer />
  </Container>
);

export default App;
