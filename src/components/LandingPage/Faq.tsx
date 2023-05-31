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
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
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
  const { classes } = useStyles();
  return (
    <div className={classes.wrapper}>
      <Container size="lg" sx={{ position: "relative", zIndex: 99 }}>
        <Grid id="faq-grid" gutter={50}>
          <Col span={12} md={6}>
            <Image src={"faq.svg"} alt="Frequently Asked Questions" />
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
                  What is an augmented reality business card?{" "}
                </Accordion.Control>
                <Accordion.Panel>
                  An augmented reality business card is a type of business card
                  that includes interactive content that can be viewed when
                  scanned with a smartphone. The content can range from images,
                  videos, and audio to 3D models and games.
                </Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item className={classes.item} value="another-account">
                <Accordion.Control>
                  How do augmented reality business cards work?
                </Accordion.Control>
                <Accordion.Panel>
                  Augmented Reality (AR) business cards use image recognition
                  technology to recognize a pattern printed on the card. When
                  scanned, the card triggers the AR experience, allowing users
                  to interact with the content.
                </Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item className={classes.item} value="newsletter">
                <Accordion.Control>
                  What types of content can be included on an augmented reality
                  business card?
                </Accordion.Control>
                <Accordion.Panel>
                  Content can include images, videos, audio, 3D models, and
                  games. You can also include links to websites or social media
                  profiles.
                </Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item className={classes.item} value="credit-card">
                <Accordion.Control>
                  How much does it cost to create an augmented reality business
                  card?
                </Accordion.Control>
                <Accordion.Panel>
                  Costs vary depending on the complexity of the content and the
                  type of card you choose. Generally, creating an augmented
                  reality business card can cost anywhere from $150-$500.
                </Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item className={classes.item} value="payment">
                <Accordion.Control>
                  How long does it take to create an augmented reality business
                  card?
                </Accordion.Control>
                <Accordion.Panel>
                  It usually takes about two weeks to create an augmented
                  reality business card, depending on the complexity of the
                  content
                </Accordion.Panel>
              </Accordion.Item>
            </Accordion>
          </Col>
        </Grid>
      </Container>
    </div>
  );
}
