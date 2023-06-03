import React from "react";
import { type EpisodeDetails } from "@/types/discoverTypes";
import {
  Center,
  Flex,
  Text,
  Group,
  Image,
  Stack,
  Title,
  createStyles,
  Paper,
} from "@mantine/core";
import { posterSizes } from "@/utils/consts";
import { IconStarFilled } from "@tabler/icons-react";
import { useMediaQuery } from "@mantine/hooks";
import CastCarousel from "./components/CastCarousel";
import { dateFormat } from "@/utils/helpers";
import SkeletonPage from "./SkeletonPage";

type Props = {
  data: EpisodeDetails;
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

const EpisodeDetail = (props: Props) => {
  const { data, isLoading } = props;

  const { classes, theme } = useStyles();

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
      <Flex direction="column" w="100%">
        <Group
          w="100%"
          noWrap={lg || mobile ? false : true}
          position="apart"
          align="start"
          spacing={theme.spacing.lg}
        >
          <Image
            src={`https://image.tmdb.org/t/p/${posterSizes.original}/${data?.still_path}`}
            alt="Detail Banner"
            fit="contain"
            height={400}
            width={400}
          />

          <Stack
            my={theme.spacing.xl}
            spacing={0}
            w="100%"
            align="start"
            justify="start"
          >
            <Title>{data.name} </Title>
            <Group>
              <Text fz="sm" c="dimmed">
                Season {data.season_number}
              </Text>
              <Text fz="sm" c="dimmed">
                Episode {data.episode_number}
              </Text>
            </Group>
            <Group>
              <Text c="dimmed" fz="sm">
                {dateFormat(data.air_date)}
              </Text>
              <Text c="dimmed" fz="sm">
                {data.runtime}min
              </Text>
              <Text c="dimmed" fz="sm">
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
              </Text>
            </Group>
            <Text my={theme.spacing.xl}>{data.overview}</Text>
          </Stack>
        </Group>

        <CastCarousel data={data.credits.cast} />
      </Flex>
    </Center>
  );
};

export default EpisodeDetail;