import {
  ActionIcon,
  Affix,
  Group,
  Paper,
  Stack,
  TextInput,
  createStyles,
  rem,
} from "@mantine/core";
import React from "react";
import TextBubble from "./TextBubble";
import { IconSend } from "@tabler/icons-react";
import MovieRecommendationCard from "./Recommendations/MovieRecommendationCard";
import RecommendationCarausel from "./Recommendations/RecommendationCarausel";
import { useSession } from "next-auth/react";
import { api } from "@/utils/api";

const useStyles = createStyles((theme) => ({
  paper: {
    backgroundColor: "rgba( 255, 255, 255,1 );",
    boxShadow: `0 8px 16px 0 ${
      theme.colors.slate?.[0] || theme.colors.blue[0]
    }`,
    // backdropFilter: 'blur( 12px )',
    // WebkitBackdropFilter: 'blur( 12px )',
    // borderRadius: '10px',
    // border: '1px solid rgba( 255, 255, 255, 0.18 )',
  },
}));

type Props = {};

const ChatBox = (props: Props) => {
  const mutation = api.chat.ask.useMutation();
  const chats = api.chat.allChats.useQuery();
  const chat = api.chat.byId.useQuery({ id: "cli5w0av90006s8yfkfx9ley5" });

  console.log(chats.data, chat.data);

  const { classes, theme, cx } = useStyles();
  const { data: session, status } = useSession();

  const [message, setMessage] = React.useState("");
  const ask = (question: string) => {
    try {
      const resp = mutation.mutate({
        query: question,
        // chatSessionId: "cli5w0av90006s8yfkfx9ley5",
      });
    } catch (error) {
      console.error(error);
    }
  };
  console.log("response", mutation);
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
            position: "relative",
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
