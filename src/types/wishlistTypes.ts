import { type Media } from "./discoverTypes";
import { type RouterOutput } from "./routerTypes";

export type Wishlist = RouterOutput["wishlist"]["getWishlist"];
export type WishlistWithImage = Wishlist & {
  image?: string;
};
export type WishlistRecord = RouterOutput["wishlist"]["getWishlistRecord"];

export type WishlistRecordWithMedia = WishlistRecord & {
  media: Media;
};

export type WishlistDetails = Wishlist & {
  wishlistRecords: WishlistRecordWithMedia[];
};
