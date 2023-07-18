import {
  createStyles,
  Group,
  Button,
  Box,
  rem,
  Affix,
  Stack,
  Text,
  Center,
} from "@mantine/core";
import { useSession } from "next-auth/react";
import DefaultSideNav from "./DefaultSideNav";
import {
  IconMessageDots,
  IconRocket,
  IconPlaylistAdd,
  IconSettings,
} from "@tabler/icons-react";
import { useRouter } from "next/router";
import { useSettings } from "@/hooks/useSettings";

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
  mobileButton: {
    borderRadius: 0,
    borderRight: `1px solid ${theme.colors.gray[1]}`,
    borderTop: `1px solid ${theme.colors.gray[1]}`,
    borderColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[9]
        : theme.colors.gray[1],
    width: "25%",
    height: rem(75),
    [`&:nth-of-type(4)`]: {
      borderRight: "none",
    },
  },
}));

const LayoutHeader = () => {
  const { classes, cx } = useStyles();
  const { status } = useSession();
  const router = useRouter();
  const { toggle } = useSettings();

  const handleRouting = (route: string) => {
    void router.push(route);
  };

  return (
    <Box>
      <DefaultSideNav />
      <Affix position={{ bottom: 0, right: 0 }} w="100%" id="mobile-nav">
        <Group
          className={cx(classes.header, classes.hiddenDesktop)}
          spacing={0}
        >
          <Button
            disabled={status === "loading"}
            className={classes.mobileButton}
            onClick={() => handleRouting("/chat")}
          >
            <Center component={Stack} spacing={1}>
              <IconMessageDots size="1.5rem" />
              <Text>Chat</Text>
            </Center>
          </Button>

          <Button
            disabled={status === "loading"}
            className={classes.mobileButton}
            onClick={() => handleRouting("/discover")}
          >
            <Center component={Stack} spacing={1}>
              <IconRocket size="1.5rem" />
              <Text>Discover</Text>
            </Center>
          </Button>

          <Button
            disabled={status === "loading"}
            className={classes.mobileButton}
            onClick={() => handleRouting("/watchlist")}
          >
            <Center component={Stack} spacing={1}>
              <IconPlaylistAdd size="1.5rem" />
              <Text>Watchlist</Text>
            </Center>
          </Button>
          <Button
            disabled={status === "loading"}
            className={classes.mobileButton}
            onClick={toggle}
          >
            <Center component={Stack} spacing={1}>
              <IconSettings size="1.5rem" />
              <Text>Settings</Text>
            </Center>
          </Button>
        </Group>
      </Affix>
    </Box>
  );
};

export default LayoutHeader;
