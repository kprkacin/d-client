import {
  createStyles,
  Text,
  Avatar,
  Group,
  TypographyStylesProvider,
  Paper,
  rem,
  Title,
  Badge,
  ActionIcon,
} from "@mantine/core";
import { type Comment } from "@/types/commentTypes";
import { dateFormat } from "@/utils/helpers";
import { IconEdit, IconTrashX } from "@tabler/icons-react";

const useStyles = createStyles((theme) => ({
  comment: {
    padding: `${theme.spacing.lg} ${theme.spacing.xl}`,
  },
  title: {
    paddingLeft: rem(54),
    paddingTop: theme.spacing.sm,
  },
  body: {
    paddingLeft: rem(54),
    paddingTop: theme.spacing.sm,
    fontSize: theme.fontSizes.sm,
  },

  content: {
    "& > p:last-child": {
      marginBottom: 0,
    },
  },
}));

interface CommentProps {
  comment: Comment;
  editComment: (data: Comment) => void;
  removeComment: (id: string) => void;
}

export function CommentDisplay(props: CommentProps) {
  const { comment, editComment, removeComment } = props;
  const { author, content, tags, title, updatedAt } = comment;
  const { classes, theme } = useStyles();
  return (
    <Paper withBorder radius="md" className={classes.comment}>
      <Group position="apart" noWrap>
        <Group>
          <Avatar src={author?.image} alt={author?.name || ""} radius="xl" />
          <div>
            <Text fz="sm">{author?.name}</Text>
            <Text fz="xs" c="dimmed">
              {dateFormat(updatedAt)}
            </Text>
          </div>
          <Group spacing={8} maw={"50%"}>
            {tags?.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </Group>
        </Group>
        <Group noWrap>
          <ActionIcon size="lg" onClick={() => editComment(comment)}>
            <IconEdit color={theme.fn.primaryColor()} size={28} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" onClick={() => removeComment(comment.id)}>
            <IconTrashX color="red" size={28} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Group>
      <Title className={classes.title} order={3}>
        {title}
      </Title>
      <TypographyStylesProvider className={classes.body}>
        <div
          className={classes.content}
          dangerouslySetInnerHTML={{ __html: content || "" }}
        />
      </TypographyStylesProvider>
    </Paper>
  );
}
