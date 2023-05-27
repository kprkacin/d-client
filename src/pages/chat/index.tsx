import { Center, Container, Text } from '@mantine/core';
import { trpc } from '~/utils/trpc';
import { NextPageWithLayout } from '../_app';
import ChatBox from '~/components/Chat/ChatBox';

const ChatPage: NextPageWithLayout = () => {
  const utils = trpc.useContext();

  return (
    <Container size="md">
      <Center h="100vh">
        <ChatBox />
      </Center>
    </Container>
  );
};

export default ChatPage;
