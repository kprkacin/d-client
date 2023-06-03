/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { WishlistDetails } from "@/types/wishlistTypes";
import { posterSizes } from "@/utils/consts";
import {
  Container,
  Grid,
  SimpleGrid,
  Box,
  Image,
  createStyles,
  rem,
  Skeleton,
  Stack,
  Group,
} from "@mantine/core";
import React from "react";

const PRIMARY_COL_HEIGHT = rem(450);

type Props = {
  item: WishlistDetails;
};

const useStyles = createStyles((theme) => ({
  box: {
    display: "grid",
    gridTemplateColumns: "repeat(12, 1fr)",
    position: "relative",
  },
  image: {
    gridColumn: "1 / span 12",
    gridRow: "1",
    zIndex: 997,
    [`&:nth-of-type(2)`]: {
      gridColumn: "1 / span 11",
      zIndex: 998,
    },
    [`&:nth-of-type(3)`]: {
      gridColumn: "1 / span 10",
      zIndex: 999,
    },
  },
}));

const WishlistBanner = (props: Props) => {
  const { item } = props;

  const { classes, theme } = useStyles();
  const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2)`;

  return (
    <Group w="100%" grow spacing={0}>
      <Box w="45%">
        <Image
          src={`https://image.tmdb.org/t/p/${posterSizes.w500}/${item?.wishlistRecords?.[0]?.media?.image}`}
          alt="Watchlist Banner"
          height={PRIMARY_COL_HEIGHT}
          fit="cover"
          className={classes.image}
        />
      </Box>
      <Stack w="45%" spacing={0} h={PRIMARY_COL_HEIGHT}>
        <Image
          src={`https://image.tmdb.org/t/p/${posterSizes.w500}/${item?.wishlistRecords?.[1]?.media?.image}`}
          alt="Watchlist Banner"
          height={SECONDARY_COL_HEIGHT}
          fit="cover"
          className={classes.image}
        />
        <Image
          src={`https://image.tmdb.org/t/p/${posterSizes.w500}/${item?.wishlistRecords?.[2]?.media?.image}`}
          alt="Watchlist Banner"
          fit="cover"
          height={SECONDARY_COL_HEIGHT}
          className={classes.image}
        />
      </Stack>
    </Group>
  );
};

export default WishlistBanner;
