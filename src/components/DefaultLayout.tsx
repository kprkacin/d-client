import { Container, createStyles } from '@mantine/core';
import Head from 'next/head';
import { ReactNode } from 'react';
import LayoutHeader from './LayoutHeader';

type DefaultLayoutProps = { children: ReactNode; InnerHeader?: ReactNode };
const useStyles = createStyles((theme) => ({
  body: {
    minHeight: '100vh',
    minWidth: '100vw',
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark?.[0]
        : theme.colors.light?.[0],
  },
}));

export const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  const { classes } = useStyles();

  return (
    <>
      <Head>
        <title>Pinnacl</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={classes.body}>
        <LayoutHeader />
        <Container fluid px={0}>
          {children}
        </Container>
      </main>
    </>
  );
};
