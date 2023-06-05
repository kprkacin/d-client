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
  Title,
} from "@mantine/core";
import { useRouter } from "next/router";
import { posterSizes } from "@/utils/consts";
import { Season } from "@/types/discoverTypes";

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
      maxWidth: 350,
    },
  },
  clickable: {
    cursor: "pointer",
  },
}));

type Props = {
  data: Season[];
};

const Seasons = (props: Props) => {
  const { data } = props;

  const router = useRouter();
  const { classes, theme } = useStyles();

  const handleRouting = (number: number) => {
    if (!number) return;
    void router.push(`${router.asPath}/season/${number}`);
  };

  const slides = data.map((row) => {
    return (
      <Carousel.Slide key={row?.id} mih={400}>
        <Card>
          <Card.Section
            onClick={() => handleRouting(row.season_number)}
            className={classes.clickable}
          >
            <Image
              withPlaceholder
              src={`https://image.tmdb.org/t/p/${posterSizes.w500}/${row?.poster_path}`}
              //   height={300}
              width={250}
              alt={row.name}
            />
          </Card.Section>

          <Card.Section mt="md">
            <Center component={Stack}>
              <Text
                fz="lg"
                fw={500}
                onClick={() => handleRouting(row.season_number)}
                className={classes.clickable}
              >
                {row.name}
              </Text>
              <Text fz="sm" mt="xs">
                <Spoiler maxHeight={100} showLabel="Show more" hideLabel="Hide">
                  {row.overview}
                </Spoiler>
              </Text>
            </Center>
          </Card.Section>
        </Card>
      </Carousel.Slide>
    );
  });

  return (
    <>
      <Title my={theme.spacing.xl}>Seasons</Title>
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

export default Seasons;
