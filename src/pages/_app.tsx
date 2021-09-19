import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';

import '@styles/tailwind.css';
import '@styles/main.css';

const Noop: React.FC = ({ children }) => <>{children}</>;

function MyApp({ Component, pageProps }: AppProps) {
  const Layout = (Component as any).Layout || Noop;

  return (
    <SessionProvider session={pageProps.session} refetchInterval={10}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}

export default MyApp;
