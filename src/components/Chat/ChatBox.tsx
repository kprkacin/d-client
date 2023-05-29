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
    overflow: "scroll",
    // backdropFilter: 'blur( 12px )',
    // WebkitBackdropFilter: 'blur( 12px )',
    // borderRadius: '10px',
    // border: '1px solid rgba( 255, 255, 255, 0.18 )',
  },
}));

type Props = {
  id: string;
};

const greetingMessage =
  "Greetings! As a film and TV recommendation expert, I'm here to provide you with valuable insights and suggestions on the best movies and TV shows to suit your preferences. With a vast knowledge of various genres, eras, and styles, I can assist you in finding captivating entertainment options. Whether you're in the mood for thrilling action, heartwarming dramas, or side-splitting comedies, I've got you covered. Just let me know your preferences, and I'll curate a tailored list of recommendations to enhance your viewing experience. Get ready to explore the fascinating world of cinema and television with my expert guidance!";

const ChatBox = (props: Props) => {
  const { id } = props;
  const mutation = api.chat.ask.useMutation();
  const chat = api.chat.byId.useQuery({ id });

  console.log(chat.data);

  const { classes, theme, cx } = useStyles();
  const { data: session, status } = useSession();

  const [message, setMessage] = React.useState("");
  const ask = (question: string) => {
    try {
      mutation.mutate({
        query: question,
        chatSessionId: id,
      });
    } catch (error) {
      console.error(error);
    }
  };

  console.log("response", mutation);
  return (
    <Paper shadow="md" miw="100%" h={900} p="40px" className={classes.paper}>
      <Stack justify="space-between" mih={600}>
        <Stack>
          <TextBubble message={greetingMessage} />
          {/* {chat.data?.chatRecords.map((record) => (
            <>
              <TextBubble message={record.paragraph} />
              <RecommendationCarausel items={record.fullData as any[]} />{" "}
            </>
          ))} */}
          {/* <TextBubble /> */}
        </Stack>

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
