/* eslint-disable react/no-unescaped-entities */
import {
  createStyles,
  Image,
  Container,
  Title,
  Button,
  Group,
  Text,
} from "@mantine/core";

const useStyles = createStyles((theme) => ({
  inner: {
    position: "relative",
    display: "flex",
    justifyContent: "space-between",
    paddingTop: "2rem",
    paddingBottom: "6rem",
  },

  content: {
    maxWidth: 580,
    marginRight: theme.spacing.xl,
    [theme.fn.smallerThan("md")]: {
      maxWidth: "100%",
      marginRight: 0,
    },
  },

  title: {
    fontSize: 44,
    lineHeight: 1.2,
    fontWeight: 900,

    [theme.fn.smallerThan("xs")]: {
      fontSize: 28,
    },
  },

  control: {
    [theme.fn.smallerThan("xs")]: {
      flex: 1,
    },
  },

  image: {
    flex: 1,
    position: "absolute",
    width: "40%",
    right: 0,
    top: 0,
    left: "600px",
    minWidth: 600,
    maxWidth: 750,
    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },

  highlight: {
    position: "relative",
    backgroundColor: theme.fn.variant({
      variant: "light",
      color: theme.fn.primaryColor(),
    }).background,
    borderRadius: theme.radius.sm,
    padding: "4px 12px",
  },
}));

const Hero = () => {
  const { classes, theme } = useStyles();

  const dark = theme.colorScheme === "dark";

  return (
    <Container>
      <div className={classes.inner}>
        <div className={classes.content}>
          <Title className={classes.title}>
            Discover your next cinematic adventure with
            <span className={classes.highlight}>
              the power of artificial intelligence.
            </span>
          </Title>
          <Text color="dimmed" mt="md">
            Our chatbot, powered by ChatGPT, is here to recommend the perfect
            movies for your every mood and preference. Unlock a world of
            entertainment as our intelligent algorithm analyzes your tastes,
            understands your preferences, and suggests films that are tailored
            just for you. Whether you're in the mood for an action-packed
            blockbuster, a heartwarming romantic comedy, a spine-chilling horror
            flick, or a thought-provoking drama, we've got you covered.
          </Text>

          <Group mt={30}>
            <Button size="md" className={classes.control}>
              Try Demo
            </Button>
          </Group>
        </div>
        <Image
          src={dark ? "hero-dark.svg" : "hero-light.svg"}
          alt="hero"
          className={classes.image}
        />
      </div>
    </Container>
  );
};

export default Hero;
