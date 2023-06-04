/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  type Dispatch,
  type SetStateAction,
  memo,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Carousel, type Embla } from "@mantine/carousel";
import { Progress, Paper, rem, Button } from "@mantine/core";
import MovieRecommendationCard from "./MovieRecommendationCard";
import { useDisclosure } from "@mantine/hooks";
import TrailerModal from "./TrailerModal";

type Props = {
  items: any[];
};
type Props2 = {
  items: any[];
  setEmbla: Dispatch<SetStateAction<any>>;
};

const CarouselComponent = memo((props: Props2) => {
  const { items = [], setEmbla } = props;
  return (
    <Carousel
      dragFree
      slideSize="350"
      slideGap="sm"
      mih={200}
      maw="50rem"
      getEmblaApi={setEmbla}
      initialSlide={0}
    >
      {items.map((item) => (
        <Carousel.Slide
          key={item.id}
          // onClick={(e) => {
          //   e.stopPropagation();
          // }}
        >
          <MovieRecommendationCard item={item} />
        </Carousel.Slide>
      ))}
    </Carousel>
  );
});

const RecommendationCarousel = (props: Props) => {
  const { items = [] } = props;
  const [scrollProgress, setScrollProgress] = useState(0);
  const [opened, { close }] = useDisclosure(false);
  const [openedAccordion, { toggle }] = useDisclosure(false);

  const [embla, setEmbla] = useState<Embla | null>(null);

  const handleScroll = useCallback(() => {
    if (!embla) return;
    const progress = Math.max(0, Math.min(1, embla.scrollProgress()));
    setScrollProgress(progress * 100);
  }, [embla, setScrollProgress]);

  useEffect(() => {
    if (embla) {
      embla.on("scroll", handleScroll);
      handleScroll();
    }
  }, [embla, handleScroll]);

  return (
    <>
      <Button w="100%" mt="md" onClick={toggle}>
        Show Recommendations
      </Button>
      <Paper
        py={40}
        w="100%"
        radius="md"
        sx={{
          visibility: openedAccordion ? "visible" : "hidden",
          height: openedAccordion ? "auto" : 0,
        }}
      >
        <CarouselComponent items={items} setEmbla={setEmbla} />
        <Progress
          value={scrollProgress}
          styles={{
            bar: { transitionDuration: "0ms" },
            root: { maxWidth: rem(450) },
          }}
          size="sm"
          mt="xl"
          mx="auto"
        />
      </Paper>

      <TrailerModal
        opened={opened}
        onClose={close}
        id="58f5210792514127710020ff"
      />
    </>
  );
};

export default RecommendationCarousel;
