import { useWatched } from "@/hooks/useWatched";
import { Tooltip, ActionIcon, useMantineTheme } from "@mantine/core";
import { IconCircleCheck, IconCircleCheckFilled } from "@tabler/icons-react";
import React from "react";

type Props = {
  id: string;
};

const ToggleWatchedButton = (props: Props) => {
  const { id } = props;
  const { hasBeenWatched, toggleWatched } = useWatched();
  const theme = useMantineTheme();
  const handleClick = () => {
    toggleWatched(id);
  };
  return (
    <Tooltip
      label={hasBeenWatched(id) ? "Mark as Unwatched" : "Mark as Watched"}
    >
      <ActionIcon variant="subtle" size={32} onClick={handleClick}>
        {hasBeenWatched(id) ? (
          <IconCircleCheckFilled
            style={{
              color: theme.fn.primaryColor(),
            }}
            color={theme.fn.primaryColor()}
            size="2rem"
          />
        ) : (
          <IconCircleCheck color={theme.fn.primaryColor()} size="2rem" />
        )}
      </ActionIcon>
    </Tooltip>
  );
};

export default ToggleWatchedButton;
