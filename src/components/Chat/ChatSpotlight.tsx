import { api } from "@/utils/api";
import { Group, Kbd, Text, TextInput, useMantineTheme } from "@mantine/core";
import { SpotlightProvider, spotlight } from "@mantine/spotlight";
import { IconSearch } from "@tabler/icons-react";
import { useRouter } from "next/router";

function SpotlightControl() {
  const theme = useMantineTheme();
  return (
    <Group position="center">
      <TextInput
        onClick={() => spotlight.open()}
        placeholder="Search"
        w="100%"
        readOnly
        icon={<IconSearch size="1rem" color={theme.fn.primaryColor()} />}
        rightSection={
          <Kbd>
            <Text color={theme.fn.primaryColor()}>/</Text>
          </Kbd>
        }
      />
    </Group>
  );
}

const ChatSpotlight = () => {
  const { data = [] } = api.chat.allChats.useQuery();
  const router = useRouter();
  const theme = useMantineTheme();

  return (
    <SpotlightProvider
      actions={data.map((item) => ({
        title: item.name,
        description: "",
        onTrigger: () => router.push(`/chat/${item.id}`),
      }))}
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

export default ChatSpotlight;
