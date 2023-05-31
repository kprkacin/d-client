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
} from "@mantine/core";

const useStyles = createStyles((theme) => ({
  card: {
    border: `1px solid ${theme.colors.gray[0]}`,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  imageSection: {
    padding: theme.spacing.md,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
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
    borderTop: `${rem(1)} solid ${theme.colors.gray[0]}`,
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
}));

type Props = {
  item: any;
};

const MovieRecommendationCard = (props: Props) => {
  const { item } = props;
  const { classes } = useStyles();

  return (
    <Card radius="md" className={classes.card}>
      <Card.Section className={classes.imageSection}>
        <Image
          src={`https://image.tmdb.org/t/p/${posterSizes.w500}/${item?.poster_path}`}
          alt={item.title}
        />
      </Card.Section>

      <Group position="apart" mt="md">
        <Stack w="90%">
          <Text fw={500} h={60}>
            {item?.title || item?.name}
          </Text>
          <Text fz="xs" c="dimmed" h={200} className={classes.plot} truncate>
            {item.overview}
          </Text>
        </Stack>
        <Badge variant="outline">{item.vote_average}</Badge>
      </Group>

      <Card.Section className={classes.section} mt="md">
        <Text fz="sm" c="dimmed" className={classes.label}>
          Info
        </Text>

        <Group spacing={8} mb={-8}></Group>
      </Card.Section>

      <Card.Section className={classes.section}>
        <Group spacing={30}>
          <div>
            <Text fz="xl" fw={700} sx={{ lineHeight: 1 }}>
              $168.00
            </Text>
            <Text fz="sm" c="dimmed" fw={500} sx={{ lineHeight: 1 }} mt={3}>
              per day
            </Text>
          </div>

          <AddToWishlistMenu
            mediaId={item.id}
            mediaType={item.media_type}
            position="top"
          />
        </Group>
      </Card.Section>
    </Card>
  );
};

export default MovieRecommendationCard;
