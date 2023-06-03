import { Container } from "@mantine/core";
import MovieDetail from "@/components/Discover/DetailsPages/MovieDetail";
import TVDetail from "@/components/Discover/DetailsPages/TVDetail";
import { type MovieDetails, type TVDetails } from "@/types/discoverTypes";
import { api } from "@/utils/api";
import { useRouter } from "next/router";
import { type NextPageWithLayout } from "../_app";

const ChatPage: NextPageWithLayout = () => {
  const router = useRouter();

  const [mediaType = "movie", id = "1"] =
    (router?.query?.slug as string[]) || [];

  const query = api.discover.mediaDetails.useQuery({
    id: Number(id),
    media_type: mediaType,
  });

  const render = () => {
    switch (mediaType) {
      case "movie":
        return (
          <MovieDetail
            data={query.data as MovieDetails}
            isLoading={query.isLoading}
          />
        );
      case "tv":
        return (
          <TVDetail
            data={query.data as TVDetails}
            isLoading={query.isLoading}
          />
        );
    }
  };

  return (
    <Container size="lg">
      {/* {query.data?.title || query.data?.name} */}
      {render()}
    </Container>
  );
};

export default ChatPage;
