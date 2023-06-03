import { Container } from "@mantine/core";
import { useRouter } from "next/router";
import { api } from "@/utils/api";
import { type EpisodeDetails } from "@/types/discoverTypes";
import { type NextPageWithLayout } from "@/pages/_app";
import EpisodeDetail from "@/components/Discover/DetailsPages/EpisodeDetail";

const EpisodePage: NextPageWithLayout = () => {
  const router = useRouter();

  const { id, seasonNum, episodeNum } = router?.query;

  const query = api.discover.getSingleEpisodeDetails.useQuery({
    id: Number(id),
    seasonNum: Number(seasonNum),
    episodeNum: Number(episodeNum),
  });

  console.log(id, "test");
  return (
    <Container size="lg">
      <EpisodeDetail
        data={query.data as EpisodeDetails}
        isLoading={query.isLoading}
      />{" "}
    </Container>
  );
};

export default EpisodePage;
