import {
  Anchor,
  Button,
  Center,
  Container,
  Grid,
  Group,
  ScrollArea,
  Stack,
  Table,
  Text,
  createStyles,
  rem,
} from "@mantine/core";
import { type NextPageWithLayout } from "../_app";
import { api } from "@/utils/api";
import Link from "next/link";
import { useRouter } from "next/router";
import ChatSpotlight from "@/components/Chat/ChatSpotlight";
import { notifications } from "@mantine/notifications";

const useStyles = createStyles((theme) => ({
  progressBar: {
    "&:not(:first-of-type)": {
      borderLeft: `${rem(3)} solid ${
        theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white
      }`,
    },
  },
}));

const ChatPage: NextPageWithLayout = () => {
  const { data = [], refetch } = api.chat.allChats.useQuery();
  const router = useRouter();

  const { theme } = useStyles();

  const { mutate: createNewChat } = api.chat.newSession.useMutation({
    onError: () => {
      console.error("Error deleting comment");
    },
    onSuccess: (res) => {
      void router.push(`/chat/${res.id}`);
    },
    onSettled: () => {
      // upToDateCommentsQuery.refetch();
    },
  });
  const { mutate: deleteChat } = api.chat.deleteSession.useMutation({
    onError: () => {
      console.error("Error deleting comment");
    },
    onSuccess: (res) => {
      notifications.show({
        title: "Deleted succesfully",
        color: "red",

        message: "Deleted",
      });
    },
    onSettled: () => {
      void refetch();
      // upToDateCommentsQuery.refetch();
    },
  });

  const addNewChat = () => {
    createNewChat();
  };

  const rows = data.map((row) => {
    return (
      <tr key={row.id}>
        <td>
          <Link href={`/chat/${row.id}`}>{row.name}</Link>
        </td>
        <td>
          <Anchor component="button" fz="sm">
            {/* {row.author?.image} */}
            {row.author?.email}
          </Anchor>
        </td>
        <td>{Intl.NumberFormat().format(row.chatRecords.length)}</td>
        <td>
          <Text fz="sm" color={theme.colorScheme === "dark" ? "gray" : "dark"}>
            {row.updatedAt.toDateString()}
          </Text>
        </td>

        <td>
          <Text fz="sm" color={theme.colorScheme === "dark" ? "gray" : "dark"}>
            {row.createdAt.toDateString()}
          </Text>
        </td>
        <td>
          <Button
            variant="outline"
            color="red"
            onClick={() => {
              deleteChat({ id: row.id });
            }}
          >
            Delete
          </Button>
        </td>
      </tr>
    );
  });

  return (
    <Container size="md">
      <Center>
        <Stack>
          <Grid>
            <Grid.Col span={10}>
              <ChatSpotlight />
            </Grid.Col>
            <Grid.Col span={2}>
              {" "}
              <Button onClick={addNewChat}>New Chat</Button>
            </Grid.Col>
          </Grid>
          <ScrollArea>
            <Table sx={{ minWidth: 800 }} verticalSpacing="xs">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Author</th>
                  <th>Number of messages</th>
                  <th>Last Updated</th>
                  <th>Created At</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>{rows}</tbody>
            </Table>
          </ScrollArea>
        </Stack>
      </Center>
    </Container>
  );
};

export default ChatPage;
