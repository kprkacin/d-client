import React from "react";
import { type SeasonDetails } from "@/types/discoverTypes";
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
import { useMediaQuery } from "@mantine/hooks";
import WatchProviders from "./components/WatchProviders";
import CastCarousel from "./components/CastCarousel";
import Episodes from "./components/Episodes";
import SkeletonPage from "./SkeletonPage";

type Props = {
  data: SeasonDetails;
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

const SeasonDetail = (props: Props) => {
  const { data, isLoading } = props;

  const { classes, theme } = useStyles();

  const lg = useMediaQuery(`(max-width: ${theme.breakpoints.xl})`);
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);

  if (isLoading) return <SkeletonPage />;

  console.log(data, "data");

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
            withPlaceholder
            src={`https://image.tmdb.org/t/p/${posterSizes.original}/${data?.poster_path}`}
            alt="Detail Banner"
            fit="contain"
            height={400}
            width={266}
          />

          <Stack
            my={theme.spacing.xl}
            spacing={0}
            w="100%"
            align="start"
            justify="start"
          >
            <Title mb={theme.spacing.xl}>{data.name} </Title>
            <Text my={theme.spacing.xl}>{data.overview}</Text>
          </Stack>
        </Group>

        <WatchProviders data={data["watch/providers"]} />

        <Episodes data={data.episodes} />
        <CastCarousel data={data.credits.cast} />
      </Flex>
    </Center>
  );
};

export default SeasonDetail;
