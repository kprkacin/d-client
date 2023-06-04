import {
  createStyles,
  Header as Mheader,
  Group,
  Button,
  Box,
  rem,
} from "@mantine/core";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { UserButton } from "../User/UserButton";

const useStyles = createStyles((theme) => ({
  header: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark?.[8]
        : theme.colors.gray?.[0],
  },
  link: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: "none",
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,

    [theme.fn.smallerThan("sm")]: {
      height: rem(42),
      display: "flex",
      alignItems: "center",
      width: "100%",
    },
    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[4],
    },
  },

  subLink: {
    width: "100%",
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    borderRadius: theme.radius.md,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[4],
    },

    "&:active": theme.activeStyles,
  },

  dropdownFooter: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.colors.gray[0],
    margin: `calc(${theme.spacing.md} * -1)`,
    marginTop: theme.spacing.sm,
    padding: `${theme.spacing.md} calc(${theme.spacing.md} * 2)`,
    paddingBottom: theme.spacing.xl,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1]
    }`,
  },

  hiddenMobile: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },
}));

const Header = () => {
  const { classes } = useStyles();
  const { data: session, status } = useSession();

  return (
    <Box pb={120}>
      <Mheader height={80} px="md" className={classes.header}>
        <Group position="apart" sx={{ height: "100%" }}>
          <Box maw={"50%"}>{session && <UserButton />}</Box>
          {!session ? (
            <Button
              disabled={status === "loading"}
              onClick={() => void signIn(undefined, { callbackUrl: "/chat" })}
            >
              Log in
            </Button>
          ) : (
            <Group>
              <Link href="/chat">
                <Button>Go To Chat</Button>
              </Link>
              <Button>Log out</Button>
            </Group>
          )}
        </Group>
      </Mheader>
    </Box>
  );
};

export default Header;
