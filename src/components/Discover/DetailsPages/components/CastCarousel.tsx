// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { Cast } from "@/types/discoverTypes";
import { posterSizes } from "@/utils/consts";
import { Carousel } from "@mantine/carousel";
import {
  createStyles,
  Stack,
  Text,
  Avatar,
  Center,
  Title,
} from "@mantine/core";
import { useRouter } from "next/router";

const useStyles = createStyles((theme) => ({
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
  stack: {
    cursor: "pointer",
  },
}));

interface CarouselProps {
  data: Cast[];
}

const CastCarousel: React.FC<CarouselProps> = (props) => {
  const { data } = props;
  const { classes, theme } = useStyles();
  const router = useRouter();

  const slides = data.map((row) => {
    return (
      <Carousel.Slide key={row?.id}>
        <Stack
          className={classes.stack}
          onClick={() => {
            void router.push(`/discover/person/${row?.id}`);
          }}
        >
          <Avatar
            src={`https://image.tmdb.org/t/p/${posterSizes.original}/${
              row?.profile_path || ""
            }`}
            radius="md"
            size={200}
          />
          <Text fw="bold">{row?.name}</Text>
        </Stack>
      </Carousel.Slide>
    );
  });

  if (!data) return null;

  return (
    <>
      <Title my={theme.spacing.xl}>Cast</Title>

      <Center>
        <Carousel
          slideSize="20%"
          slideGap="sm"
          dragFree
          align="start"
          className={classes.carousel}
          height={250}
        >
          {slides}
        </Carousel>
      </Center>
    </>
  );
};

export default CastCarousel;
