import { Center, Container, Text, rem } from "@mantine/core";

import { NextPageWithLayout } from "../_app";
import ChatBox from "@/components/Chat/ChatBox";
import { useRouter } from "next/router";

const ChatPage: NextPageWithLayout = () => {
  const router = useRouter();

  return (
    <Container size="md">
      <Center h={`calc(100vh - ${rem(60)})`}>
        <ChatBox id={router.query.id as string} />
      </Center>
    </Container>
  );
};

export default ChatPage;
