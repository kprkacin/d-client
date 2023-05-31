/* eslint-disable @typescript-eslint/no-empty-function */

import { Affix, Container, Flex, Stack, useMantineTheme } from "@mantine/core";
import { type NextPageWithLayout } from "../_app";
import TrendingAll from "@/components/Discover/DiscoverTabs/TrendingAll";
import DiscoverSpotlight from "@/components/Discover/DiscoverSpotlight";
import { type DiscoverMedia } from "@/types/discoverTypes";
import TrailerModal from "@/components/Discover/TrailerModal";
import { useRef, useState } from "react";
import TrendingMovies from "@/components/Discover/DiscoverTabs/Movies/TrendingMovies";
import PopularMovies from "@/components/Discover/DiscoverTabs/Movies/PopularMovies";
import TopRatedMovies from "@/components/Discover/DiscoverTabs/Movies/TopRatedMovies";
import NowPlayingMovies from "@/components/Discover/DiscoverTabs/Movies/NowPlayingMovies";
import TrendingTV from "@/components/Discover/DiscoverTabs/TV/TrendingTV";
import PopularTV from "@/components/Discover/DiscoverTabs/TV/PopularTV";
import TopRatedTV from "@/components/Discover/DiscoverTabs/TV/TopRatedTV";
import OnTheAirTV from "@/components/Discover/DiscoverTabs/TV/OnTheAirTV";
import AiringTodayTV from "@/components/Discover/DiscoverTabs/TV/AiringTodayTV";
import PopularPeople from "@/components/Discover/DiscoverTabs/PopularPeople";
import DiscoverTOC from "@/components/Discover/DIscoverTOC";
import { useMediaQuery } from "@mantine/hooks";

const DiscoverPage: NextPageWithLayout = () => {
  const [activeRow, setActiveRow] = useState<DiscoverMedia | null>(null);
  const [active, setActive] = useState<number>(1);
  const shareRef = useRef([
    useRef({
      scrollIntoView: () => {},
    }),
    useRef({
      scrollIntoView: () => {},
    }),
    useRef({ scrollIntoView: () => {} }),
    useRef({ scrollIntoView: () => {} }),
    useRef({ scrollIntoView: () => {} }),
    useRef({ scrollIntoView: () => {} }),
    useRef({ scrollIntoView: () => {} }),
    useRef({ scrollIntoView: () => {} }),
    useRef({ scrollIntoView: () => {} }),
    useRef({ scrollIntoView: () => {} }),
    useRef({ scrollIntoView: () => {} }),
  ]);
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  const handleSetActive = (index: number) => {
    setActive(index);
    shareRef.current?.[index]?.current?.scrollIntoView();
  };

  return (
    <Container fluid>
      <Affix position={{ left: mobile ? -300 : 320, top: "10vh" }}>
        <DiscoverTOC active={active} setActive={handleSetActive} />
      </Affix>

      <Flex
        justify={mobile ? "flex-center" : "flex-end"}
        align="center"
        direction="row"
      >
        <Stack w={mobile ? "100%" : "80%"} justify="flex-end">
          <DiscoverSpotlight />
          <TrendingAll setActiveRow={setActiveRow} ref={shareRef.current[0]} />
          <PopularPeople
            setActiveRow={setActiveRow}
            ref={shareRef.current[1]}
          />
          <TrendingMovies
            setActiveRow={setActiveRow}
            ref={shareRef.current[2]}
          />
          <PopularMovies
            setActiveRow={setActiveRow}
            ref={shareRef.current[3]}
          />
          <TopRatedMovies
            setActiveRow={setActiveRow}
            ref={shareRef.current[4]}
          />
          <NowPlayingMovies
            setActiveRow={setActiveRow}
            ref={shareRef.current[5]}
          />
          <TrendingTV setActiveRow={setActiveRow} ref={shareRef.current[6]} />
          <PopularTV setActiveRow={setActiveRow} ref={shareRef.current[7]} />
          <TopRatedTV setActiveRow={setActiveRow} ref={shareRef.current[8]} />
          <OnTheAirTV setActiveRow={setActiveRow} ref={shareRef.current[9]} />
          <AiringTodayTV
            setActiveRow={setActiveRow}
            ref={shareRef.current[10]}
          />
        </Stack>
      </Flex>
      {!!activeRow && (
        <TrailerModal
          opened={!!activeRow}
          id={activeRow?.id}
          mediaType={activeRow.media_type}
          onClose={() => {
            setActiveRow(null);
          }}
        />
      )}
    </Container>
  );
};

export default DiscoverPage;
