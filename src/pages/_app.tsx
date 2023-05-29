import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "@/utils/api";
import "@/styles/globals.css";
import { NextPage } from "next";
import { ReactElement, ReactNode, useState } from "react";
import { DefaultLayout } from "@/components/DefaultLayout";
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import Settings from "@/components/Settings/Settings";

export type NextPageWithLayout<
  TProps = Record<string, unknown>,
  TInitialProps = TProps
> = NextPage<TProps, TInitialProps> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

const MyApp: AppType<{
  session: Session | null;
}> = ({ Component, pageProps: { session, ...pageProps } }) => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("light");

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  const getLayout =
    (Component as NextPageWithLayout).getLayout ??
    ((page) => <DefaultLayout>{page}</DefaultLayout>);

  return (
    <SessionProvider session={session}>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            colorScheme,
            primaryColor: "cyan",
            primaryShade: { dark: 7, light: 5 },
            defaultRadius: "lg",
          }}
        >
          {getLayout(<Component {...pageProps} />)}
          <Settings />
        </MantineProvider>{" "}
      </ColorSchemeProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
