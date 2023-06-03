import { Container } from "@mantine/core";
import { type NextPageWithLayout } from "../../_app";
import { useRouter } from "next/router";
import { api } from "@/utils/api";
import { type PersonDetails } from "@/types/discoverTypes";
import PersonDetail from "@/components/Discover/DetailsPages/PersonDetail";

const TVPage: NextPageWithLayout = () => {
  const router = useRouter();

  const id = router?.query?.id;

  const query = api.discover.mediaDetails.useQuery({
    id: Number(id),
    media_type: "person",
  });

  return (
    <Container size="lg">
      <PersonDetail
        data={query.data as PersonDetails}
        isLoading={query.isLoading}
      />
    </Container>
  );
};

export default TVPage;
