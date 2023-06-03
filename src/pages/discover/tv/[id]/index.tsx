import { Container } from "@mantine/core";
import { type NextPageWithLayout } from "../../../_app";
import { useRouter } from "next/router";
import { api } from "@/utils/api";
import { type TVDetails } from "@/types/discoverTypes";
import TVDetail from "@/components/Discover/DetailsPages/TVDetail";

const TVPage: NextPageWithLayout = () => {
  const router = useRouter();

  const id = router?.query?.id;

  const query = api.discover.mediaDetails.useQuery({
    id: Number(id),
    media_type: "tv",
  });

  return (
    <Container size="lg">
      <TVDetail data={query.data as TVDetails} isLoading={query.isLoading} />
    </Container>
  );
};

export default TVPage;
