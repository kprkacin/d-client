import {
  createStyles,
  Header as Mheader,
  Group,
  Button,
  UnstyledButton,
  Text,
  ThemeIcon,
  Divider,
  Center,
  Box,
  Burger,
  Drawer,
  Collapse,
  ScrollArea,
  rem,
  Affix,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconNotification,
  IconCode,
  IconBook,
  IconChartPie3,
  IconFingerprint,
  IconCoin,
  IconChevronDown,
} from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

const useStyles = createStyles((theme) => ({
  header: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark?.[6]
        : theme.colors.gray?.[9],
    color: theme.white,
  },
  link: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: "none",
    color: theme.white,
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,

    [theme.fn.smallerThan("sm")]: {
      height: rem(42),
      display: "flex",
      alignItems: "center",
      width: "100%",
    },

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    }),
  },

  subLink: {
    width: "100%",
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    borderRadius: theme.radius.md,

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
    }),

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
    width: "33.3%",
    [`&:nth-child(3)`]: {
      borderRight: "none",
    },
  },
}));

const mockdata = [
  {
    icon: IconCode,
    title: "Open source",
    description: "This Pokémon’s cry is very loud and distracting",
  },
  {
    icon: IconCoin,
    title: "Free for everyone",
    description: "The fluid of Smeargle’s tail secretions changes",
  },
  {
    icon: IconBook,
    title: "Documentation",
    description: "Yanma is capable of seeing 360 degrees without",
  },
  {
    icon: IconFingerprint,
    title: "Security",
    description: "The shell’s rounded shape and the grooves on its.",
  },
  {
    icon: IconChartPie3,
    title: "Analytics",
    description: "This Pokémon uses its flying ability to quickly chase",
  },
  {
    icon: IconNotification,
    title: "Notifications",
    description: "Combusken battles with the intensely hot flames it spews",
  },
];

const LayoutHeader = () => {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const { classes, theme, cx } = useStyles();
  const { data: session, status } = useSession();

  const links = mockdata.map((item) => (
    <UnstyledButton className={classes.subLink} key={item.title}>
      <Group noWrap align="flex-start">
        <ThemeIcon size={34} variant="default" radius="md">
          <item.icon size={rem(22)} color={theme.fn.primaryColor()} />
        </ThemeIcon>
        <div>
          <Text size="sm" fw={500}>
            {item.title}
          </Text>
          <Text size="xs" color="dimmed">
            {item.description}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  ));

  return (
    <Box>
      <Mheader
        height={60}
        px="md"
        className={cx(classes.header, classes.hiddenMobile)}
      >
        <Group position="apart" sx={{ height: "100%" }}>
          {/* <MantineLogo size={30} /> */}

          <Group sx={{ height: "100%" }} spacing={0}>
            <a href="#" className={classes.link}>
              Home
            </a>

            <a href="#" className={classes.link}>
              Learn
            </a>
          </Group>

          <Group className={classes.hiddenMobile}>
            {!session ? (
              <Button onClick={() => {}} disabled={status === "loading"}>
                Log in
              </Button>
            ) : (
              <>
                <Text>
                  {session?.user?.name} ({session?.user?.email})
                </Text>
                <Link href="/chat">
                  <Button>Go To Chat</Button>
                </Link>
                <Button onClick={() => {}}>Log out</Button>
              </>
            )}
          </Group>
        </Group>
      </Mheader>
      <Affix position={{ bottom: 0, right: 0 }} w="100%">
        <Group
          className={cx(classes.header, classes.hiddenDesktop)}
          spacing={0}
        >
          {" "}
          <Button
            onClick={() => {}}
            disabled={status === "loading"}
            className={classes.mobileButton}
          >
            Log in
          </Button>
          <Button
            onClick={() => {}}
            disabled={status === "loading"}
            className={classes.mobileButton}
          >
            Log in
          </Button>
          <Button
            onClick={() => {}}
            disabled={status === "loading"}
            className={classes.mobileButton}
          >
            Log in
          </Button>
        </Group>
      </Affix>
    </Box>
  );
};

export default LayoutHeader;
