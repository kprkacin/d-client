import { useCallback, useEffect, useState } from 'react';
import { Carousel, Embla } from '@mantine/carousel';
import { Box, Progress, Paper, rem } from '@mantine/core';
import MovieRecommendationCard from './MovieRecommendationCard';

const RecommendationCarausel = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [embla, setEmbla] = useState<Embla | null>(null);

  const handleScroll = useCallback(() => {
    if (!embla) return;
    const progress = Math.max(0, Math.min(1, embla.scrollProgress()));
    setScrollProgress(progress * 100);
  }, [embla, setScrollProgress]);

  useEffect(() => {
    if (embla) {
      embla.on('scroll', handleScroll);
      handleScroll();
    }
  }, [embla, handleScroll]);

  return (
    <Paper py={40} w="100%">
      <Carousel
        dragFree
        slideSize="40%"
        slideGap="sm"
        mih={200}
        getEmblaApi={setEmbla}
        initialSlide={2}
      >
        <Carousel.Slide
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <MovieRecommendationCard />
        </Carousel.Slide>
        <Carousel.Slide>
          <MovieRecommendationCard />
        </Carousel.Slide>
        <Carousel.Slide>
          <MovieRecommendationCard />
        </Carousel.Slide>
        <Carousel.Slide>
          <MovieRecommendationCard />
        </Carousel.Slide>
      </Carousel>
      <Progress
        value={scrollProgress}
        styles={{
          bar: { transitionDuration: '0ms' },
          root: { maxWidth: rem(450) },
        }}
        size="sm"
        mt="xl"
        mx="auto"
      />
    </Paper>
  );
};

export default RecommendationCarausel;
