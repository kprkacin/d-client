/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createStyles, Box, Text, Group, rem, Paper } from "@mantine/core";
import { IconListSearch } from "@tabler/icons-react";

const LINK_HEIGHT = 38;
const INDICATOR_SIZE = 10;
const INDICATOR_OFFSET = (LINK_HEIGHT - INDICATOR_SIZE) / 2;

const mock = [
  {
    label: "Trending All",
    order: 1,
  },
  {
    label: "Popular People",
    header: "People",
    order: 1,
  },
  {
    label: "Trending Movies",
    header: "Movies",
    order: 1,
  },
  {
    label: "Popular Movies",
    order: 1,
  },
  {
    label: "Top Rated Movies",
    order: 1,
  },
  {
    label: "Now Playing Movies",

    order: 1,
  },
  {
    label: "Trending TV",
    header: "TV",
    order: 1,
  },
  {
    label: "Popular TV",
    order: 1,
  },
  {
    label: "Top Rated TV",
    order: 1,
  },
  {
    label: "On The Air TV",
    order: 1,
  },
  {
    label: "Airing Today TV",
    order: 1,
  },
];

const useStyles = createStyles((theme) => ({
  link: {
    ...theme.fn.focusStyles(),
    display: "block",
    textDecoration: "none",
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
    lineHeight: rem(LINK_HEIGHT),
    fontSize: theme.fontSizes.sm,
    height: rem(LINK_HEIGHT),
    borderTopRightRadius: theme.radius.sm,
    borderBottomRightRadius: theme.radius.sm,
    borderLeft: `${rem(2)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  linkActive: {
    fontWeight: 500,
    color:
      theme.colors[theme.primaryColor]![theme.colorScheme === "dark" ? 3 : 7],
  },

  links: {
    position: "relative",
  },

  indicator: {
    transition: "transform 150ms ease",
    border: `${rem(2)} solid ${
      theme.colors[theme.primaryColor]![theme.colorScheme === "dark" ? 3 : 7]
    }`,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    height: rem(INDICATOR_SIZE),
    width: rem(INDICATOR_SIZE),
    borderRadius: rem(INDICATOR_SIZE),
    position: "absolute",
    left: `calc(-${rem(INDICATOR_SIZE)} / 2 + ${rem(1)})`,
  },
}));

interface TableOfContentsFloatingProps {
  active: number;
  setActive: (index: number) => void;
}

const DiscoverTOC: React.FC<TableOfContentsFloatingProps> = ({
  active,
  setActive,
}) => {
  const { classes, cx } = useStyles();

  const links = mock;

  const items = links.map((item, index) => {
    return (
      <Box<"a">
        component="a"
        onClick={(event) => {
          event.preventDefault();
          setActive(index);
        }}
        key={item.label}
        className={cx(classes.link, { [classes.linkActive]: active === index })}
        sx={(theme) => ({
          paddingLeft: `calc(${item.order} * ${theme.spacing.lg})`,
        })}
      >
        {item.label}
      </Box>
    );
  });

  return (
    <Paper>
      <Group mb="md">
        <IconListSearch size="1.1rem" stroke={1.5} />
        <Text>Discover</Text>
      </Group>
      <div className={classes.links}>
        <div
          className={classes.indicator}
          style={{
            transform: `translateY(${rem(
              active * LINK_HEIGHT + INDICATOR_OFFSET
            )})`,
          }}
        />
        {items}
      </div>
    </Paper>
  );
};

export default DiscoverTOC;
