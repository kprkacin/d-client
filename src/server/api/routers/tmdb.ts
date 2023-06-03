/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";
import { env } from "@/env.mjs";

import { fetchOptions } from "../consts";
import {
  type Season,
  type MovieDetails,
  type PersonDetails,
  type TVDetails,
  type SeasonDetails,
  type EpisodeDetails,
  type Media,
} from "@/types/discoverTypes";

export interface ByImdbID {
  movie_results: unknown[];
  tv_results: unknown[];
}

export interface Result {
  adult: boolean;
  backdrop_path?: string;
  id: number;
  title?: string;
  original_language?: string;
  original_title?: string;
  overview?: string;
  poster_path?: string;
  media_type: string;
  genre_ids?: number[];
  popularity: number;
  release_date?: string;
  video?: boolean;
  vote_average?: number;
  vote_count?: number;
  name?: string;
  original_name?: string;
  first_air_date?: string;
  origin_country?: string[];
  gender?: number;
  known_for_department?: string;
  profile_path?: string;
}

export const transformMedia = (result: Result): Media => ({
  id: result.id,
  title:
    result.title ||
    result.name ||
    result.original_title ||
    result.original_name ||
    "",
  overview: result.overview,
  image:
    result.poster_path || result.profile_path || result.backdrop_path || "",
  media_type: result.media_type,
  genre_ids: result.genre_ids,
  popularity: result.popularity,
  releaseDate: result.release_date || result.first_air_date,
  vote_average: result.vote_average,
  vote_count: result.vote_count,
});

export const tmdbRouter = createTRPCRouter({
  mediaByImdbId: protectedProcedure
    .input(z.string().min(1))
    .query(async ({ input }) => {
      const response = await fetch(
        `${env.MOVIE_API_URL}3/find/${input}?external_source=imdb_id`,
        fetchOptions
      );
      const obj = (await response.json()) as ByImdbID;
      const movie = obj.movie_results[0];
      const tv = obj.tv_results[0];
      return movie || tv;
    }),

  mediaDetails: protectedProcedure
    .input(
      z.object({
        id: z.number().min(1),
        media_type: z.string().min(1),
      })
    )
    .query(async ({ input }) => {
      const { id, media_type } = input;

      const response = await fetch(
        `${env.MOVIE_API_URL}3/${media_type}/${id}?language=en-US&append_to_response=videos,images,similar,credits,combined_credits,watch/providers`,
        fetchOptions
      );
      if (media_type === "movie") {
        return (await response.json()) as MovieDetails;
      }

      if (media_type === "tv") {
        return (await response.json()) as TVDetails;
      }

      if (media_type === "person") {
        return (await response.json()) as PersonDetails;
      }

      return response.json();
    }),

  trendingAll: protectedProcedure.query(async () => {
    const response = await fetch(
      `${env.MOVIE_API_URL}3/trending/all/day?language=en-US`,
      fetchOptions
    );
    const obj: Media[] = ((await response.json()).results as Result[]).map(
      transformMedia
    );
    return obj;
  }),
  // ### Movies ###
  trendingMovies: protectedProcedure.query(async () => {
    const response = await fetch(
      `${env.MOVIE_API_URL}3/trending/movie/day?language=en-US`,
      fetchOptions
    );
    const obj: Media[] = ((await response.json()).results as Result[]).map(
      (r) => transformMedia({ ...r, media_type: "movie" })
    );
    return obj;
  }),
  nowPlayingMovies: protectedProcedure
    .input(
      z.object({
        page: z.number().min(1),
      })
    )
    .query(async ({ input }) => {
      const { page } = input;
      const response = await fetch(
        `${env.MOVIE_API_URL}3/movie/now_playing?language=en-US&page=${page}`,
        fetchOptions
      );
      const obj: Media[] = ((await response.json()).results as Result[]).map(
        (r) => transformMedia({ ...r, media_type: "movie" })
      );
      return obj;
    }),
  popularMovies: protectedProcedure
    .input(
      z.object({
        page: z.number().min(1),
      })
    )
    .query(async ({ input }) => {
      const { page } = input;
      const response = await fetch(
        `${env.MOVIE_API_URL}3/movie/popular?language=en-US&page=${page}`,
        fetchOptions
      );
      const obj: Media[] = ((await response.json()).results as Result[]).map(
        (r) => transformMedia({ ...r, media_type: "movie" })
      );
      return obj;
    }),
  topRatedMovies: protectedProcedure
    .input(
      z.object({
        page: z.number().min(1),
      })
    )
    .query(async ({ input }) => {
      const { page } = input;
      const response = await fetch(
        `${env.MOVIE_API_URL}3/movie/top_rated?language=en-US&page=${page}`,
        fetchOptions
      );
      const obj: Media[] = ((await response.json()).results as Result[]).map(
        (r) => transformMedia({ ...r, media_type: "movie" })
      );
      return obj;
    }),
  upcomingMovies: protectedProcedure
    .input(
      z.object({
        page: z.number().min(1),
      })
    )
    .query(async ({ input }) => {
      const { page } = input;
      const response = await fetch(
        `${env.MOVIE_API_URL}3/movie/upcoming?language=en-US&page=${page}`,
        fetchOptions
      );
      const obj: Media[] = ((await response.json()).results as Result[]).map(
        (r) => transformMedia({ ...r, media_type: "movie" })
      );
      return obj;
    }),

  // ### TV ###
  trendingTV: protectedProcedure.query(async () => {
    const response = await fetch(
      `${env.MOVIE_API_URL}3/trending/tv/day?language=en-US`,
      fetchOptions
    );
    const obj: Media[] = ((await response.json()).results as Result[]).map(
      (r) => transformMedia({ ...r, media_type: "tv" })
    );
    return obj;
  }),
  airingTodayTV: protectedProcedure
    .input(
      z.object({
        page: z.number().min(1),
      })
    )
    .query(async ({ input }) => {
      const { page } = input;
      const response = await fetch(
        `${env.MOVIE_API_URL}3/tv/airing_today?language=en-US&page=${page}`,
        fetchOptions
      );
      const obj: Media[] = ((await response.json()).results as Result[]).map(
        (r) => transformMedia({ ...r, media_type: "tv" })
      );
      return obj;
    }),
  onTheAirTV: protectedProcedure
    .input(
      z.object({
        page: z.number().min(1),
      })
    )
    .query(async ({ input }) => {
      const { page } = input;
      const response = await fetch(
        `${env.MOVIE_API_URL}3/tv/on_the_air?language=en-US&page=${page}`,
        fetchOptions
      );
      const obj: Media[] = ((await response.json()).results as Result[]).map(
        (r) => transformMedia({ ...r, media_type: "tv" })
      );
      return obj;
    }),
  popularTV: protectedProcedure
    .input(
      z.object({
        page: z.number().min(1),
      })
    )
    .query(async ({ input }) => {
      const { page } = input;
      const response = await fetch(
        `${env.MOVIE_API_URL}3/tv/popular?language=en-US&page=${page}`,
        fetchOptions
      );
      const obj: Media[] = ((await response.json()).results as Result[]).map(
        (r) => transformMedia({ ...r, media_type: "tv" })
      );
      return obj;
    }),
  topRatedTV: protectedProcedure
    .input(
      z.object({
        page: z.number().min(1),
      })
    )
    .query(async ({ input }) => {
      const { page } = input;
      const response = await fetch(
        `${env.MOVIE_API_URL}3/tv/top_rated?language=en-US&page=${page}`,
        fetchOptions
      );
      const obj: Media[] = ((await response.json()).results as Result[]).map(
        (r) => transformMedia({ ...r, media_type: "tv" })
      );
      return obj;
    }),

  getSingleTVSeasonDetails: protectedProcedure
    .input(
      z.object({
        id: z.number().min(1),
        seasonNum: z.number().min(1),
      })
    )
    .query(async ({ input }) => {
      const { id, seasonNum } = input;
      const result = await fetch(
        `${env.MOVIE_API_URL}3/tv/${id}/season/${seasonNum}?language=en-US&append_to_response=credits,watch/providers`,
        fetchOptions
      );

      return (await result.json()) as SeasonDetails;
    }),
  getSingleEpisodeDetails: protectedProcedure
    .input(
      z.object({
        id: z.number().min(1),
        seasonNum: z.number().min(1),
        episodeNum: z.number().min(1),
      })
    )
    .query(async ({ input }) => {
      const { id, seasonNum, episodeNum } = input;
      const result = await fetch(
        `${env.MOVIE_API_URL}3/tv/${id}/season/${seasonNum}/episode/${episodeNum}?language=en-US&append_to_response=credits`,
        fetchOptions
      );

      return (await result.json()) as EpisodeDetails;
    }),
  getTVSeasonDetails: protectedProcedure
    .input(
      z.object({
        id: z.number().min(1),
        numOfSeasons: z.number().min(1),
      })
    )
    .query(async ({ input }) => {
      const { id, numOfSeasons } = input;

      const data = await Promise.allSettled(
        [...Array(numOfSeasons).keys()].map(async (idx) => {
          const result = await fetch(
            `${env.MOVIE_API_URL}3/tv/${id}/season/${idx + 1}?language=en-US`,
            fetchOptions
          );

          return (await result.json()) as Season;
        }) || []
      );

      return data
        .filter((result) => result.status === "fulfilled")
        .map((result) => (result as PromiseFulfilledResult<Season>).value);
    }),

  // ### People ###
  popularPeople: protectedProcedure
    .input(
      z.object({
        page: z.number().min(1),
      })
    )
    .query(async ({ input }) => {
      const { page } = input;
      const response = await fetch(
        `${env.MOVIE_API_URL}3/person/popular?language=en-US&page=${page}`,
        fetchOptions
      );
      const obj: Media[] = ((await response.json()).results as Result[]).map(
        (r) => transformMedia({ ...r, media_type: "person" })
      );
      return obj;
    }),

  // ### Multi ###

  discover: protectedProcedure
    .input(
      z.object({
        page: z.number().min(1),
        query: z.string().min(1),
      })
    )
    .mutation(async ({ input }) => {
      const { page, query } = input;
      const response = await fetch(
        `${env.MOVIE_API_URL}3/search/multi?query=${query}&include_adult=false&language=en-US&page=${page}`,
        fetchOptions
      );
      return response.json();
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
