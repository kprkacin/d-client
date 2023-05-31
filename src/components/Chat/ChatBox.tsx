import {
  ActionIcon,
  Box,
  Center,
  LoadingOverlay,
  Paper,
  ScrollArea,
  Stack,
  TextInput,
  createStyles,
} from "@mantine/core";
import React from "react";
import TextBubble from "./TextBubble";
import { IconSend } from "@tabler/icons-react";
import { api } from "@/utils/api";
import RecommendationCarousel from "./Recommendations/RecommendationCarousel";
import { useSession } from "next-auth/react";

const useStyles = createStyles((theme) => ({
  paper: {
    // boxShadow: `0 8px 16px 0 ${theme.colors.dark[8]}`,
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[9]
        : theme.colors.gray[0],
    overflow: "hidden",
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
  const ref = React.useRef(null);
  const { id } = props;
  const chat = api.chat.byId.useQuery({ id });

  const { mutate: queryAsk, isLoading } = api.chat.ask.useMutation({
    onError: () => {
      console.error("Error deleting comment");
    },
    onSuccess: () => {
      //
    },
    onSettled: () => {
      void chat.refetch();
    },
  });

  console.log(chat.isInitialLoading);

  const { classes, theme } = useStyles();
  const { data } = useSession();

  const [message, setMessage] = React.useState("");
  const ask = (question: string) => {
    setMessage("");
    try {
      queryAsk({
        query: question,
        chatSessionId: id,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Paper
      shadow="md"
      radius="lg"
      miw="100%"
      p="20px"
      className={classes.paper}
    >
      <ScrollArea.Autosize h="90vh" ref={ref}>
        <Center>
          <Stack justify="space-between">
            {!chat.isInitialLoading && (
              <Stack>
                <TextBubble
                  message={greetingMessage}
                  role="assistant"
                  animate={!chat.data?.chatRecords?.length}
                />

                {chat.data?.chatRecords.map((record, idx) => (
                  <>
                    <TextBubble
                      message={record.paragraph}
                      role={record.role || "user"}
                      animate={
                        idx + 1 === chat.data?.chatRecords?.length &&
                        record.role !== "user"
                      }
                      image={data?.user.image}
                    />
                    {record?.fullData &&
                      (record?.fullData as any[])?.length > 0 && (
                        <RecommendationCarousel
                          items={record.fullData as any[]}
                        />
                      )}
                  </>
                ))}
              </Stack>
            )}
          </Stack>
        </Center>
      </ScrollArea.Autosize>
      <Box pos="relative">
        <LoadingOverlay visible={chat.isLoading || isLoading} overlayBlur={2} />

        <TextInput
          mb={0}
          value={message}
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
              <IconSend color={theme.fn.primaryColor()} />
            </ActionIcon>
          }
        />
      </Box>
    </Paper>
  );
};

export default ChatBox;
