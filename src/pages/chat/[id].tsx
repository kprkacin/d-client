import { Center, Container, Text } from "@mantine/core";

import { NextPageWithLayout } from "../_app";
import ChatBox from "@/components/Chat/ChatBox";

const ChatPage: NextPageWithLayout = () => {
  return (
    <Container size="md">
      <Center h="100vh">
        <ChatBox />
      </Center>
    </Container>
  );
};

export default ChatPage;
