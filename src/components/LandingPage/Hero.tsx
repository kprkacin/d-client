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
  const { classes } = useStyles();
  return (
    <Container>
      <div className={classes.inner}>
        <div className={classes.content}>
          <Title className={classes.title}>
            Introducing{" "}
            <span className={classes.highlight}>AR Business Cards</span>, the
            easiest way to make a lasting impression.
          </Title>
          <Text color="dimmed" mt="md">
            Our software allows you to create stunning AR business cards that
            come to life when scanned. Imagine being able to showcase a
            360-degree view of your product, a video of your latest project, or
            a virtual tour of your office - all on a single business card. And
            the best part? It's easy to share with anyone, anywhere. Simply scan
            the QR code on the back of the card and experience the future of
            networking today. Try AR Business Cards now and take your business
            to the next level.
          </Text>

          <Group mt={30}>
            <Button radius="xl" size="md" className={classes.control}>
              Try Demo
            </Button>
          </Group>
        </div>
        <Image src="hero.svg" className={classes.image} />
      </div>
    </Container>
  );
};

export default Hero;
