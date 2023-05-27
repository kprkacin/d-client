import { Container, createStyles } from '@mantine/core';
import Head from 'next/head';
import { ReactNode } from 'react';
import Header from './Header';

type HeroLayoutProps = { children: ReactNode; InnerHeader?: ReactNode };
const useStyles = createStyles((theme) => ({
  body: {
    minHeight: '100vh',
    minWidth: '100vw',
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.pastelGreen?.[6]
        : theme.colors.pastelGreen?.[3],
  },
}));

export const HeroLayout = ({ children }: HeroLayoutProps) => {
  const { classes } = useStyles();

  return (
    <>
      <Head>
        <title>Pinnacl</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={classes.body}>
        <Header />
        <Container fluid px={0}>
          {children}
        </Container>
      </main>
    </>
  );
};
