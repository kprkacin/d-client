import { api } from "@/utils/api";
import React from "react";
import { Carousel } from "@mantine/carousel";
import { useMediaQuery } from "@mantine/hooks";
import {
  createStyles,
  Text,
  Image,
  rem,
  Card,
  Center,
  Spoiler,
  Stack,
  Badge,
  Group,
  Title,
} from "@mantine/core";
import { useRouter } from "next/router";
import { posterSizes } from "@/utils/consts";
import { Episode, Season } from "@/types/discoverTypes";
import { dateFormat } from "@/utils/helpers";

const useStyles = createStyles((theme) => ({
  card: {
    height: rem(450),
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignrows: "flex-start",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily as string}`,
    fontWeight: 900,
    color: theme.white,
    lineHeight: 1.2,
    fontSize: rem(32),
    marginTop: theme.spacing.xs,
  },

  category: {
    color: theme.white,
    opacity: 0.7,
    fontWeight: 700,
    textTransform: "uppercase",
  },
  cardButton: {
    borderColor: theme.fn.primaryColor(),
    color: theme.white,
  },
  carousel: {
    maxWidth: 1000,

    [theme.fn.smallerThan("xl")]: {
      maxWidth: 900,
    },
    [theme.fn.smallerThan("lg")]: {
      maxWidth: 700,
    },
    [theme.fn.smallerThan("md")]: {
      maxWidth: 600,
    },
    [theme.fn.smallerThan("sm")]: {
      maxWidth: 500,
    },
  },
  badge: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  clickable: {
    cursor: "pointer",
  },
}));

type Props = {
  data: Episode[];
};

const Episodes = (props: Props) => {
  const { data } = props;

  const router = useRouter();
  const { classes, theme } = useStyles();

  const handleRouting = (number: number) => {
    if (!number) return;
    void router.push(`${router.asPath}/episode/${number}`);
  };
  const slides = data.map((row) => {
    return (
      <Carousel.Slide key={row?.id}>
        <Card radius="md" mih={400}>
          <Card.Section
            onClick={() => handleRouting(row.episode_number)}
            className={classes.clickable}
          >
            <Image
              src={`https://image.tmdb.org/t/p/${posterSizes.w500}/${row?.still_path}`}
              height={200}
              width={250}
              alt={row.name}
            />
          </Card.Section>

          <Card.Section mt="md" px={5}>
            <Stack>
              <Badge className={classes.badge}>
                {dateFormat(row.air_date)}
              </Badge>
              <Text
                h={rem(40)}
                fw={500}
                className={classes.clickable}
                onClick={() => handleRouting(row.episode_number)}
              >
                {row.name}
              </Text>

              <Text fz="sm">
                <Spoiler maxHeight={100} showLabel="Show more" hideLabel="Hide">
                  {row.overview || "No overview"}
                </Spoiler>
              </Text>
            </Stack>
          </Card.Section>
        </Card>
      </Carousel.Slide>
    );
  });

  return (
    <>
      <Title my={theme.spacing.xl}>{data.length} Episodes</Title>
      <Center>
        <Carousel
          slideSize={250}
          breakpoints={[{ maxWidth: "sm", slideSize: "50%", slideGap: 2 }]}
          slideGap="xl"
          dragFree
          align="start"
          className={classes.carousel}
        >
          {slides}
        </Carousel>
      </Center>
    </>
  );
};

export default Episodes;
