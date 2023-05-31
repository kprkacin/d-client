/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import { z } from "zod";
import { Configuration, CreateChatCompletionRequest, OpenAIApi } from "openai";
import { TRPCError } from "@trpc/server";
import { Prisma } from "@prisma/client";
import { env } from "@/env.mjs";
import { fetchOptions } from "../consts";
import { ByImdbID } from "./tmdb";

const defaultWishlistSelect = Prisma.validator<Prisma.WishlistSelect>()({
  id: true,
  author: true,
  name: true,
  wishlistRecords: true,
  authorId: true,
});
const defaultWishlistRecordSelect =
  Prisma.validator<Prisma.WishlistRecordSelect>()({
    id: true,
    watchStatus: true,
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
        return {
          ...wishlist,
          wishlistRecords: await Promise.allSettled(
            wishlist.wishlistRecords.map(async (record, idx) => {
              if (idx > 2) return record;
              const mediaType = record.mediaType;
              const mediaId = record.mediaId;
              const response = await fetch(
                `${env.MOVIE_API_URL}3/${mediaType}/${mediaId}?language=en-US&append_to_response=images`,
                fetchOptions
              );
              const media = await response.json();
              console.log("MEDIA", media);
              return {
                ...record,
                image:
                  media?.poster_path ||
                  media?.backdrop_path ||
                  media?.profile_path,
              };
            })
          ),
        };
      })
    );
    console.log(
      "RESP",
      wishlistsWithImagePreview
        .filter((res) => res.status === "fulfilled")
        .map((res) => (res as PromiseFulfilledResult<any>).value)
    );
    return wishlistsWithImagePreview
      .filter((res) => res.status === "fulfilled")
      .map((res) => ({
        ...(res as PromiseFulfilledResult<any>).value,
        wishlistRecords: (
          res as PromiseFulfilledResult<any>
        ).value.wishlistRecords
          .filter((res: { status: string }) => res.status === "fulfilled")
          .map((res: PromiseFulfilledResult<any>) => res.value),
      }));
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
        name: `Chat Session ${new Date().toLocaleString()}`,
        author: {
          connect: { email: session?.user?.email || undefined },
        },
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
      return await prisma.wishlist.findUnique({
        where: { id },
        select: defaultWishlistSelect,
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

  updateWishlistRecord: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        watchStatus: z.boolean(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { prisma } = ctx;
      const { id } = input;
      await prisma.wishlistRecord.update({
        where: { id },
        data: { watchStatus: input.watchStatus },
      });
      return true;
    }),
});

/*

  id        String  @id @default(cuid())
  title     String
  content   String?
  published Boolean @default(false)
  authorId  String?
  author    User?   @relation(fields: [authorId], references: [id])
*/
