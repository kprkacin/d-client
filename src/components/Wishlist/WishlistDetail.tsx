/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useEffect } from "react";
import {
  Center,
  Flex,
  Text,
  Group,
  Image,
  Stack,
  Button,
  createStyles,
  Paper,
  Anchor,
  TextInput,
  MultiSelect,
  Textarea,
  ScrollArea,
  Spoiler,
  ActionIcon,
  Tooltip,
  Switch,
  LoadingOverlay,
} from "@mantine/core";
import { posterSizes } from "@/utils/consts";
import { IconX } from "@tabler/icons-react";

import SkeletonPage from "../Discover/DetailsPages/SkeletonPage";
import {
  type WishlistDetails,
  type WishlistRecordWithMedia,
} from "@/types/wishlistTypes";
import WishlistBanner from "./WishlistBanner";
import { useRouter } from "next/router";
import { notifications } from "@mantine/notifications";
import { useForm } from "@mantine/form";
import WatchlistItemSpotlight from "./WatchlistItemSpotlight";
import { useSession } from "next-auth/react";
import ToggleWatchedButton from "../Watched/ToggleWatchedButton";

const genres = [
  "Action",
  "Adventure",
  "Animation",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Family",
  "Fantasy",
  "History",
  "Horror",
  "Music",
  "Mystery",
  "Romance",
  "Science Fiction",
  "TV Movie",
  "Thriller",
  "War",
  "Western",
];

type Props = {
  data?: WishlistDetails;
  isLoading: boolean;
  updateLoading: boolean;
  addRemoveLoading: boolean;
  updateWishlist: (data: {
    id: string;
    name: string;
    description?: string;

    genre?: string[];
    public?: boolean;
  }) => void;
  removeFromWishlist: (id: string) => void;
  addToWishlist: (id: string, mediaId: string, mediaType: string) => void;
};

const useStyles = createStyles((theme) => ({
  center: {
    borderRadius: theme.radius.md,
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[9]
        : theme.colors.gray[0],
  },
  button: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.gray[9]
        : theme.colors.gray[3],
    color:
      theme.colorScheme === "dark"
        ? theme.colors.gray[1]
        : theme.colors.dark[9],
  },

  clickable: {
    cursor: "pointer",
  },
}));

const WishlistDetail = (props: Props) => {
  const {
    data,
    isLoading,
    updateLoading,
    addRemoveLoading,
    removeFromWishlist,
    updateWishlist,
    addToWishlist,
  } = props;
  const form = useForm({
    initialValues: {
      name: "",
      description: "",
      genre: ["Fuck you", "Fuck me"],
      public: false,
    },

    validate: {
      name: (value: string) => {
        console.log(value);
        if (!value) {
          return "Name is required";
        }
        return false;
      },
    },
  });

  type FormValues = typeof form.values;

  const { classes, theme } = useStyles();
  const router = useRouter();
  const session = useSession();

  const isCreator = data?.authorId === session.data?.user.id;

  const handleRouting = (mediaType: string, mediaId: string) => {
    if (!mediaType || !mediaId) {
      notifications.show({
        title: "Error",
        message: "Something went wrong",
        color: "red",
      });
      return;
    }
    void router.push(`/discover/${mediaType}/${mediaId}`);
  };

  useEffect(() => {
    form.setValues({
      name: data?.name,
      description: data?.description || "",
      genre: data?.genre || [],
      public: data?.public,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleSubmit = (formValues: FormValues) => {
    if (!data?.id) {
      notifications.show({
        title: "Error",
        message: "Something went wrong",
        color: "red",
      });
      return;
    }
    updateWishlist({ id: data?.id, ...formValues });
  };

  if (!data || isLoading) return <SkeletonPage />;
  return (
    <Center component={Paper} className={classes.center} p={theme.spacing.md}>
      <Flex direction="column" w="100%">
        <WishlistBanner item={data} />

        <Paper
          my={theme.spacing.xl}
          py={theme.spacing.sm}
          px={theme.spacing.lg}
        >
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <LoadingOverlay visible={updateLoading} opacity={3} />
            <Stack w={"100%"}>
              <TextInput
                placeholder="Playlist Title"
                label="Title"
                withAsterisk
                disabled={!isCreator}
                {...form.getInputProps("name")}
              />
              <MultiSelect
                data={genres}
                label="Genres"
                placeholder="Pick all that apply"
                clearButtonProps={{ "aria-label": "Clear selection" }}
                clearable
                disabled={!isCreator}
                {...form.getInputProps("genre")}

                // {...form.getInputProps("genre")}
                // onChange={(value) => {
                //   console.log(value);
                // }}
              />
              <Textarea
                placeholder="Description of the playlist"
                label="Description"
                autosize
                minRows={2}
                disabled={!isCreator}
                {...form.getInputProps("description")}
              />
              <Switch
                label="Public"
                size="lg"
                disabled={!isCreator}
                {...form.getInputProps("public", { type: "checkbox" })}
              />
              <Button disabled={!isCreator} type="submit">
                Save
              </Button>
            </Stack>
          </form>
        </Paper>

        {isCreator && (
          <WatchlistItemSpotlight
            addToWishlist={(mediaId: string, mediaType: string) => {
              addToWishlist(data.id, mediaId, mediaType);
            }}
          />
        )}

        <Center mt={theme.spacing.md}>
          <LoadingOverlay visible={addRemoveLoading} opacity={3} />

          <ScrollArea.Autosize mah={700} type="hover">
            {data.wishlistRecords.map((record: WishlistRecordWithMedia) => {
              const { media } = record;
              return (
                <>
                  <Group
                    noWrap
                    key={record?.id}
                    my={theme.spacing.md}
                    align="center"
                    position="apart"
                  >
                    <Image
                      withPlaceholder
                      src={`https://image.tmdb.org/t/p/${posterSizes.w500}/${media?.image}`}
                      alt="Playlist item"
                      radius={theme.radius.lg}
                      fit="contain"
                      height={150}
                      width={150}
                      onClick={() =>
                        handleRouting(record.mediaType, record.mediaId)
                      }
                      className={classes.clickable}
                    />
                    <Stack align="start" w="100%">
                      <Anchor
                        onClick={() =>
                          handleRouting(record.mediaType, record.mediaId)
                        }
                        className={classes.clickable}
                      >
                        <Text fz="xl" fw="900" c="dimmed">
                          {media?.title}
                        </Text>
                      </Anchor>
                      <Spoiler maxHeight={50} hideLabel="Less" showLabel="More">
                        <Text c="dimmed">{media?.overview}</Text>
                      </Spoiler>
                    </Stack>
                    <Group noWrap>
                      <ToggleWatchedButton id={media.id.toString()} />
                      {isCreator && (
                        <Tooltip label="Remove from Playlist">
                          <ActionIcon
                            variant="subtle"
                            size={32}
                            onClick={() => {
                              removeFromWishlist(record.id);
                            }}
                          >
                            <IconX color="red" size="2.5rem" />
                          </ActionIcon>
                        </Tooltip>
                      )}
                    </Group>
                  </Group>
                </>
              );
            })}
          </ScrollArea.Autosize>
        </Center>
      </Flex>
    </Center>
  );
};

export default WishlistDetail;
