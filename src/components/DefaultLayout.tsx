import { Container } from "@mantine/core";
import Head from "next/head";
import { type ReactNode } from "react";
import LayoutHeader from "./LayoutHeader";
import React from "react";
import { AppShell } from "@mantine/core";
import { motion, AnimatePresence } from "framer-motion";

type DefaultLayoutProps = { children: ReactNode; InnerHeader?: ReactNode };

const pageTransition = {
  type: "spring",
  ease: "linear",
  duration: 0.5,
};

export const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <>
      <Head>
        <title>Pinnacl</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <AppShell
          padding="md"
          aside={<LayoutHeader />}
          styles={(theme) => ({
            main: {
              overflow: "hidden",
            },
          })}
        >
          <motion.div
            transition={pageTransition}
            initial={{ x: "-500%" }}
            animate={{ x: "0%" }}
          >
            <Container fluid px={0}>
              {children}
            </Container>
          </motion.div>
        </AppShell>
      </main>
    </>
  );
};
