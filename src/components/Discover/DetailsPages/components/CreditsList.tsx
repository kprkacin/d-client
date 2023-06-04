// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { Cast } from "@/types/discoverTypes";
import { yearFormat } from "@/utils/helpers";
import {
  createStyles,
  Text,
  Title,
  Accordion,
  rem,
  Group,
  Anchor,
  ScrollArea,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import _ from "lodash";
import { useRouter } from "next/router";

const useStyles = createStyles((theme) => ({
  stack: {
    cursor: "pointer",
  },
  root: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
    borderRadius: theme.radius.sm,

    maxWidth: 1000,

    [theme.fn.smallerThan("xl")]: {
      maxWidth: 900,
    },
    [theme.fn.smallerThan("lg")]: {
      maxWidth: 700,
    },
    [theme.fn.smallerThan("md")]: {
      maxWidth: 600,
    },
    [theme.fn.smallerThan("sm")]: {
      maxWidth: 350,
    },
  },

  item: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
    border: `${rem(1)} solid transparent`,
    position: "relative",
    zIndex: 0,
    transition: "transform 150ms ease",

    "&[data-active]": {
      transform: "scale(1.03)",
      backgroundColor:
        theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
      boxShadow: theme.shadows.md,
      borderColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[2],
      borderRadius: theme.radius.md,
      zIndex: 1,
    },
  },

  chevron: {
    "&[data-rotate]": {
      transform: "rotate(-90deg)",
    },
  },
}));

interface CarouselProps {
  crew: Cast[];
  cast: Cast[];
}

const CreditsList: React.FC<CarouselProps> = (props) => {
  const { crew, cast } = props;
  const { classes, theme } = useStyles();
  const router = useRouter();

  const crewGrouped = Object.entries(_.groupBy(crew, "job"));
  console.log(crew, cast);

  if (!crew.length && !cast.length) return null;

  const orderedCast = cast.map((item) => {
    return {
      ...item,
      release_date: yearFormat(
        item.release_date || item.first_air_date || "Unknown"
      ),
    };
  });

  const handleRouting = (id: number, mediaType?: string) => {
    if (!id || !mediaType) {
      notifications.show({
        title: "Error",
        message: "Something went wrong",
        color: "red",
      });
      return;
    }
    void router.push(`/discover/${mediaType}/${id}`);
  };

  return (
    <>
      <Title my={theme.spacing.xl}>Credits</Title>
      <Accordion
        w="100%"
        mx="auto"
        variant="filled"
        classNames={classes}
        className={classes.root}
      >
        <Accordion.Item value="Actor">
          <Accordion.Control>Actor</Accordion.Control>
          <Accordion.Panel>
            <ScrollArea.Autosize mah={400}>
              {_.orderBy(orderedCast, "release_date", "desc").map((movie) => (
                <Group key={movie.id}>
                  <Text c="dimmed">{yearFormat(movie.release_date)}</Text>
                  <Anchor
                    onClick={() => handleRouting(movie.id, movie.media_type)}
                  >
                    {movie.original_name || movie.original_title}
                  </Anchor>

                  <Text fw="bold" tt="capitalize" c="dimmed">
                    as {movie.character}
                  </Text>
                  <Text tt="capitalize" c="dimmed">
                    ({movie.media_type})
                  </Text>
                </Group>
              ))}
            </ScrollArea.Autosize>
          </Accordion.Panel>
        </Accordion.Item>
        {crewGrouped.map((group) => {
          const [job, content] = group;
          return (
            <Accordion.Item key={job} value={job}>
              <Accordion.Control>{job}</Accordion.Control>
              <Accordion.Panel>
                {content.map((movie) => (
                  <Group key={movie.id}>
                    <Text c="dimmed">
                      {yearFormat(
                        movie.release_date || movie.first_air_date || "Unknown"
                      )}
                    </Text>
                    <Anchor
                      onClick={() => handleRouting(movie.id, movie.media_type)}
                    >
                      {movie.original_name || movie.original_title}
                    </Anchor>
                    <Text tt="capitalize" c="dimmed">
                      ({movie.media_type})
                    </Text>
                  </Group>
                ))}
              </Accordion.Panel>
            </Accordion.Item>
          );
        })}
      </Accordion>
    </>
  );
};

export default CreditsList;
