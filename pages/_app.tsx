import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';
import { Provider } from 'mobx-react';
import ConfigureAbly from 'components/ConfigureAbly';
import { stores } from '../src/stores';

function App({ Component, pageProps: { session, ...pageProps } }: AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={session}>
      <Provider {...stores}>
        <ConfigureAbly>
          <Component {...pageProps} />
        </ConfigureAbly>
      </Provider>
    </SessionProvider>
  );
}

export default App;
