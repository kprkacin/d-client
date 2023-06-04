import { api } from "@/utils/api";
import React, { useCallback, useState } from "react";
import { CommentDisplay } from "./Comment";
import {
  Center,
  Paper,
  Stack,
  TextInput,
  MultiSelect,
  Text,
  Button,
  useMantineTheme,
  Title,
  Group,
  ScrollArea,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { type Comment } from "@/types/commentTypes";
import CommentsEditModal from "./CommentsEditModal";
import { TextEditor } from "@/components/RichTextEditor";

type Props = {
  mediaId: string;
};

const Comments = (props: Props) => {
  const { mediaId } = props;

  const [commentToEdit, setCommentToEdit] = useState<Comment | null>(null);

  const form = useForm({
    initialValues: {
      title: "",
      content: "",
      tags: [],
    },

    validate: {
      title: (value: string) => {
        if (!value) {
          return "Title is required";
        }
        return false;
      },
      content: (value: string) => {
        if (!value) {
          return "Content is required";
        }
        return false;
      },
    },
  });

  type FormValues = typeof form.values;

  const { data, refetch } = api.comment.getMediaComments.useQuery({
    id: mediaId,
  });

  const { mutate: upsertComment } = api.comment.upsertComment.useMutation({
    onError: () => {
      console.error("Error");
    },
    onSuccess: () => {
      notifications.show({
        title: "",
        color: "green",
        message: "Comment created",
      });
      form.reset();
      setCommentToEdit(null);
    },
    onSettled: () => {
      void refetch();
    },
  });

  const { mutate: deleteComment } = api.comment.deleteComment.useMutation({
    onError: () => {
      console.error("Error deleting comment");
    },
    onSuccess: () => {
      notifications.show({
        title: "",
        color: "red",
        message: "Comment deleted",
      });
    },

    onSettled: () => {
      void refetch();
    },
  });

  const createOrEditComment = useCallback(
    (data: { id: string; title: string; content: string; tags: string[] }) => {
      upsertComment(data);
    },
    [upsertComment]
  );

  const removeComment = useCallback(
    (id: string) => {
      deleteComment({ id });
    },
    [deleteComment]
  );

  const [tags, setTags] = useState([
    "Great",
    "Awesome",
    "Amazing",
    "Terrific",
    "Wonderful",
    "Awful",
    "Terrible",
    "Bad",
    "Atrocious",
  ]);
  const theme = useMantineTheme();

  const handleSubmit = (id: string) => (values: FormValues) => {
    createOrEditComment({ ...values, id });
  };

  const handleEditClicked = (data: Comment) => {
    setCommentToEdit(data);
  };

  return (
    <Center my={theme.spacing.xl}>
      <Stack w="100%">
        <Title>Leave a review</Title>
        <Paper
          mb={theme.spacing.xl}
          w="100%"
          py={theme.spacing.sm}
          px={theme.spacing.lg}
        >
          <form onSubmit={form.onSubmit(handleSubmit(mediaId))}>
            <Stack w={"100%"}>
              <TextInput
                placeholder="Comment Title"
                label="Title"
                withAsterisk
                {...form.getInputProps("title")}
              />

              <Stack spacing={0}>
                <Group spacing={2}>
                  <Text fw={500} fz="sm">
                    Content
                  </Text>
                  <Text color="red.4">*</Text>
                </Group>
                <TextEditor {...form.getInputProps("content")} />
              </Stack>

              <MultiSelect
                data={tags}
                label="Tags"
                placeholder="Pick all that apply"
                clearButtonProps={{ "aria-label": "Clear selection" }}
                clearable
                searchable
                creatable
                getCreateLabel={(query) => `+ Create ${query}`}
                onCreate={(query) => {
                  setTags((current) => [...current, query]);
                  return query;
                }}
                {...form.getInputProps("tags")}
              />
              <Button type="submit">Save</Button>
            </Stack>
          </form>
        </Paper>
        <Title>Reviews from other users</Title>
        <ScrollArea.Autosize mah={600}>
          <Stack>
            {data?.length === 0 && (
              <Text c="dimmed" fz="sm">
                Be the first to leave a review!
              </Text>
            )}
            {data?.map((comment) => (
              <CommentDisplay
                key={comment.id}
                comment={comment}
                editComment={handleEditClicked}
                removeComment={removeComment}
              />
            ))}
          </Stack>
        </ScrollArea.Autosize>
      </Stack>

      {commentToEdit && (
        <CommentsEditModal
          initialData={commentToEdit}
          onClose={() => setCommentToEdit(null)}
          handleSubmit={handleSubmit}
        />
      )}
    </Center>
  );
};

export default Comments;
