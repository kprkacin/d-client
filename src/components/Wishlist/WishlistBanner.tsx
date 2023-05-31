/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { posterSizes } from "@/utils/consts";
import { Box, Image, createStyles, rem } from "@mantine/core";
import React from "react";

type Props = {
  item: any;
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

  const { classes } = useStyles();
  return (
    <Box className={classes.box} w={300}>
      {item?.wishlistRecords
        .filter((r: { image: any }) => r.image)
        .map((record: any) => (
          <Image
            src={`https://image.tmdb.org/t/p/${posterSizes.w500}/${record?.image}`}
            alt="Watchlist Banner"
            className={classes.image}
            key={record.id}
          />
        ))}
    </Box>
  );
};

export default WishlistBanner;
