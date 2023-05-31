import { AppShell, Container, createStyles } from "@mantine/core";
import Head from "next/head";
import { type ReactNode } from "react";
import Header from "./Header";
import { motion } from "framer-motion";
import Footer from "./Footer";

type HeroLayoutProps = { children: ReactNode; InnerHeader?: ReactNode };

const pageTransition = {
  type: "spring",
  ease: "linear",
  duration: 0.5,
};

export const HeroLayout = ({ children }: HeroLayoutProps) => {
  return (
    <>
      <Head>
        <title>Pinnacl</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <AppShell padding="md" header={<Header />} footer={<Footer />}>
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
