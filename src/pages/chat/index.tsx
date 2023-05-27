import {
  Anchor,
  Center,
  Container,
  ScrollArea,
  Table,
  Text,
  Title,
  createStyles,
  rem,
} from "@mantine/core";
import { type NextPageWithLayout } from "../_app";
import { api } from "@/utils/api";
import Link from "next/link";

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
  const { data = [] } = api.chat.allChats.useQuery();

  const { classes, theme } = useStyles();

  const rows = data.map((row) => {
    return (
      <tr key={row.name}>
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
      </tr>
    );
  });

  return (
    <Container size="md">
      <Center h="100vh">
        <ScrollArea>
          <Table sx={{ minWidth: 800 }} verticalSpacing="xs">
            <thead>
              <tr>
                <th>Name</th>
                <th>Author</th>
                <th>Number of messages</th>
                <th>Last Updated</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        </ScrollArea>
      </Center>
    </Container>
  );
};

export default ChatPage;
