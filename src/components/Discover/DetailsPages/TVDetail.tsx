import React, { useMemo } from "react";
import { type TVDetails } from "@/types/discoverTypes";
import {
  Center,
  Flex,
  Text,
  Group,
  Image,
  Stack,
  Title,
  Badge,
  Button,
  createStyles,
  Paper,
  Blockquote,
  Anchor,
} from "@mantine/core";
import { posterSizes } from "@/utils/consts";
import YouTube from "react-youtube";
import {
  IconPlus,
  IconStarFilled,
  IconTrendingDown,
  IconTrendingUp,
} from "@tabler/icons-react";
import { useMediaQuery } from "@mantine/hooks";
import SimilarsCarousel from "./components/SimilarsCarousel";
import Seasons from "./components/Seasons";
import WatchProviders from "./components/WatchProviders";
import CastCarousel from "./components/CastCarousel";
import { dateFormat } from "@/utils/helpers";
import SkeletonPage from "./SkeletonPage";
import AddToWishlistMenu from "@/components/Wishlist/AddToWishlistMenu";
import ToggleWatchedButton from "@/components/Watched/ToggleWatchedButton";
import Comments from "../Comments/Comments";

type Props = {
  data: TVDetails;
  isLoading: boolean;
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
}));

const TVDetail = (props: Props) => {
  const { data, isLoading } = props;

  const { classes, theme } = useStyles();

  const trailer = useMemo(
    () =>
      data?.videos?.results?.filter(
        (r: { type: string }) => r.type === "Trailer"
      )?.[0]?.key,
    [data?.videos?.results]
  );
  const lg = useMediaQuery(`(max-width: ${theme.breakpoints.xl})`);
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);
  const small = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const youtubeOpts = mobile
    ? {
        width: small ? 350 : 525,
        height: small ? 200 : 300,
      }
    : {
        height: 400,
        width: 700,
      };

  console.log(data, "data");
  if (isLoading) return <SkeletonPage />;

  return (
    <Center component={Paper} className={classes.center} p={theme.spacing.md}>
      <Flex direction="column">
        <Group w="100%" position="apart" align="center" noWrap>
          <Stack
            my={theme.spacing.xl}
            spacing={0}
            w="100%"
            align="start"
            justify="start"
          >
            <Title>{data.name}</Title>
            <Group>
              <Text c="dimmed" fz="sm">
                {data.last_air_date.toString().slice(0, 4)}
              </Text>
              <Text c="dimmed" fz="sm">
                {data.last_episode_to_air.runtime}min
              </Text>
            </Group>
          </Stack>
          <ToggleWatchedButton id={data.id.toString()} />

          <AddToWishlistMenu
            mediaId={data.id.toString()}
            mediaType={"tv"}
            position="top"
            button
          />
        </Group>
        <Group
          w="100%"
          noWrap={lg || mobile ? false : true}
          position="left"
          mah={lg || mobile ? "100%" : 400}
          align="start"
          spacing={0}
        >
          <Image
            withPlaceholder
            src={`https://image.tmdb.org/t/p/${posterSizes.original}/${data?.poster_path}`}
            alt="Detail Banner"
            fit="contain"
            height={400}
            width={266}
          />
          <YouTube videoId={trailer} opts={youtubeOpts} />
          {!lg && !mobile && (
            <Button
              classNames={{ root: classes.button }}
              w="100%"
              h={400}
              variant="filled"
            >
              <IconPlus />
            </Button>
          )}
        </Group>
        <Paper p={theme.spacing.lg}>
          <Stack
            mt={theme.spacing.xl}
            spacing={0}
            w="100%"
            align="start"
            justify="start"
          >
            <Group mb={theme.spacing.lg}>
              <Stack spacing={5}>
                <Text c="dimmed" fw={600} fz="sm">
                  Genres
                </Text>
                <Group>
                  {data.genres.map((genre) => (
                    <Badge key={genre.id} variant="outline">
                      {genre.name}
                    </Badge>
                  ))}
                </Group>
              </Stack>
              <Stack spacing={5}>
                <Text c="dimmed" fw={600} fz="sm">
                  Popularity
                </Text>
                {Math.random() < 0.5 ? (
                  <Badge color="green.9">
                    <Center>
                      <IconTrendingUp />
                      <Text ml={theme.spacing.xs}>{data.popularity}</Text>
                    </Center>
                  </Badge>
                ) : (
                  <Badge color="red.9">
                    <Center>
                      <IconTrendingDown />
                      <Text ml={theme.spacing.xs}>{data.popularity}</Text>
                    </Center>
                  </Badge>
                )}
              </Stack>
              <Stack spacing={5}>
                <Text c="dimmed" fw={600} fz="sm">
                  Rating
                </Text>
                <Center>
                  <IconStarFilled
                    style={{
                      color: theme.colors.yellow[4],
                    }}
                  />
                  <Text ml={theme.spacing.xs} fw="bold">
                    {data.vote_average.toPrecision(3)}
                  </Text>
                  <Text fz="sm" fw="300" c="dimmed" ml={3}>
                    ({data.vote_count} votes)
                  </Text>
                </Center>
              </Stack>
            </Group>
            <Text>{data.overview}</Text>
            <Text>
              Directed by:{" "}
              {data.credits.crew
                .filter((crew) => crew.job === "Director")
                .map((director) => director.name)
                .join(", ")}
            </Text>
            <Text>
              Created by:{" "}
              {data.created_by.map((creator) => creator.name).join(", ")}
            </Text>
          </Stack>
        </Paper>
        {data.tagline && (
          <Blockquote mt={theme.spacing.xl}>{data.tagline}</Blockquote>
        )}

        <Seasons data={data.seasons} />

        <CastCarousel data={data.credits.cast} />

        <WatchProviders data={data["watch/providers"]} />

        <Title my={theme.spacing.xl}>Details</Title>
        <Paper p={theme.spacing.lg}>
          <Stack>
            <Group>
              <Text fw="bold" c="dimmed">
                Release date:{" "}
              </Text>
              {dateFormat(data.first_air_date)}
            </Group>
            <Group>
              <Text fw="bold" c="dimmed">
                Original language:{" "}
              </Text>
              {data.original_language}
            </Group>
            <Group>
              <Text fw="bold" c="dimmed">
                Number of seasons:{" "}
              </Text>
              {data.number_of_seasons}
            </Group>
            <Group>
              <Text fw="bold" c="dimmed">
                Number of Episodes:{" "}
              </Text>
              {data.number_of_episodes}
            </Group>

            {data.homepage && (
              <Group>
                <Text fw="bold" c="dimmed">
                  Homepage:{" "}
                </Text>
                <Anchor href={data.homepage}>{data.homepage}</Anchor>
              </Group>
            )}

            <Group>
              <Text fw="bold" c="dimmed">
                Status:{" "}
              </Text>
              {data.status}
            </Group>
          </Stack>
        </Paper>
        <Comments mediaId={data.id.toString()} />

        <Title my={theme.spacing.xl}>Similar</Title>
        <Center>
          <SimilarsCarousel data={data.similar} mediaType="movie" />
        </Center>
      </Flex>
    </Center>
  );
};

export default TVDetail;
