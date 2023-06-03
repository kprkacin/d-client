import { Container } from "@mantine/core";
import Head from "next/head";
import { type ReactNode } from "react";
import LayoutHeader from "./LayoutHeader";
import React from "react";
import { AppShell } from "@mantine/core";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

type DefaultLayoutProps = { children: ReactNode; InnerHeader?: ReactNode };

const pageTransition = {
  type: "spring",
  ease: "linear",
  duration: 0.5,
};

export const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  const session = useSession();
  const router = useRouter();
  console.log(session);
  const authed = session.status && session.status !== "unauthenticated";
  if (!authed) void router.push("/api/auth/signin");
  return (
    <>
      <Head>
        <title>Pinnacl</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {authed && session.data?.user.email && (
          <AppShell
            padding="md"
            aside={<LayoutHeader />}
            styles={() => ({
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
        )}
      </main>
    </>
  );
};
