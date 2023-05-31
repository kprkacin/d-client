import { Paper, Title, LoadingOverlay } from "@mantine/core";
import { api } from "@/utils/api";
import {
  type ForwardRefRenderFunction,
  forwardRef,
  memo,
  useImperativeHandle,
} from "react";
import DiscoverCarousel from "../DiscoverCarousel";
import { type DiscoverTab } from "../types";
import { useDiscoverStyles } from "../consts";
import { useScrollIntoView } from "@mantine/hooks";

const TrendingAll: ForwardRefRenderFunction<unknown, DiscoverTab> = (
  props,
  ref
) => {
  const { setActiveRow } = props;
  const { data, isLoading } = api.discover.trendingAll.useQuery();
  const { classes } = useDiscoverStyles();
  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>({
    offset: 60,
  });

  useImperativeHandle(ref, () => ({
    scrollIntoView: () => scrollIntoView(),
  }));

  return (
    <Paper
      ref={targetRef}
      className={classes.paper}
      px="lg"
      py="md"
      mih={400}
      pos="relative"
    >
      <LoadingOverlay visible={isLoading} overlayBlur={1} />

      <Title mb={12}>Trending</Title>

      <DiscoverCarousel data={data || []} setActiveRow={setActiveRow} />
    </Paper>
  );
};

export default memo(forwardRef(TrendingAll));
