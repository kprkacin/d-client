/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Center, Container, rem } from "@mantine/core";

import { type NextPageWithLayout } from "../_app";
import { useRouter } from "next/router";
import { api } from "@/utils/api";

const ChatPage: NextPageWithLayout = () => {
  const router = useRouter();

  const [mediaType = "movie", id = "1"] = router?.query?.slug as string[];

  const query = api.discover.mediaDetails.useQuery({
    id: Number(id),
    media_type: mediaType,
  });

  return (
    <Container size="md">
      <Center h={`calc(100vh - ${rem(60)})`}>
        {query.data?.title || query.data?.name}
      </Center>
    </Container>
  );
};

export default ChatPage;
