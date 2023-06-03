import { Container } from "@mantine/core";
import { useRouter } from "next/router";
import { api } from "@/utils/api";
import { type SeasonDetails } from "@/types/discoverTypes";
import { type NextPageWithLayout } from "@/pages/_app";
import SeasonDetail from "@/components/Discover/DetailsPages/SeasonDetail";

const SeasonPage: NextPageWithLayout = () => {
  const router = useRouter();

  const { id, seasonNum } = router?.query;

  const query = api.discover.getSingleTVSeasonDetails.useQuery({
    id: Number(id),
    seasonNum: Number(seasonNum),
  });

  return (
    <Container size="lg">
      <SeasonDetail
        data={query.data as SeasonDetails}
        isLoading={query.isLoading}
      />
    </Container>
  );
};

export default SeasonPage;
