/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Paper,
  Stack,
  TextInput,
  Text,
  MultiSelect,
  Button,
  useMantineTheme,
  Modal,
  Group,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useEffect, useState } from "react";
import { type Comment } from "@/types/commentTypes";
import { TextEditor } from "@/components/RichTextEditor";

type Props = {
  initialData: Comment;
  handleSubmit: (id: string) => (values: any) => void;
  onClose: () => void;
};

const CommentsEditModal = (props: Props) => {
  const { initialData, handleSubmit, onClose } = props;

  const [tags, setTags] = useState(() =>
    Array.from(
      new Set([
        "Great",
        "Awesome",
        "Amazing",
        "Terrific",
        "Wonderful",
        "Awful",
        "Terrible",
        "Bad",
        "Atrocious",
        ...initialData.tags,
      ])
    )
  );

  const form = useForm({
    initialValues: {
      title: "",
      content: "",
      tags: ["Great"],
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

  const theme = useMantineTheme();

  useEffect(() => {
    form.setValues({
      title: initialData.title,
      content: initialData.content || "",
      tags: initialData.tags || [],
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialData]);

  return (
    <Modal
      size="lg"
      opened={!!initialData}
      onClose={onClose}
      title="Edit"
      centered
    >
      <Paper
        w="100%"
        my={theme.spacing.xl}
        py={theme.spacing.sm}
        px={theme.spacing.lg}
      >
        <form onSubmit={form.onSubmit(handleSubmit(initialData.id))}>
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
            <Button type="submit">Update</Button>
          </Stack>
        </form>
      </Paper>
    </Modal>
  );
};

export default CommentsEditModal;
