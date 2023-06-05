/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useMemo, createContext, useContext, useCallback } from "react";
import { api } from "../utils/api";
import { type Wishlist } from "@/types/wishlistTypes";
import { notifications } from "@mantine/notifications";

type WishlistContextType = {
  wishlists: Wishlist[];
  getWishlist: (id: string) => Wishlist[];
  isInWishlist: (id: string, wishlistId: string) => boolean;
  refetch: () => void;
  addToWishlist: (id: string, mediaId: string, mediaType: string) => void;
  removeFromWishlist: (id: string, mediaId: string) => void;
  updateWishlist: (data: {
    id: string;
    name: string;
    description?: string;
    genre?: string[];
    public?: boolean;
  }) => void;
};

const WishlistContext = createContext<WishlistContextType>({
  wishlists: [],
  getWishlist: () => [],
  isInWishlist: () => false,
  refetch: () => {},
  addToWishlist: () => {},
  removeFromWishlist: () => {},
  updateWishlist: () => {},
});

type Props = {
  children?: React.ReactNode;
};

export const WishlistProvider: React.FC<Props> = ({ children }) => {
  const { data = [], refetch } = api.wishlist.allWishlists.useQuery();

  const { mutate: addMediaToWishlist } =
    api.wishlist.addMediaToWishlist.useMutation({
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
          message: "Added to watchlist",
        });
      },
      onSettled: () => {
        void refetch();
      },
    });

  const { mutate: removeMediaFromWishlist } =
    api.wishlist.removeMediaFromWishlist.useMutation({
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
  const { mutate: update } = api.wishlist.updateWishlist.useMutation({
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
        message: "Updated successfully",
      });
    },

    onSettled: () => {
      void refetch();
    },
  });

  const getWishlist = useCallback(() => {
    return data;
  }, [data]);

  const isInWishlist = useCallback(
    (id: string, wishlistId: string) => {
      const wishlist = data.find((wishlist) => wishlist?.id === wishlistId);

      // console.log(
      //   wishlist,
      //   id,
      //   wishlist?.wishlistRecords.some(
      //     (media) => media?.mediaId === id.toString()
      //   ),
      //   "wishlist"
      // );
      if (!wishlist) {
        return false;
      }
      return wishlist.wishlistRecords.some(
        (media) => media?.mediaId === id.toString()
      );
    },
    [data]
  );

  const addToWishlist = useCallback(
    (id: string, mediaId: string, mediaType: string) => {
      addMediaToWishlist({ id, mediaId: mediaId.toString(), mediaType });
    },
    [addMediaToWishlist]
  );

  const removeFromWishlist = useCallback(
    (id: string, mediaId: string) => {
      console.log(data, id, mediaId, "data");
      const wishlist = data.find((wishlist) => wishlist?.id === id);
      if (!wishlist) {
        return false;
      }
      const toRemove = wishlist.wishlistRecords.find(
        (media) => media?.mediaId === mediaId.toString()
      );

      if (!toRemove) {
        return;
      }
      removeMediaFromWishlist({ id: toRemove.id.toString() });
    },
    [data, removeMediaFromWishlist]
  );

  const updateWishlist = useCallback(
    (data: {
      id: string;
      name: string;
      description?: string;
      genre?: string[];
      public?: boolean;
    }) => {
      update({ ...data, publicValue: data.public });
    },
    [update]
  );

  const providerValue = useMemo(
    () => ({
      wishlists: data,
      getWishlist,
      isInWishlist,
      refetch,
      addToWishlist,
      removeFromWishlist,
      updateWishlist,
    }),
    [
      addToWishlist,
      data,
      getWishlist,
      isInWishlist,
      refetch,
      removeFromWishlist,
      updateWishlist,
    ]
  );

  return (
    <WishlistContext.Provider value={providerValue}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  return useContext(WishlistContext);
};
