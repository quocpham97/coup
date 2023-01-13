import '../styles/globals.css';
import type { AppProps } from 'next/app';
import ConfigureAbly from 'components/ConfigureAbly';

function App({ Component, pageProps }: AppProps) {
  return (
    <ConfigureAbly>
      <Component {...pageProps} />
    </ConfigureAbly>
  );
}

export default App;
