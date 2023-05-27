import {
  ActionIcon,
  Affix,
  Group,
  Paper,
  Stack,
  TextInput,
  createStyles,
  rem,
} from '@mantine/core';
import React from 'react';
import TextBubble from './TextBubble';
import { IconSend } from '@tabler/icons-react';
import { trpc } from '~/utils/trpc';
import MovieRecommendationCard from './Recommendations/MovieRecommendationCard';
import RecommendationCarausel from './Recommendations/RecommendationCarausel';
import { useSession } from 'next-auth/react';

const useStyles = createStyles((theme) => ({
  paper: {
    backgroundColor: 'rgba( 255, 255, 255,1 );',
    boxShadow: `0 8px 16px 0 ${theme.colors.slate?.[0]}`,
    // backdropFilter: 'blur( 12px )',
    // WebkitBackdropFilter: 'blur( 12px )',
    // borderRadius: '10px',
    // border: '1px solid rgba( 255, 255, 255, 0.18 )',
  },
}));

type Props = {};

const ChatBox = (props: Props) => {
  const utils = trpc.useContext();
  const mutation = trpc.chat.ask.useMutation();

  const { classes, theme, cx } = useStyles();
  const { data: session, status } = useSession();

  const [message, setMessage] = React.useState('');
  const ask = async (question: string) => {
    try {
      const resp = mutation.mutate({
        query: question,
        authorId: '',
        // chatSessionId: '',
      });
      console.log(resp);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Paper shadow="md" miw="100%" mih={600} p="40px" className={classes.paper}>
      <Stack justify="space-between" mih={600}>
        <Stack>
          <TextBubble />
          <TextBubble />
        </Stack>
        <Group>{/* <RecommendationCarausel /> */}</Group>
        <TextInput
          mb={0}
          style={{
            position: 'relative',
            bottom: 0,
          }}
          onChange={(event) => {
            setMessage(event.currentTarget.value);
          }}
          placeholder="Ask"
          rightSection={
            <ActionIcon size="xs" onClick={() => ask(message)}>
              <IconSend />
            </ActionIcon>
          }
        />
      </Stack>
    </Paper>
  );
};

export default ChatBox;
