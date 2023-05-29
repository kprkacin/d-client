import { useCallback, useEffect, useState } from "react";
import { Carousel, Embla } from "@mantine/carousel";
import {
  Box,
  Progress,
  Paper,
  rem,
  createStyles,
  Accordion,
} from "@mantine/core";
import MovieRecommendationCard from "./MovieRecommendationCard";
import { useDisclosure } from "@mantine/hooks";
import TrailerModal from "./TrailerModal";

const useStyles = createStyles((theme) => ({
  root: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.slate?.[0],
    borderRadius: theme.radius.xl,
    width: "100%",
  },

  item: {
    width: "100%",
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.light?.[0],
    // border: `${rem(1)} solid transparent`,
    position: "relative",
    zIndex: 0,
    transition: "transform 150ms ease",

    "&[data-active]": {
      transform: "scale(1.03)",
      backgroundColor:
        theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
      boxShadow: theme.shadows.md,
      borderColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[2],
      borderRadius: theme.radius.md,
      zIndex: 1,
    },
  },

  chevron: {
    "&[data-rotate]": {
      transform: "rotate(-90deg)",
    },
  },
}));

type Props = {
  items: {
    DVD: string;
    Plot: string;
    Type: string;
    Year: string;
    Genere: string;
    Rated: string;
    Title: string;
    Actors: string;
    Awards: string;
    Poster: string;
    Writer: string;
    imdbID: string;
    Country: string;
    Runtime: string;
    Ratings: [
      {
        Source: string;
        Value: string;
      }
    ];
    Website: string;
    Director: string;
    Language: string;
    Released: string;
    Response: string;
    BoxOffice: string;
    Metascore: string;
    imdbVotes: string;
    Production: string;
    imdbRating: string;
  }[];
};

const RecommendationCarausel = (props: Props) => {
  const { items = [] } = props;
  const [scrollProgress, setScrollProgress] = useState(0);
  const [opened, { open, close }] = useDisclosure(false);

  const [embla, setEmbla] = useState<Embla | null>(null);
  const { classes } = useStyles();

  const handleScroll = useCallback(() => {
    if (!embla) return;
    const progress = Math.max(0, Math.min(1, embla.scrollProgress()));
    setScrollProgress(progress * 100);
  }, [embla, setScrollProgress]);

  useEffect(() => {
    if (embla) {
      embla.on("scroll", handleScroll);
      handleScroll();
    }
  }, [embla, handleScroll]);

  return (
    <>
      <Accordion
        mx="auto"
        variant="filled"
        defaultValue=""
        classNames={classes}
        className={classes.root}
      >
        <Accordion.Item value="Recommendations">
          <Accordion.Control>Recommendations</Accordion.Control>
          <Accordion.Panel>
            <Paper py={40} w="100%">
              <Carousel
                dragFree
                slideSize="40%"
                slideGap="sm"
                mih={200}
                getEmblaApi={setEmbla}
                initialSlide={2}
              >
                {items.map((item) => (
                  <Carousel.Slide
                    key={item.imdbID}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <MovieRecommendationCard item={item} />
                  </Carousel.Slide>
                ))}
              </Carousel>
              <Progress
                value={scrollProgress}
                styles={{
                  bar: { transitionDuration: "0ms" },
                  root: { maxWidth: rem(450) },
                }}
                size="sm"
                mt="xl"
                mx="auto"
              />
            </Paper>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
      <TrailerModal
        opened={opened}
        onClose={close}
        id="58f5210792514127710020ff"
      />
    </>
  );
};

export default RecommendationCarausel;
