import { Container, createStyles } from "@mantine/core";
import Head from "next/head";
import { ReactNode } from "react";
import LayoutHeader from "./LayoutHeader";

type DefaultLayoutProps = { children: ReactNode; InnerHeader?: ReactNode };

export const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <>
      <Head>
        <title>Pinnacl</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <LayoutHeader />
        <Container fluid px={0}>
          {children}
        </Container>
      </main>
    </>
  );
};
