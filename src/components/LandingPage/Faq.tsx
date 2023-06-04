/* eslint-disable react/no-unescaped-entities */
import {
  createStyles,
  Image,
  Accordion,
  Grid,
  Col,
  Container,
  Title,
} from "@mantine/core";

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
    marginBottom: theme.spacing.md,
    paddingLeft: theme.spacing.md,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
  },

  item: {
    fontSize: theme.fontSizes.sm,
    zIndex: 500,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[1]
        : theme.colors.gray[7],
  },
}));

export function FaqWithImage() {
  const { classes, theme } = useStyles();

  const dark = theme.colorScheme === "dark";

  return (
    <div className={classes.wrapper}>
      <Container size="lg" sx={{ position: "relative", zIndex: 99 }}>
        <Grid id="faq-grid" gutter={50}>
          <Col span={12} md={6}>
            <Image
              withPlaceholder
              src={dark ? "faq-dark.svg" : "faq-light.svg"}
              alt="Frequently Asked Questions"
            />
          </Col>
          <Col span={12} md={6}>
            <Title order={2} align="left" className={classes.title}>
              Frequently Asked Questions
            </Title>

            <Accordion
              chevronPosition="right"
              defaultValue="reset-password"
              variant="separated"
            >
              <Accordion.Item className={classes.item} value="reset-password">
                <Accordion.Control>
                  How does the movie recommendation system work?
                </Accordion.Control>
                <Accordion.Panel>
                  Our movie recommendation system is powered by advanced AI
                  technology. It analyzes your preferences, taking into account
                  factors such as genre, ratings, and popularity, to generate
                  personalized movie suggestions. By understanding your unique
                  tastes, it ensures that the recommendations align with your
                  preferences.
                </Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item className={classes.item} value="another-account">
                <Accordion.Control>
                  Can I trust the movie recommendations provided?
                </Accordion.Control>
                <Accordion.Panel>
                  Yes, you can! We strive to offer high-quality movie
                  recommendations. Our system considers various factors and
                  incorporates user feedback to curate a selection of
                  well-regarded films. However, it's important to remember that
                  movie preferences can be subjective, so individual experiences
                  may vary.
                </Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item className={classes.item} value="newsletter">
                <Accordion.Control>
                  Can I request recommendations from specific genres or time
                  periods?
                </Accordion.Control>
                <Accordion.Panel>
                  Absolutely! Our movie recommendation system allows you to
                  specify your preferences, including genres, time periods, and
                  even specific actors or directors. By communicating your
                  preferences, you can receive recommendations tailored to your
                  desired criteria.
                </Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item className={classes.item} value="credit-card">
                <Accordion.Control>
                  Does the system recommend movies from different countries?
                </Accordion.Control>
                <Accordion.Panel>
                  Definitely! We take pride in offering a diverse selection of
                  movies from various countries and cultures. Whether you're
                  interested in exploring films from Bollywood, French cinema,
                  or Japanese anime, our system has a wide range of
                  international movies to cater to your global cinematic
                  interests.
                </Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item className={classes.item} value="payment">
                <Accordion.Control>
                  Can I access the movie recommendation service on my mobile
                  device?
                </Accordion.Control>
                <Accordion.Panel>
                  Yes, you can! Our movie recommendation service is accessible
                  on various devices, including smartphones and tablets. Simply
                  visit our website through your mobile browser and enjoy the
                  same personalized movie recommendations and chat experience
                  while on the go. Whether you're at home or out and about, our
                  service is ready to assist you in finding your next movie gem.
                </Accordion.Panel>
              </Accordion.Item>
            </Accordion>
          </Col>
        </Grid>
      </Container>
    </div>
  );
}
