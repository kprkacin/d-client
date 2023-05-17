import type { NextPage } from 'next';
import type { AppType, AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import type { ReactElement, ReactNode } from 'react';
import { DefaultLayout } from '~/components/DefaultLayout';
import { trpc } from '~/utils/trpc';
import { MantineProvider } from '@mantine/core';

export type NextPageWithLayout<
  TProps = Record<string, unknown>,
  TInitialProps = TProps,
> = NextPage<TProps, TInitialProps> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp = (({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout =
    Component.getLayout ?? ((page) => <DefaultLayout>{page}</DefaultLayout>);

  return (
    <SessionProvider session={pageProps.session}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: 'light',
        }}
      >
        {getLayout(<Component {...pageProps} />)}
      </MantineProvider>{' '}
    </SessionProvider>
  );
}) as AppType;

export default trpc.withTRPC(MyApp);
