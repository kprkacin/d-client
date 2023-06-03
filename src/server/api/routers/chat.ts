/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";
import {
  type ChatCompletionRequestMessage,
  Configuration,
  type CreateChatCompletionRequest,
  OpenAIApi,
} from "openai";
import { TRPCError } from "@trpc/server";
import { Prisma } from "@prisma/client";
import { env } from "@/env.mjs";
import { fetchOptions } from "../consts";
import { type ByImdbID } from "./tmdb";

const defaultChatSelect = Prisma.validator<Prisma.ChatSessionSelect>()({
  id: true,
  author: true,
  name: true,
  createdAt: true,
  updatedAt: true,
  chatRecords: true,
});
const defaultChatRecordSelect = Prisma.validator<Prisma.ChatRecordSelect>()({
  id: true,
  createdAt: true,
  updatedAt: true,
  paragraph: true,
  ids: true,
  role: true,
  chatSessionId: true,
});

const base: CreateChatCompletionRequest["messages"] = [
  {
    role: "system",
    content:
      "Act like a film or tv recommendation expert based on the following question respond with a small paragraph explaining your choice of media and a list of exactly 10 recommendations after the paragraph only put valid imdb IDs in the list.Before recommendations always say 'Recommendation list:'",
  },
  {
    role: "assistant",
    content:
      "Certainly! I'm here to help. Please go ahead and ask your question, and I'll provide you with a list of 10 recommendations based on it.",
  },
];

const mockdata =
  "If you enjoyed The Lord of the Rings trilogy, I would highly recommend checking out The Hobbit trilogy. It follows a similar storyline and is set in the same world as The Lord of the Rings. The Hobbit trilogy is directed by Peter Jackson, who also directed The Lord of the Rings trilogy, making for a very seamless transition between the two. Here are some other recommendations that are similar in theme and tone to The Lord of the Rings:\n\nRecommendation list:\n- Harry Potter and the Sorcerer's Stone (tt0241527)\n- The Chronicles of Narnia: The Lion, the Witch and the Wardrobe (tt0363771)\n- Pirates of the Caribbean: The Curse of the Black Pearl (tt0325980)\n- The NeverEnding Story (tt0088323)\n- Willow (tt0096446)\n- The Dark Crystal (tt0083791)\n- Labyrinth (tt0091369)\n- Eragon (tt0449010)\n- The Princess Bride (tt0093779)";

const configuration = new Configuration({
  organization: env.OPENAI_ORG,
  apiKey: env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
export const chatRouter = createTRPCRouter({
  allChats: protectedProcedure.query(async ({ ctx }) => {
    const { prisma, session } = ctx;
    const userSessions = await prisma.chatSession.findMany({
      where: { authorId: session?.user.id },
      select: defaultChatSelect,
    });

    return userSessions;
  }),
  deleteSession: protectedProcedure
    .input(
      z.object({
        id: z.string().cuid(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { prisma } = ctx;
      const { id } = input;
      await prisma.chatSession.delete({
        where: { id },
        select: defaultChatSelect,
      });
      return true;
    }),
  newSession: protectedProcedure.mutation(async ({ ctx }) => {
    const { prisma, session } = ctx;
    const emptyChat = await prisma.chatSession.findFirst({
      where: {
        chatRecords: {
          none: {},
        },
      },
    });

    if (emptyChat?.id) {
      return emptyChat;
    }

    return await prisma.chatSession.create({
      data: {
        name: `Chat Session ${new Date().toLocaleString()}`,
        author: {
          connect: { email: session?.user?.email || undefined },
        },
      },
    });
  }),
  byId: protectedProcedure
    .input(
      z.object({
        id: z.string().cuid(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { prisma } = ctx;
      const { id } = input;
      const userSessions = await prisma.chatSession.findUnique({
        where: { id },
        select: defaultChatSelect,
      });

      return userSessions;
    }),
  ask: protectedProcedure
    .input(
      z.object({
        chatSessionId: z.string().cuid(),
        query: z.string().min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { query, chatSessionId } = input;
      const { prisma } = ctx;
      const currentSession = await prisma.chatSession.findUnique({
        where: { id: chatSessionId },
        select: defaultChatSelect,
      });

      if (!currentSession) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Session not found",
        });
      }

      const previousMessages: CreateChatCompletionRequest["messages"] =
        currentSession.chatRecords.map((cr) => ({
          role:
            (cr.role as ChatCompletionRequestMessage["role"]) || "assistant",
          content: cr.paragraph,
        }));
      const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          ...base,
          ...previousMessages,
          { content: query, role: "user" },
        ],
        // max_tokens: 50,
      });

      const { choices } = response.data;
      console.log("choices", choices);
      const obj = choices[0];

      if (!obj || !obj.message) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "No response from AI",
        });
      }

      const { content } = obj.message;

      const recommendationListRegex = "Recommendation list:";
      const recommendationListIndex = content.search(recommendationListRegex);

      const firstParagraph = content.slice(0, recommendationListIndex).trim();

      const idRegex = /(tt\d{7})/g;
      const ids = content.match(idRegex)?.map((id) => id);

      const data = await Promise.allSettled(
        ids?.map(async (id) => {
          const result = await fetch(
            `${env.MOVIE_API_URL}3/find/${id}?external_source=imdb_id`,
            fetchOptions
          );

          return result.json();
        }) || []
      );

      const fullData = data
        .filter((result) => result.status === "fulfilled")
        .map((result) => {
          const value: ByImdbID = (result as PromiseFulfilledResult<any>).value;
          const movie = value.movie_results[0];
          const tv = value.tv_results[0];
          return movie || tv;
        })
        .map((result) => result as PromiseFulfilledResult<JSON>) as Array<any>;

      await prisma.chatRecord.create({
        data: {
          paragraph: query,
          role: "user",
          ids: [],
          fullData: [],
          chatSession: { connect: { id: chatSessionId } },
        },
        select: defaultChatRecordSelect,
      });
      await prisma.chatRecord.create({
        data: {
          paragraph: firstParagraph,
          ids,
          role: "assistant",
          fullData,
          chatSession: { connect: { id: chatSessionId } },
        },
        select: defaultChatRecordSelect,
      });
      return prisma.chatSession.findUnique({
        where: { id: chatSessionId },
      });
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
