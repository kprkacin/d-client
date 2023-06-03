/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { api } from "@/utils/api";
import { Center, Modal } from "@mantine/core";
import React from "react";
import YouTube from "react-youtube";

type Props = {
  opened: boolean;
  onClose: () => void;
  id: number;
  mediaType: string;
};

const TrailerModal = (props: Props) => {
  const { opened, onClose, id, mediaType } = props;
  const query = api.discover.mediaDetails.useQuery({
    id,
    media_type: mediaType,
  });

  const trailer = query.data?.videos?.results?.filter(
    (r: { type: string }) => r.type === "Trailer"
  )?.[0]?.key;
  return (
    <Modal opened={opened} onClose={onClose} title="Trailer" size="xl">
      <Center>
        <YouTube videoId={trailer} />
      </Center>
    </Modal>
  );
};

export default TrailerModal;
