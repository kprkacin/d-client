/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */

import AddToWishlistMenu from "@/components/Wishlist/AddToWishlistMenu";
import { posterSizes } from "@/utils/consts";
import {
  Card,
  Image,
  Text,
  Group,
  Badge,
  createStyles,
  rem,
  Stack,
  Title,
  Center,
} from "@mantine/core";
import { IconStarFilled } from "@tabler/icons-react";
import { useRouter } from "next/router";

const useStyles = createStyles((theme) => ({
  card: {
    border: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[9] : theme.colors.gray[1]
    }`,
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[9]
        : theme.colors.gray[0],
  },

  imageSection: {
    padding: theme.spacing.md,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    cursor: "pointer",
  },

  label: {
    marginBottom: theme.spacing.xs,
    lineHeight: 1,
    fontWeight: 700,
    fontSize: theme.fontSizes.xs,
    letterSpacing: rem(-0.25),
    textTransform: "uppercase",
  },

  section: {
    padding: theme.spacing.md,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[9] : theme.colors.gray[1]
    }`,
  },

  icon: {
    marginRight: rem(5),
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[2]
        : theme.colors.gray[5],
  },
  plot: {
    whiteSpace: "normal",
  },
  clickable: {
    cursor: "pointer",
  },
}));

type Props = {
  item: any;
};

const MovieRecommendationCard = (props: Props) => {
  const { item } = props;
  const { classes, theme } = useStyles();
  const router = useRouter();

  return (
    <Card radius="md" className={classes.card}>
      <Card.Section
        className={classes.imageSection}
        onClick={() =>
          void router.push(`/discover/${item.media_type}/${item.id}`)
        }
      >
        <Image
          withPlaceholder
          src={`https://image.tmdb.org/t/p/${posterSizes.w500}/${item?.poster_path}`}
          alt={item.title}
        />
      </Card.Section>

      <Stack w="90%">
        <Title
          order={2}
          fw={500}
          h={60}
          className={classes.clickable}
          onClick={() =>
            void router.push(`/discover/${item.media_type}/${item.id}`)
          }
        >
          {item?.title || item?.name}
        </Title>
        <Text fz="xs" c="dimmed" h={200} className={classes.plot} truncate>
          {item.overview}
        </Text>
      </Stack>
      <Group position="apart" my="md" align="start">
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
              {item?.vote_average?.toPrecision(3)}
            </Text>
            <Text fz="sm" fw="300" c="dimmed" ml={3}>
              ({item?.vote_count} votes)
            </Text>
          </Center>
        </Stack>

        <AddToWishlistMenu
          mediaId={item.id}
          mediaType={item.media_type}
          position="top"
        />
      </Group>
    </Card>
  );
};

export default MovieRecommendationCard;
