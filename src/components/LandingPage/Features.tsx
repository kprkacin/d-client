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
} from "@mantine/core";
import { IconGauge, IconUser, IconCookie } from "@tabler/icons-react";

const mockdata = [
  {
    title: "Unique and memorable",
    description:
      "AR business cards are a unique and memorable way to make an impression on potential clients or partners. By using AR technology, you can create a business card that stands out and captures attention",
    icon: IconGauge,
  },
  {
    title: "Interactive and engaging",
    description:
      "AR business cards are more engaging and interactive than traditional business cards. They allow you to showcase your products, services, or projects in a way that is dynamic and engaging.",
    icon: IconUser,
  },
  {
    title: "Easy to share",
    description:
      "AR business cards are easy to share with anyone, anywhere. All they need is a smartphone with a QR code scanner to experience your AR content.",
    icon: IconCookie,
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
      width: 45,
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
      <feature.icon size={50} stroke={2} color={theme.fn.primaryColor()} />
      <Text size="lg" weight={500} className={classes.cardTitle} mt="md">
        {feature.title}
      </Text>
      <Text size="sm" color="dimmed" mt="sm">
        {feature.description}
      </Text>
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
            Why should you consider AR Business Cards?
          </Title>
        </Box>

        <Text
          color="dimmed"
          className={classes.description}
          align="center"
          mt="md"
        >
          Here at ARBC we believe that standing out and being unique is the key
          to success. That's why we created AR Business Cards.
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
