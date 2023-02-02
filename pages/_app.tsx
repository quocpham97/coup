import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';
import ConfigureAbly from 'components/ConfigureAbly';

function App({ Component, pageProps: { session, ...pageProps } }: AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={session}>
      <ConfigureAbly>
        <Component {...pageProps} />
      </ConfigureAbly>
    </SessionProvider>
  );
}

export default App;
