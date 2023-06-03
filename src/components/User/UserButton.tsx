import { useSettings } from "@/hooks/useSettings";
import {
  UnstyledButton,
  type UnstyledButtonProps,
  Group,
  Avatar,
  Text,
  createStyles,
  ActionIcon,
} from "@mantine/core";
import { IconChevronRight, IconPower } from "@tabler/icons-react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

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
  const router = useRouter();
  const { close } = useSettings();

  return (
    <UnstyledButton
      className={classes.user}
      {...others}
      onClick={() => {
        void router.push("/profile");
        close();
      }}
    >
      <Group noWrap>
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
            size="1.2rem"
            stroke={1.5}
            color={theme.fn.primaryColor()}
          />
        )}
        <ActionIcon
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            void signOut({ callbackUrl: "/" });
          }}
        >
          <IconPower color={theme.fn.primaryColor()} />
        </ActionIcon>
      </Group>
    </UnstyledButton>
  );
}
