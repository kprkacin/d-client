/* eslint-disable @typescript-eslint/no-empty-function */

import {
  Avatar,
  Container,
  Paper,
  Stack,
  TextInput,
  createStyles,
  Center,
  rem,
} from "@mantine/core";
import { IconAt } from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import { type NextPageWithLayout } from "../_app";

const useStyles = createStyles((theme) => ({
  main: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[9]
        : theme.colors.gray[0],

    width: "100%",
  },
  stack: {
    width: "60%",
    [theme.fn.smallerThan("sm")]: {
      width: "100%",
    },
  },
}));

const DiscoverPage: NextPageWithLayout = () => {
  const { classes } = useStyles();

  const { data } = useSession();

  return (
    <Container fluid>
      <Center h="60vh">
        <Stack className={classes.stack}>
          <Paper
            shadow="xs"
            radius="md"
            py={rem(100)}
            px="xl"
            className={classes.main}
          >
            <Avatar m="auto" size={128} src={data?.user.image} />

            <TextInput
              label="Name"
              value={data?.user.name || ""}
              name="username"
              disabled
              p={8}
            />

            <TextInput
              label="Email"
              value={data?.user.email || ""}
              name="email"
              icon={<IconAt size={20} />}
              disabled
              p={8}
            />
          </Paper>
        </Stack>
      </Center>
    </Container>
  );
};

export default DiscoverPage;
