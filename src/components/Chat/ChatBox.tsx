/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { notifications } from "@mantine/notifications";
import { getHotkeyHandler } from "@mantine/hooks";

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
  stack: {
    [theme.fn.smallerThan("lg")]: {
      maxWidth: "50vw",
    },
    [theme.fn.smallerThan("sm")]: {
      maxWidth: "75vw",
    },

    [theme.fn.largerThan("lg")]: {
      maxWidth: "70vw",
    },
  },
}));

type Props = {
  id: string;
};

const greetingMessage =
  "Greetings! As a film and TV recommendation expert, I'm here to provide you with valuable insights and suggestions on the best movies and TV shows to suit your preferences. With a vast knowledge of various genres, eras, and styles, I can assist you in finding captivating entertainment options. Whether you're in the mood for thrilling action, heartwarming dramas, or side-splitting comedies, I've got you covered. Just let me know your preferences, and I'll curate a tailored list of recommendations to enhance your viewing experience. Get ready to explore the fascinating world of cinema and television with my expert guidance!";

const ChatBox = (props: Props) => {
  const { id } = props;
  const chat = api.chat.byId.useQuery({ id });

  const {
    mutate: updateRecoommendations,
    isLoading: isLoadingRecommendations,
  } = api.chat.updateChatRecordRecommedations.useMutation({
    onError: (err) => {
      notifications.show({
        title: err.data?.code,
        message: err.message,
        color: "red",
      });
    },
    onSuccess: () => {
      //
    },
    onSettled: () => {
      void chat.refetch();
    },
  });
  const { mutate: queryAsk, isLoading } = api.chat.ask.useMutation({
    onError: (err) => {
      notifications.show({
        title: err.data?.code,
        message: err.message,
        color: "red",
      });
      console.error(err.message);
    },
    onSuccess: (res) => {
      updateRecoommendations({ chatRecordId: res.id });
    },
    // onSettled: () => {
    //   void chat.refetch();
    // },
  });

  const { classes, theme } = useStyles();
  const { data } = useSession();

  const [message, setMessage] = React.useState("");

  const handleFocus = () => {
    document.getElementById("mobile-nav")?.style.display = "none";
    console.log("Keyboard is open");
  };

  const handleBlur = () => {
    document.getElementById("mobile-nav")?.style.display = "block";
    console.log("Keyboard is closed");
  };

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
      <Center component={ScrollArea} h="85vh">
        {!chat.isInitialLoading && (
          <Stack maw="70vw" className={classes.stack}>
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
                    <RecommendationCarousel items={record.fullData as any[]} />
                  )}
              </>
            ))}
          </Stack>
        )}
      </Center>
      <Box pos="relative">
        <LoadingOverlay
          visible={chat.isLoading || isLoading || isLoadingRecommendations}
          overlayBlur={2}
        />

        <TextInput
          mb={theme.spacing.lg}
          value={message}
          style={{
            position: "relative",
            bottom: 0,
          }}
          onChange={(event) => {
            setMessage(event.currentTarget.value);
          }}
          handleFocus={handleFocus}
          handleBlur={handleBlur}
          onKeyDown={getHotkeyHandler([["Enter", () => ask(message)]])}
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
