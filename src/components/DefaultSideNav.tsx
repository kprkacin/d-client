import {
  createStyles,
  Navbar,
  UnstyledButton,
  Text,
  Group,
  ActionIcon,
  Tooltip,
  rem,
  Stack,
  ScrollArea,
} from "@mantine/core";
import {
  IconPlus,
  IconMessageDots,
  IconRocket,
  IconPlaylistAdd,
} from "@tabler/icons-react";
import { UserButton } from "./User/UserButton";
import { api } from "@/utils/api";
import Link from "next/link";
import { useRouter } from "next/router";
import SidebarSpotlight from "./SidebarSpotlight";

const useStyles = createStyles((theme) => ({
  navbar: {
    paddingTop: 0,
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[9]
        : theme.colors.gray[0],
  },

  section: {
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
    marginBottom: theme.spacing.md,

    "&:not(:last-of-type)": {
      borderBottom: `${rem(1)} solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[3]
      }`,
    },
  },

  searchCode: {
    fontWeight: 700,
    fontSize: rem(10),
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[5]
        : theme.colors.gray[0],
    border: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  mainLinks: {
    paddingLeft: `calc(${theme.spacing.md} - ${theme.spacing.xs})`,
    paddingRight: `calc(${theme.spacing.md} - ${theme.spacing.xs})`,
    paddingBottom: theme.spacing.md,
  },

  mainLink: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    fontSize: theme.fontSizes.xs,
    padding: `${rem(8)} ${theme.spacing.xs}`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
  },

  mainLinkInner: {
    display: "flex",
    alignItems: "center",
    flex: 1,
  },

  mainLinkIcon: {
    marginRight: theme.spacing.sm,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[2]
        : theme.colors.gray[6],
  },

  mainLinkBadge: {
    padding: 0,
    width: rem(20),
    height: rem(20),
    pointerEvents: "none",
  },

  collections: {
    paddingLeft: `calc(${theme.spacing.md} - ${rem(6)})`,
    paddingRight: `calc(${theme.spacing.md} - ${rem(6)})`,
    paddingBottom: theme.spacing.md,
  },

  collectionsHeader: {
    paddingLeft: `calc(${theme.spacing.md} + ${rem(2)})`,
    paddingRight: theme.spacing.md,
    marginBottom: rem(5),
  },

  collectionLink: {
    display: "block",
    padding: `${rem(8)} ${theme.spacing.xs}`,
    textDecoration: "none",
    // borderRadius: theme.radius.sm,
    fontSize: theme.fontSizes.xs,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    lineHeight: 1,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
  },

  hiddenMobile: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  expandButton: {
    position: "fixed",
    bottom: theme.spacing.xl,
  },
}));

const links = [
  { icon: IconMessageDots, label: "Chats", href: "/chat" },
  { icon: IconRocket, label: "Discover", href: "/discover" },
  { icon: IconPlaylistAdd, label: "Watchlists", href: "/watchlist" },
];

const DefaultSideNav = () => {
  const { classes, cx, theme } = useStyles();
  const router = useRouter();
  const { data = [] } = api.chat.allChats.useQuery();
  const { mutate: createNewChat } = api.chat.newSession.useMutation({
    onError: () => {
      console.error("Error deleting comment");
    },
    onSuccess: (res) => {
      void router.push(`/chat/${res.id}`);
    },
    onSettled: () => {
      // upToDateCommentsQuery.refetch();
    },
  });

  const mainLinks = links.map((link) => (
    <UnstyledButton key={link.label} className={classes.mainLink}>
      <Link href={link.href} className={classes.mainLinkInner}>
        <link.icon
          size={20}
          className={classes.mainLinkIcon}
          stroke={1.5}
          color={theme.fn.primaryColor()}
        />
        <span>{link.label}</span>
      </Link>
    </UnstyledButton>
  ));

  const collectionLinks = data.map((chat) => (
    <Link
      href={`/chat/${chat.id}`}
      key={chat.id}
      className={classes.collectionLink}
    >
      {chat.name}
    </Link>
  ));

  return (
    <Navbar
      height="100vh"
      width={{ sm: 300 }}
      p="md"
      className={cx(classes.navbar, classes.hiddenMobile)}
    >
      <Navbar.Section className={classes.section}>
        <UserButton />
      </Navbar.Section>
      <SidebarSpotlight />

      <Navbar.Section className={classes.section}>
        <div className={classes.mainLinks}>{mainLinks}</div>
      </Navbar.Section>

      <Navbar.Section className={classes.section}>
        <Group className={classes.collectionsHeader} position="apart">
          <Text size="xs" weight={500} color="dimmed">
            Chats
          </Text>
          <Tooltip label="New chat" withArrow position="right">
            <ActionIcon
              variant="default"
              size={20}
              onClick={() => createNewChat()}
            >
              <IconPlus
                size="1rem"
                stroke={1.5}
                color={theme.fn.primaryColor()}
              />
            </ActionIcon>
          </Tooltip>
        </Group>
        <ScrollArea.Autosize>
          <Stack spacing="xs" mah="40vh" className={classes.collections}>
            {collectionLinks}
          </Stack>
        </ScrollArea.Autosize>
      </Navbar.Section>
    </Navbar>
  );
};

export default DefaultSideNav;
