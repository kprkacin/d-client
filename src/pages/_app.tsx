import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "@/utils/api";
import "@/styles/globals.css";
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";
import { DefaultLayout } from "@/components/DefaultLayout";
import { MantineProvider } from "@mantine/core";

export type NextPageWithLayout<
  TProps = Record<string, unknown>,
  TInitialProps = TProps
> = NextPage<TProps, TInitialProps> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

const MyApp: AppType<{
  session: Session | null;
}> = ({ Component, pageProps: { session, ...pageProps } }) => {
  const getLayout =
    (Component as NextPageWithLayout).getLayout ??
    ((page) => <DefaultLayout>{page}</DefaultLayout>);

  return (
    <SessionProvider session={session}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colors: {
            light: [
              "#f2f3f4",
              "#dadbdc",
              "#c2c2c3",
              "#a9aaab",
              "#f2f3f4",
              "#dadbdc",
              "#c2c2c3",
              "#dadbdc",
              "#c2c2c3",
            ],
            gray: [
              "#8c8c8c",
              "#7e7e7e",
              "#707070",
              "#626262",
              "#8c8c8c",
              "#7e7e7e",
              "#707070",
              "#626262",
              "#626262",
            ],
            blue: [
              "#83a4b8",
              "#7694a6",
              "#698393",
              "#5c7381",
              "#4f626e",
              "#42525c",
              "#34424a",
              "#42525c",
              "#34424a",
            ],
            slate: [
              "#7c8c9d",
              "#707e8d",
              "#63707e",
              "#57626e",
              "#4a545e",
              "#707e8d",
              "#63707e",
              "#57626e",
              "#4a545e",
            ],
            dark: [
              "#303b51",
              "#2b3549",
              "#262f41",
              "#222939",
              "#303b51",
              "#2b3549",
              "#262f41",
              "#222939",
              "#4a545e",
              "#707e8d",
            ],
          },
          colorScheme: "light",
          primaryColor: "blue",
          primaryShade: 0,
          defaultRadius: "lg",
        }}
      >
        {getLayout(<Component {...pageProps} />)}
      </MantineProvider>{" "}
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
