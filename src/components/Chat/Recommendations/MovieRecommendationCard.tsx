import {
  Card,
  Image,
  Text,
  Group,
  Badge,
  createStyles,
  Center,
  Button,
  rem,
  Stack,
} from "@mantine/core";
import {
  IconGasStation,
  IconGauge,
  IconManualGearbox,
  IconUsers,
} from "@tabler/icons-react";

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

const mockdata = [
  { label: "4 passengers", icon: IconUsers },
  { label: "100 km/h in 4 seconds", icon: IconGauge },
  { label: "Automatic gearbox", icon: IconManualGearbox },
  { label: "Electric", icon: IconGasStation },
];
type Props = {
  item: {
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
  };
};

const MovieRecommendationCard = (props: Props) => {
  const { item } = props;
  const { classes } = useStyles();
  const features = mockdata.map((feature) => (
    <Center key={feature.label}>
      <feature.icon size="1.05rem" className={classes.icon} stroke={1.5} />
      <Text size="xs">{feature.label}</Text>
    </Center>
  ));

  return (
    <Card radius="md" className={classes.card}>
      <Card.Section className={classes.imageSection}>
        <Image src={item.Poster} alt={item.Title} h={390} />
      </Card.Section>

      <Group position="apart" mt="md">
        <Stack w="90%">
          <Text fw={500} h={60}>
            {item.Title}
          </Text>
          <Text fz="xs" c="dimmed" h={200} className={classes.plot} truncate>
            {item.Plot}
          </Text>
        </Stack>
        <Badge variant="outline">{item.imdbRating}</Badge>
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

          <Button radius="xl" style={{ flex: 1 }}>
            Rent now
          </Button>
        </Group>
      </Card.Section>
    </Card>
  );
};

export default MovieRecommendationCard;
