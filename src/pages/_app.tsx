import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "@/utils/api";
import "@/styles/globals.css";
import { type NextPage } from "next";
import { type ReactElement, type ReactNode, useState } from "react";
import { DefaultLayout } from "@/components/DefaultLayout";
import {
  type ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import Settings from "@/components/Settings/Settings";
import { Notifications } from "@mantine/notifications";
import { WishlistProvider } from "@/hooks/useWishlist";
import { RouterTransition } from "@/components/RouterTransition";
import { SettingsProvider } from "@/hooks/useSettings";
import { WatchedProvider } from "@/hooks/useWatched";

export type NextPageWithLayout<
  TProps = Record<string, unknown>,
  TInitialProps = TProps
> = NextPage<TProps, TInitialProps> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

const MyApp: AppType<{
  session: Session | null;
}> = ({ Component, pageProps: { session, ...pageProps } }) => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("dark");

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
            primaryColor: colorScheme === "dark" ? "yellow" : "cyan",
            primaryShade: { dark: 4, light: 5 },

            defaultRadius: "sm",
            loader: "bars",
            components: {
              ["Carousel"]: {
                styles: {
                  control: {
                    backgroundColor:
                      colorScheme === "dark" ? "#FFD43B" : "#22B8CF",
                    borderColor: colorScheme === "dark" ? "#FFD43B" : "#22B8CF",
                    color: colorScheme === "dark" ? "black" : "white",
                  },
                },
              },
              ["Button"]: {
                styles: {
                  root: {
                    color: colorScheme === "dark" ? "black" : "white",
                  },
                },
                defaultProps: {
                  // compact: true,
                },
              },
            },
          }}
        >
          <Notifications />
          <RouterTransition />
          <SettingsProvider>
            <WatchedProvider>
              <WishlistProvider>
                {getLayout(<Component {...pageProps} />)}
              </WishlistProvider>{" "}
            </WatchedProvider>
            <Settings />
          </SettingsProvider>
        </MantineProvider>{" "}
      </ColorSchemeProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
