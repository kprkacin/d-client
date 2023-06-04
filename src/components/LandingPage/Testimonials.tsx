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
    description: `"This has completely transformed the way I choose movies to watch. As a busy professional, I don't have the time to browse through endless movie lists. I simply chat with the bot, and it provides me with personalized recommendations that align perfectly with my tastes. It's like having my own personal movie curator. I've discovered so many amazing films that I would have never found on my own. Movie nights are now a delight!"`,
  },
  {
    name: "Noah Brown",
    profession: "Graphic Designer",
    email: "NoahBrown@gmail.com",
    avatar: "NB",
    description: `"I consider myself a movie enthusiast, but even I sometimes struggle to find the perfect movie to match my mood. That's where this comes in. The chatbot understands me better than anyone else when it comes to my movie preferences. It's like chatting with a knowledgeable film connoisseur. I've been introduced to a whole new world of movies I wouldn't have discovered otherwise. It has made movie-watching exciting and effortless for me!" `,
  },
  {
    name: "Hailey Tanaka",
    profession: "Owner",
    email: "HaileyTanaka@gmail.com",
    avatar: "HT",
    description: `"I can't recommend it enough! As a self-proclaimed cinephile, I thought I had seen it all. However, this app has opened my eyes to a whole new realm of cinema. The personalized recommendations are spot-on, and I love that it goes beyond mainstream films to offer a diverse selection of international and indie movies. With it, my movie-watching horizons have been expanded and introduced me to incredible films I would have otherwise overlooked. It's a must-have for any movie lover!"`,
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
