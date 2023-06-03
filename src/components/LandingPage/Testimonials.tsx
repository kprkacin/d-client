import {
  createStyles,
  Title,
  Text,
  SimpleGrid,
  Container,
  Paper,
  Avatar,
} from "@mantine/core";

const mockdata = [
  {
    name: "Samantha Sung",
    profession: "CEO",
    email: "SamanthaSung@gmail.com",
    avatar: "SS",
    description: `"I recently switched to using augmented reality business cards for my marketing company, and it's been a game-changer. My clients are always impressed when I hand them my card and they can see a 3D model of my latest project just by scanning it with their phone. It's a great conversation starter and really sets me apart from my competitors."`,
  },
  {
    name: "Noah Brown",
    profession: "Graphic Designer",
    email: "NoahBrown@gmail.com",
    avatar: "NB",
    description: `"As a graphic designer, I'm always looking for ways to showcase my work in a unique and impressive way. Augmented reality business cards are the perfect solution. I can include a portfolio of my designs on my card, and potential clients can see them in action just by scanning the card with their phone. It's a great way to stand out and make a lasting impression."`,
  },
  {
    name: "Hailey Tanaka",
    profession: "Owner",
    email: "HaileyTanaka@gmail.com",
    avatar: "HT",
    description: `"I wasn't sure if augmented reality business cards were worth the investment at first, but I'm so glad I gave them a try. Not only do they make me look tech-savvy and innovative, but they also make it easy for potential clients to learn more about my business and what I have to offer. I've had several people tell me they've shared my card with others because it's so cool and unique. Highly recommend!"`,
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
      transform: "skewY(0deg)",
      transformOrigin: "50% 0",
      outline: "1px solid transparent",
      backfaceVisibility: "hidden",
      backgroundColor:
        theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    },
    "&::after": {
      content: '""',
      position: "absolute",
      left: 0,
      top: "0%",
      right: 0,
      bottom: "-20%",
      transform: "skewY(0deg)",
      transformOrigin: "50% 0",
      outline: "1px solid transparent",
      backfaceVisibility: "hidden",
      backgroundColor:
        theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
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
    "&::before": {
      content: '""',
      display: "block",
      backgroundColor: theme.fn.primaryColor(),
      width: 120,
      height: 4,
      marginTop: theme.spacing.sm,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },

  card: {
    border: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[0]
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

export function Testimonials() {
  const { classes } = useStyles();
  const features = mockdata.map((feature, idx) => (
    <Paper
      key={feature.name}
      radius="md"
      withBorder
      p="lg"
      sx={(theme) => ({
        backgroundColor:
          idx === 1
            ? theme.fn.primaryColor()
            : theme.colorScheme === "dark"
            ? theme.colors.dark[8]
            : theme.white,
      })}
    >
      <Text
        sx={(theme) => ({
          color:
            idx === 1
              ? theme.black
              : theme.colorScheme === "dark"
              ? theme.white
              : theme.colors.dark[8],
        })}
        align="center"
        size="xl"
        weight={600}
        mt="md"
        mb="md"
      >
        {feature.name}
      </Text>
      <Text
        sx={(theme) => ({
          color:
            idx === 1
              ? theme.black
              : theme.colorScheme === "dark"
              ? theme.white
              : theme.colors.dark[8],
        })}
        align="center"
        size="sm"
      >
        {feature.email} • {feature.profession}
      </Text>
      <Text
        align="center"
        size="md"
        mt={12}
        sx={(theme) => ({
          color:
            idx === 1
              ? theme.black
              : theme.colorScheme === "dark"
              ? theme.white
              : theme.colors.dark[8],
        })}
      >
        {feature.description}
      </Text>

      <Avatar mt="xl" size={120} radius={120} mx="auto">
        {feature.avatar}
      </Avatar>
    </Paper>
  ));
  return (
    <div className={classes.wrapper}>
      <Container size="lg" py="xl" sx={{ position: "relative", zIndex: 99 }}>
        <Title order={2} className={classes.title} align="center" mt="sm">
          What they say about us
        </Title>

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
