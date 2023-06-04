/* eslint-disable react/no-unescaped-entities */
import {
  createStyles,
  Badge,
  Group,
  Title,
  Text,
  Card,
  SimpleGrid,
  Container,
  Box,
  Stack,
} from "@mantine/core";
import { IconGauge, IconUser, IconDeviceTv } from "@tabler/icons-react";

const mockdata = [
  {
    title: "Personalized Recommendations",
    description:
      "Our product takes the guesswork out of choosing your next film. By utilizing the power of ChatGPT, our chatbot understands your unique preferences and tastes. Whether you're a fan of action-packed blockbusters or indie dramas, the algorithm analyzes your input and provides personalized movie recommendations tailored specifically to your liking.",
    icon: IconUser,
  },
  {
    title: "Time-saving and Efficient",
    description:
      "We understand that time is precious, and searching for the right movie can be a daunting task. This streamlines the entire process, allowing you to get instant recommendations with just a few interactions. No more wasting hours scrolling through endless options or reading countless reviews.",
    icon: IconGauge,
  },
  {
    title: "Diverse Movie Selection",
    description:
      "Using our app you'll explore a wide range of genres, uncover hidden gems, and rediscover timeless classics. Our extensive movie database encompasses a vast collection of films from various countries, eras, and styles. Whether you're seeking the latest Hollywood blockbuster or an obscure foreign film.",
    icon: IconDeviceTv,
  },
];

const useStyles = createStyles((theme) => ({
  wrapper: {
    "&::before": {
      content: '""',
      position: "absolute",
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
      transform: "skewY(-5deg)",
      transformOrigin: "50% 0",
      outline: "1px solid transparent",
      backfaceVisibility: "hidden",
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[0],
    },
    "&::after": {
      content: '""',
      position: "absolute",
      left: 0,
      top: "50%",
      right: 0,
      bottom: "-20%",
      transform: "skewY(0deg)",
      transformOrigin: "50% 0",
      outline: "1px solid transparent",
      backfaceVisibility: "hidden",
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[0],
    },

    position: "relative",
    padding: `calc(100vh * -0.0437443) 0`,
    paddingTop: "6rem",
    paddingBottom: "6rem",
  },

  title: {
    fontSize: 34,
    fontWeight: 900,
    [theme.fn.smallerThan("sm")]: {
      fontSize: 24,
    },
  },

  description: {
    maxWidth: 600,
    margin: "auto",

    "&::after": {
      content: '""',
      display: "block",
      backgroundColor: theme.fn.primaryColor(),
      width: 45,
      height: 2,
      marginTop: theme.spacing.sm,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },

  card: {
    border: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1]
    }`,
  },

  cardTitle: {
    "&::after": {
      content: '""',
      display: "block",
      backgroundColor: theme.fn.primaryColor(),
      width: "100%",
      height: 2,
      marginTop: theme.spacing.sm,
    },
  },
}));

export function FeaturesCards() {
  const { classes, theme } = useStyles();
  const features = mockdata.map((feature) => (
    <Card
      key={feature.title}
      shadow="md"
      radius="md"
      className={classes.card}
      p="xl"
    >
      <Stack align="center">
        <feature.icon size={50} stroke={2} color={theme.fn.primaryColor()} />
        <Text size="lg" weight={500} className={classes.cardTitle} mt="md">
          {feature.title}
        </Text>
        <Text size="sm" color="dimmed" mt="sm">
          {feature.description}
        </Text>
      </Stack>
    </Card>
  ));
  return (
    <div className={classes.wrapper}>
      <Container size="lg" py="xl" sx={{ position: "relative", zIndex: 99 }}>
        <Group position="center">
          <Badge variant="filled" size="lg">
            Unique Experiences
          </Badge>
        </Group>

        <Box sx={{ zIndex: 500 }}>
          <Title order={2} className={classes.title} align="center" mt="sm">
            Why should you consider using our AI chatbot?
          </Title>
        </Box>

        <Text
          color="dimmed"
          className={classes.description}
          align="center"
          mt="md"
        >
          We believe that standing out and being unique is the key to success.
          Our product is designed to provide you with a one-of-a-kind experience
          that you won't find anywhere else.
        </Text>

        <SimpleGrid
          cols={3}
          spacing="xl"
          mt={50}
          breakpoints={[{ maxWidth: "md", cols: 1 }]}
        >
          {features}
        </SimpleGrid>
      </Container>
    </div>
  );
}
