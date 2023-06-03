import { Carousel } from "@mantine/carousel";
import { useMediaQuery } from "@mantine/hooks";
import { createStyles, Paper, Title, rem, Group } from "@mantine/core";
import { useRouter } from "next/router";
import { posterSizes } from "@/utils/consts";
import { memo } from "react";
import { type Similar } from "@/types/discoverTypes";
import AddToWishlistMenu from "@/components/Wishlist/AddToWishlistMenu";

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
}));

interface CardProps {
  image: string;
  title: string;
  id: number;
  category: string;
}

function Card({ id, image, title, category }: CardProps) {
  const { classes } = useStyles();

  return (
    <Paper
      shadow="md"
      p="xl"
      radius="md"
      sx={{ backgroundImage: `url(${image})` }}
      className={classes.card}
    >
      <div>
        <Title order={3} className={classes.title}>
          {title}
        </Title>
      </div>
      <Group position="apart">
        <AddToWishlistMenu mediaId={id.toString()} mediaType={category} />
      </Group>
    </Paper>
  );
}

interface CarouselProps {
  data: Similar;
  mediaType: string;
}

const SimilarsCarousel: React.FC<CarouselProps> = (props) => {
  const { data, mediaType } = props;

  const router = useRouter();
  const { classes, theme } = useStyles();

  const slides = data.results.map((row) => {
    return (
      <Carousel.Slide
        key={row?.id}
        onClick={() => {
          void router.push(`/discover/${mediaType}/${row?.id}`);
        }}
      >
        <Card
          image={`https://image.tmdb.org/t/p/${posterSizes.w500}/${row?.poster_path}`}
          title={row?.title}
          id={row?.id}
          category={mediaType}
        />
      </Carousel.Slide>
    );
  });
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.xs})`);

  return (
    <Carousel
      slideSize={350}
      breakpoints={[{ maxWidth: "sm", slideSize: "100%", slideGap: 2 }]}
      slideGap="xl"
      align="start"
      className={classes.carousel}
      slidesToScroll={mobile ? 1 : 2}
    >
      {slides}
    </Carousel>
  );
};

export default memo(SimilarsCarousel);
