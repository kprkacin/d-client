import { api } from "@/utils/api";
import {
  Code,
  Text,
  TextInput,
  createStyles,
  rem,
  useMantineTheme,
} from "@mantine/core";
import { SpotlightProvider } from "@mantine/spotlight";
import { IconSearch } from "@tabler/icons-react";
import { type NextRouter, useRouter } from "next/router";

const defaultActions = (router: NextRouter) => [
  {
    title: "Chat",
    description: "Interact with our chatbox",
    onTrigger: () => router.push("/chat"),
  },
  {
    title: "Discover",
    description: "Discover new movies and shows",
    onTrigger: () => router.push("/discover"),
  },
  {
    title: "Watchlist",
    description: "Manage your watchlists and interact with public ones",
    onTrigger: () => router.push("/watchlist"),
  },
  {
    title: "Profile",
    description: "Manage your profile",
    onTrigger: () => router.push("/profile"),
  },
];

const useStyles = createStyles((theme) => ({
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
}));

function SpotlightControl() {
  const { classes, theme } = useStyles();
  return (
    <TextInput
      placeholder="Search"
      size="xs"
      icon={
        <IconSearch
          size="0.8rem"
          stroke={1.5}
          color={theme.fn.primaryColor()}
        />
      }
      rightSectionWidth={70}
      rightSection={
        <Code className={classes.searchCode}>
          <Text color={theme.fn.primaryColor()}>CTRL + /</Text>
        </Code>
      }
      styles={{ rightSection: { pointerEvents: "none" } }}
      mb="sm"
    />
  );
}

const SidebarSpotlight = () => {
  const { data = [] } = api.chat.allChats.useQuery();
  const router = useRouter();
  const theme = useMantineTheme();

  return (
    <SpotlightProvider
      actions={[
        ...defaultActions(router),
        ...data.map((item) => ({
          title: item.name,
          description: "",
          onTrigger: () => router.push(`/chat/${item.id}`),
        })),
      ]}
      searchIcon={<IconSearch size="1.2rem" color={theme.fn.primaryColor()} />}
      searchPlaceholder="Search..."
      highlightQuery
      shortcut="ctrl+/"
      limit={7}
      nothingFoundMessage="Nothing found..."
      transitionProps={{ duration: 300, transition: "slide-down" }}
    >
      <SpotlightControl />
    </SpotlightProvider>
  );
};

export default SidebarSpotlight;
