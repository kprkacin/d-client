import {
  Anchor,
  Button,
  Center,
  Container,
  Grid,
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
import { useMediaQuery } from "@mantine/hooks";

const useStyles = createStyles((theme) => ({
  label: {
    color: theme.colorScheme === "dark" ? theme.white : theme.colors.gray[7],
  },
}));

const ChatPage: NextPageWithLayout = () => {
  const { data = [], refetch } = api.chat.allChats.useQuery();
  const router = useRouter();
  const { classes, theme } = useStyles();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);

  const { mutate: createNewChat } = api.chat.newSession.useMutation({
    onError: (err) => {
      notifications.show({
        title: err.data?.code,
        message: err.message,
        color: "red",
      });
    },
    onSuccess: (res) => {
      void router.push(`/chat/${res.id}`);
    },
    onSettled: () => {
      // upToDateCommentsQuery.refetch();
    },
  });
  const { mutate: deleteChat } = api.chat.deleteSession.useMutation({
    onError: (err) => {
      notifications.show({
        title: err.data?.code,
        message: err.message,
        color: "red",
      });
    },
    onSuccess: () => {
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
        {!mobile && (
          <>
            <td>
              <Anchor component="button" fz="sm">
                {/* {row.author?.image} */}
                {row.author?.email}
              </Anchor>
            </td>
            <td>{Intl.NumberFormat().format(row.chatRecords.length)}</td>
            <td>
              <Text
                fz="sm"
                color={theme.colorScheme === "dark" ? "gray" : "dark"}
              >
                {row.updatedAt.toDateString()}
              </Text>
            </td>
            <td>
              <Text
                fz="sm"
                color={theme.colorScheme === "dark" ? "gray" : "dark"}
              >
                {row.createdAt.toDateString()}
              </Text>
            </td>
          </>
        )}
        <td>
          <Button
            variant="outline"
            color="red"
            classNames={{
              root: classes.label,
            }}
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
            <Grid.Col span={8} sm={10}>
              <ChatSpotlight />
            </Grid.Col>
            <Grid.Col span={4} md={2}>
              <Button onClick={addNewChat}>New Chat</Button>
            </Grid.Col>
          </Grid>
          <ScrollArea>
            <Table verticalSpacing="xs">
              <thead>
                <tr>
                  <th>Name</th>
                  {!mobile && (
                    <>
                      <th>Author</th>
                      <th>Number of messages</th>
                      <th>Last Updated</th>
                      <th>Created At</th>
                    </>
                  )}
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
