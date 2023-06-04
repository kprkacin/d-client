import {
  type WishlistRecord,
  type WishlistWithImage,
} from "@/types/wishlistTypes";
import { dateFormat } from "@/utils/helpers";
import {
  Center,
  Text,
  Group,
  Modal,
  ScrollArea,
  useMantineTheme,
  Stack,
  Avatar,
  Paper,
  Badge,
  Divider,
} from "@mantine/core";
import _ from "lodash";
import React, { useMemo } from "react";
import { CompareSegment } from "./CompareSegment";

type Props = {
  data: WishlistWithImage[];
  selection: string[];
  opened: boolean;
  onClose: () => void;
};

const WishlistCompareModal = (props: Props) => {
  const { selection = [], data = [], opened, onClose } = props;
  const theme = useMantineTheme();

  const compared = useMemo(
    () => data.filter((item) => selection.includes(item.id)),
    [data, selection]
  );

  const compareWishlistRecords = (
    a: WishlistRecord[] = [],
    b: WishlistRecord[] = []
  ) => {
    return _.intersectionBy(a, b, "mediaId").length / a.length;
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      fullScreen
      transitionProps={{ transition: "fade", duration: 200 }}
    >
      <Center h="100vh" w="100vw">
        <ScrollArea.Autosize mah="80vh" maw={"90vw"}>
          <Group noWrap maw="90vw" h="100%" px={theme.spacing.xl} align="start">
            {compared.map((item) => (
              <Paper key={item.id} w="30%" withBorder p={theme.spacing.xl}>
                <Stack w="100%">
                  <Group noWrap>
                    <Avatar src={item?.author?.image} radius="xl" />

                    <div style={{ flex: 1 }}>
                      <Text size="sm" weight={500}>
                        {item?.author?.name}
                      </Text>

                      <Text color="dimmed" size="xs">
                        {item?.author?.email}
                      </Text>
                    </div>
                  </Group>
                  <Divider />
                  <Text size="lg" weight={500}>
                    {item.name}
                  </Text>
                  <Divider />
                  {item.description && (
                    <>
                      <Text color="dimmed" size="sm">
                        {item.description}
                      </Text>
                      <Divider />
                    </>
                  )}
                  {item.genre.length > 0 && (
                    <>
                      <Group>
                        {item.genre?.map((genre) => (
                          <Badge key={genre} variant="outline">
                            {genre}
                          </Badge>
                        ))}
                      </Group>
                      <Divider />
                    </>
                  )}
                  <Group>
                    <Text c="dimmed" fw="bold">
                      Created at:
                    </Text>
                    <Text>{dateFormat(item.createdAt)}</Text>
                  </Group>
                  <Group>
                    <Text c="dimmed" fw="bold">
                      Favorite media type:
                    </Text>
                    <Text fw="italic" tt="uppercase">
                      {
                        Object.entries(
                          _.groupBy(compared?.[1]?.wishlistRecords, "mediaType")
                        )?.sort((a, b) => b[1].length - a[1].length)?.[0]?.[0]
                      }
                    </Text>
                  </Group>
                  <CompareSegment
                    similarityData={compared
                      .filter((comp) => item.id !== comp.id)
                      .map((comp) => {
                        return {
                          label: comp.name,
                          diff: compareWishlistRecords(
                            item.wishlistRecords as WishlistRecord[],
                            comp.wishlistRecords as WishlistRecord[]
                          ),
                        };
                      })}
                    data={Object.entries(
                      _.groupBy(compared?.[1]?.wishlistRecords, "mediaType")
                    ).map(([key, value]) => ({
                      label: key,
                      count: value.length.toString(),
                    }))}
                  />
                </Stack>
              </Paper>
            ))}
          </Group>
        </ScrollArea.Autosize>
      </Center>
    </Modal>
  );
};

export default WishlistCompareModal;
