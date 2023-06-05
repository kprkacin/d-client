/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useMemo, createContext, useContext, useCallback } from "react";
import { api } from "../utils/api";
import { notifications } from "@mantine/notifications";

type WatchedContextType = {
  hasBeenWatched: (id: string) => boolean;
  toggleWatched: (id: string) => void;
};

const WatchedContext = createContext<WatchedContextType>({
  hasBeenWatched: () => false,
  toggleWatched: () => {},
});

type Props = {
  children?: React.ReactNode;
};

export const WatchedProvider: React.FC<Props> = ({ children }) => {
  const { data = [], refetch } = api.watched.allWatched.useQuery();

  const { mutate: upsertWatchedRecord } =
    api.watched.newWatchedRecord.useMutation({
      onError: (err) => {
        notifications.show({
          title: err.data?.code,
          message: err.message,
          color: "red",
        });
      },
      onSuccess: () => {
        notifications.show({
          title: "",
          color: "green",
          message: "Added to watched",
        });
      },
      onSettled: () => {
        void refetch();
      },
    });

  const { mutate: deleteWatchedRecord } =
    api.watched.deleteWatchedRecord.useMutation({
      onError: (err) => {
        notifications.show({
          title: err.data?.code,
          message: err.message,
          color: "red",
        });
      },
      onSuccess: () => {
        notifications.show({
          title: "",
          color: "red",
          message: "Removed from watchlist",
        });
      },

      onSettled: () => {
        void refetch();
      },
    });

  const hasBeenWatched = useCallback(
    (id: string) => {
      return data.some((watchedRecords) => watchedRecords?.mediaId === id);
    },
    [data]
  );

  const addToWatched = useCallback(
    (id: string) => {
      upsertWatchedRecord({ id });
    },
    [upsertWatchedRecord]
  );

  const removeFromWatched = useCallback(
    (id: string) => {
      deleteWatchedRecord({ id });
    },
    [deleteWatchedRecord]
  );

  const toggleWatched = useCallback(
    (id: string) => {
      const watched = data.find(
        (watchedRecord) => watchedRecord?.mediaId === id
      );
      if (!watched) {
        addToWatched(id);
        return;
      }

      if (hasBeenWatched(id)) {
        removeFromWatched(watched.id);
      } else {
        addToWatched(watched.id);
      }
    },
    [addToWatched, data, hasBeenWatched, removeFromWatched]
  );

  const providerValue = useMemo(
    () => ({
      hasBeenWatched,
      toggleWatched,
    }),
    [toggleWatched, hasBeenWatched]
  );

  return (
    <WatchedContext.Provider value={providerValue}>
      {children}
    </WatchedContext.Provider>
  );
};

export const useWatched = () => {
  return useContext(WatchedContext);
};
