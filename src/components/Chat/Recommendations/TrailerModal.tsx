import { Modal } from "@mantine/core";
import React from "react";
import YouTube from "react-youtube";

type Props = {
  opened: boolean;
  onClose: () => void;
  id: string;
};

const TrailerModal = (props: Props) => {
  const { opened, onClose, id } = props;
  return (
    <Modal opened={opened} onClose={onClose} title="Trailer" size="xl">
      <YouTube videoId={"naQr0uTrH_s"} />
    </Modal>
  );
};

export default TrailerModal;
