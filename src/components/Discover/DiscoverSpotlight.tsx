/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { api } from "@/utils/api";
import { posterSizes } from "@/utils/consts";
import {
  Badge,
  Center,
  Group,
  TextInput,
  UnstyledButton,
  createStyles,
  Image,
  rem,
  Text,
  useMantineTheme,
  Kbd,
} from "@mantine/core";
import {
  type SpotlightAction,
  SpotlightProvider,
  spotlight,
  type SpotlightActionProps,
} from "@mantine/spotlight";
import { IconSearch } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useDebouncedValue } from "@mantine/hooks";

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
const useStyles = createStyles((theme) => ({
  action: {
    position: "relative",
    display: "block",
    width: "100%",
    padding: `${rem(10)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[1],
    }),

    "&[data-hovered]": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[1],
    },
  },
}));

function CustomAction({
  action,
  hovered,
  onTrigger,
  ...others
}: SpotlightActionProps) {
  const { classes } = useStyles();

  return (
    <UnstyledButton
      className={classes.action}
      data-hovered={hovered || undefined}
      tabIndex={-1}
      onMouseDown={(event) => event.preventDefault()}
      onClick={onTrigger}
      {...others}
    >
      <Group noWrap>
        {action.image && (
          <Center>
            <Image
              src={action.image}
              alt={action.title}
              width={85}
              radius="md"
              height={85}
            />
          </Center>
        )}

        <div style={{ flex: 1 }}>
          <Text>{action.title}</Text>

          {action.description && (
            <Text color="dimmed" size="xs">
              {action.description}
            </Text>
          )}
        </div>

        {action.new && <Badge>new</Badge>}
      </Group>
    </UnstyledButton>
  );
}

const DiscoverSpotlight = () => {
  const [query, setQuery] = useState("");
  const [debounced] = useDebouncedValue(query, 200);
  const [actions, setActions] = useState<SpotlightAction[]>([]);

  const trending = api.discover.trendingAll.useQuery();
  const router = useRouter();
  const theme = useMantineTheme();

  const onTrigger = useCallback(
    (action: SpotlightAction) => {
      void router.push(`/discover/${action?.mediaType}/${action?.id}`);
    },
    [router]
  );
  const { mutate: discoverNewMedia } = api.discover.discover.useMutation({
    onError: () => {
      console.error("Error deleting comment");
    },
    onSuccess: (res) => {
      const actions: SpotlightAction[] = (res?.results || []).map(
        (item: {
          id: any;
          media_type: any;
          profile_path: any;
          title: any;
          name: any;
          overview: any;
          poster_path: any;
        }) => ({
          title: item?.title || item?.name || "",
          description: item?.overview || "",
          onTrigger: onTrigger,
          image: `https://image.tmdb.org/t/p/${posterSizes.w500}/${
            item?.poster_path || item?.profile_path
          }`,
          id: item.id,
          mediaType: item.media_type,
        })
      );
      setActions(actions);
    },
    onSettled: () => {
      // upToDateCommentsQuery.refetch();
    },
  });

  useEffect(() => {
    if (debounced) {
      discoverNewMedia({ query: debounced, page: 1 });
    }
  }, [debounced, discoverNewMedia]);

  useEffect(() => {
    const actions: SpotlightAction[] = (trending?.data || []).map((item) => ({
      title: item?.title,
      description: item?.overview || "",
      onTrigger: onTrigger,
      image: `https://image.tmdb.org/t/p/${posterSizes.w500}/${item.image}`,
      id: item.id.toString(),
      mediaType: item.media_type,
    }));

    setActions(actions);
  }, [onTrigger, trending?.data]);

  return (
    <SpotlightProvider
      actions={actions}
      searchIcon={<IconSearch size="1.2rem" color={theme.fn.primaryColor()} />}
      actionComponent={CustomAction}
      searchPlaceholder="Search..."
      highlightQuery
      query={query}
      onQueryChange={setQuery}
      shortcut="/"
      limit={7}
      nothingFoundMessage="Nothing found..."
      transitionProps={{ duration: 300, transition: "slide-down" }}
    >
      <SpotlightControl />
    </SpotlightProvider>
  );
};

export default DiscoverSpotlight;
