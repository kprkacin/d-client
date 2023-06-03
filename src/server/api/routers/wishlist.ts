/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { Prisma } from "@prisma/client";
import { env } from "@/env.mjs";
import { fetchOptions } from "../consts";
import { type Result, transformMedia } from "./tmdb";
import { type Media } from "@/types/discoverTypes";

const defaultWishlistSelect = Prisma.validator<Prisma.WishlistSelect>()({
  id: true,
  author: true,
  name: true,
  wishlistRecords: true,
  authorId: true,
  public: true,
  description: true,
  genre: true,
  updatedAt: true,
  createdAt: true,
});
const defaultWishlistRecordSelect =
  Prisma.validator<Prisma.WishlistRecordSelect>()({
    id: true,
    mediaId: true,
    mediaType: true,
    wishlistId: true,
    wishlist: true,
  });

export const wishlistRouter = createTRPCRouter({
  allWishlists: protectedProcedure.query(async ({ ctx }) => {
    const { prisma, session } = ctx;
    const userWishlists = await prisma.wishlist.findMany({
      where: { authorId: session?.user.id },
      select: defaultWishlistSelect,
    });
    return userWishlists;
  }),

  allWishlistsWithImages: protectedProcedure.query(async ({ ctx }) => {
    const { prisma, session } = ctx;
    const userWishlists = await prisma.wishlist.findMany({
      where: { authorId: session?.user.id },
      select: defaultWishlistSelect,
    });

    const wishlistsWithImagePreview = await Promise.allSettled(
      userWishlists.map(async (wishlist) => {
        const { mediaType, mediaId } = wishlist.wishlistRecords[0] || {};
        if (!mediaType || !mediaId) return wishlist;
        const response = await fetch(
          `${env.MOVIE_API_URL}3/${mediaType}/${mediaId}?language=en-US&append_to_response=images`,
          fetchOptions
        );
        const media = await response.json();

        return {
          ...wishlist,
          image:
            media?.poster_path || media?.backdrop_path || media?.profile_path,
        };
      })
    );

    return wishlistsWithImagePreview
      .filter((res) => res.status === "fulfilled")
      .map((res) => (res as any).value);
  }),
  publicWishlistsWithImages: protectedProcedure.query(async ({ ctx }) => {
    const { prisma } = ctx;
    const userWishlists = await prisma.wishlist.findMany({
      where: { public: true },
      select: defaultWishlistSelect,
    });

    const wishlistsWithImagePreview = await Promise.allSettled(
      userWishlists.map(async (wishlist) => {
        const { mediaType, mediaId } = wishlist.wishlistRecords[0] || {};
        if (!mediaType || !mediaId) return wishlist;
        const response = await fetch(
          `${env.MOVIE_API_URL}3/${String(mediaType)}/${String(
            mediaId
          )}?language=en-US&append_to_response=images`,
          fetchOptions
        );
        const media = await response.json();

        return {
          ...wishlist,
          image:
            media?.poster_path || media?.backdrop_path || media?.profile_path,
        };
      })
    );

    return wishlistsWithImagePreview
      .filter((res) => res.status === "fulfilled")
      .map((res) => (res as any).value);
  }),
  deleteWishlist: protectedProcedure
    .input(
      z.object({
        id: z.string().cuid(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { prisma } = ctx;
      const { id } = input;
      await prisma.wishlist.delete({
        where: { id },
      });
      return true;
    }),
  newWishlist: protectedProcedure.mutation(async ({ ctx }) => {
    const { prisma, session } = ctx;

    return await prisma.wishlist.create({
      data: {
        name: `Watchlist ${new Date().toLocaleString()}`,
        author: {
          connect: { email: session?.user?.email || undefined },
        },
      },
    });
  }),
  updateWishlist: protectedProcedure
    .input(
      z.object({
        id: z.string().cuid(),
        name: z.string().optional(),
        genre: z.array(z.string()).optional(),
        description: z.string().optional(),
        publicValue: z.boolean().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { prisma } = ctx;
      const { id, name, genre, description, publicValue } = input;
      return await prisma.wishlist.update({
        where: {
          id: id,
        },
        data: {
          name: name,
          description: description,
          genre: genre,
          public: publicValue,
        },
      });
    }),
  getWishlist: protectedProcedure
    .input(
      z.object({
        id: z.string().cuid(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { prisma } = ctx;
      const { id } = input;
      const wishlist = await prisma.wishlist.findUnique({
        where: { id },
        select: defaultWishlistSelect,
      });

      if (!wishlist)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Wishlist not found",
        });

      const res = await Promise.allSettled(
        wishlist?.wishlistRecords?.map(async (item) => {
          const res = await fetch(
            `${env.MOVIE_API_URL}3/${item.mediaType}/${item.mediaId}?language=en-US&append_to_response=videos,images,similar,credits,combined_credits,watch/providers`,
            fetchOptions
          );
          const media: Media = transformMedia((await res.json()) as Result);
          return { ...item, media };
        })
      );
      const fullData = res
        .filter((result) => result.status === "fulfilled")
        .map(
          (result) => (result as unknown as PromiseFulfilledResult<any>).value
        );

      return {
        ...wishlist,
        wishlistRecords: fullData,
      };
    }),
  getWishlistRecord: protectedProcedure
    .input(
      z.object({
        id: z.string().cuid(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { prisma } = ctx;
      const { id } = input;
      return await prisma.wishlistRecord.findUnique({
        where: { id },
        select: defaultWishlistRecordSelect,
      });
    }),
  addMediaToWishlist: protectedProcedure
    .input(
      z.object({
        id: z.string().cuid(),
        mediaId: z.string(),
        mediaType: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { prisma } = ctx;
      const { id, mediaId, mediaType } = input;

      await prisma.wishlistRecord.create({
        data: {
          mediaId: mediaId,
          mediaType: mediaType,
          wishlist: { connect: { id: id } },
        },
        select: defaultWishlistRecordSelect,
      });
    }),
  removeMediaFromWishlist: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { prisma } = ctx;
      const { id } = input;
      await prisma.wishlistRecord.delete({
        where: { id },
      });
      return true;
    }),

  // updateWishlistRecord: protectedProcedure
  //   .input(
  //     z.object({
  //       id: z.string(),
  //       watchStatus: z.boolean(),
  //     })
  //   )
  //   .mutation(async ({ ctx, input }) => {
  //     const { prisma } = ctx;
  //     const { id } = input;
  //     await prisma.wishlistRecord.update({
  //       where: { id },
  //       data: { watchStatus: input.watchStatus },
  //     });
  //     return true;
  //   }),
});

/*

  id        String  @id @default(cuid())
  title     String
  content   String?
  published Boolean @default(false)
  authorId  String?
  author    User?   @relation(fields: [authorId], references: [id])
*/
