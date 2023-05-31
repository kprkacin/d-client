import {
  UnstyledButton,
  type UnstyledButtonProps,
  Group,
  Avatar,
  Text,
  createStyles,
} from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import { useSession } from "next-auth/react";

const useStyles = createStyles((theme) => ({
  user: {
    display: "block",
    width: "100%",
    padding: theme.spacing.md,
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[8]
          : theme.colors.gray[0],
    },
  },
}));

interface UserButtonProps extends UnstyledButtonProps {
  icon?: React.ReactNode;
}

export function UserButton({ icon, ...others }: UserButtonProps) {
  const { classes, theme } = useStyles();
  const { data } = useSession();

  return (
    <UnstyledButton className={classes.user} {...others}>
      <Group>
        <Avatar src={data?.user.image} radius="xl" />

        <div style={{ flex: 1 }}>
          <Text size="sm" weight={500}>
            {data?.user.name}
          </Text>

          <Text color="dimmed" size="xs">
            {data?.user.email}
          </Text>
        </div>

        {icon || (
          <IconChevronRight
            size="0.9rem"
            stroke={1.5}
            color={theme.fn.primaryColor()}
          />
        )}
      </Group>
    </UnstyledButton>
  );
}
