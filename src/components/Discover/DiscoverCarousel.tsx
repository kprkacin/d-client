import { Carousel } from "@mantine/carousel";
import { useMediaQuery } from "@mantine/hooks";
import {
  createStyles,
  Paper,
  Text,
  Title,
  Button,
  useMantineTheme,
  rem,
  Group,
} from "@mantine/core";
import { useRouter } from "next/router";
import { posterSizes } from "@/utils/consts";
import { memo, type Dispatch, type SetStateAction } from "react";
import AddToWishlistMenu from "../Wishlist/AddToWishlistMenu";
import { type DiscoverMedia } from "@/types/discoverTypes";

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
  // carousel:{

  // }
}));

interface CardProps {
  image: string;
  title: string;
  id: number;
  category: string;
  callback: () => void;
}

function Card({ id, image, title, category, callback }: CardProps) {
  const { classes } = useStyles();

  const handleCallback = (e: React.SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
    callback();
  };

  return (
    <Paper
      shadow="md"
      p="xl"
      radius="md"
      sx={{ backgroundImage: `url(${image})` }}
      className={classes.card}
    >
      <div>
        <Text className={classes.category} size="xs">
          {category}
        </Text>
        <Title order={3} className={classes.title}>
          {title}
        </Title>
      </div>
      {category !== "person" && (
        <Group position="apart">
          <Button
            className={classes.cardButton}
            variant="subtle"
            onClick={handleCallback}
          >
            Watch trailer
          </Button>
          <AddToWishlistMenu mediaId={id.toString()} mediaType={category} />
        </Group>
      )}
    </Paper>
  );
}

interface CarouselProps {
  data: DiscoverMedia[];
  setActiveRow: Dispatch<SetStateAction<DiscoverMedia | null>>;
}

const TrendingAll: React.FC<CarouselProps> = (props) => {
  const { data, setActiveRow } = props;

  const router = useRouter();

  const slides = data.map((row) => {
    return (
      <Carousel.Slide
        key={row?.id}
        onClick={() => {
          void router.push(`/discover/${row?.media_type}/${row?.id}`);
        }}
      >
        <Card
          image={`https://image.tmdb.org/t/p/${posterSizes.w500}/${row?.image}`}
          title={row?.title}
          category={row?.media_type}
          id={row?.id}
          callback={() => {
            setActiveRow(row);
          }}
        />
      </Carousel.Slide>
    );
  });
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  return (
    <Carousel
      slideSize={350}
      breakpoints={[{ maxWidth: "sm", slideSize: "100%", slideGap: 2 }]}
      slideGap="xl"
      align="start"
      slidesToScroll={mobile ? 1 : 2}
    >
      {slides}
    </Carousel>
  );
};

export default memo(TrendingAll);
