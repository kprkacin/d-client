/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Center, Container, Group, rem } from "@mantine/core";

import { type NextPageWithLayout } from "../../_app";
import { useRouter } from "next/router";
import { api } from "@/utils/api";
import MovieDetail from "@/components/Discover/DetailsPages/MovieDetail";
import { MovieDetails, TVDetails } from "@/types/discoverTypes";

const MoviePage: NextPageWithLayout = () => {
  const router = useRouter();

  const id = router?.query?.id;

  const query = api.discover.mediaDetails.useQuery({
    id: Number(id),
    media_type: "movie",
  });

  return (
    <Container size="lg">
      <MovieDetail
        data={query.data as MovieDetails}
        isLoading={query.isLoading}
      />
    </Container>
  );
};

export default MoviePage;
