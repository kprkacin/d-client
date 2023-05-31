import { type DiscoverMedia } from "@/types/discoverTypes";
import { type Dispatch, type SetStateAction } from "react";

export type DiscoverTab = {
  setActiveRow: Dispatch<SetStateAction<DiscoverMedia | null>>;
};
