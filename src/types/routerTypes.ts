import { type inferRouterOutputs, type inferRouterInputs } from "@trpc/server";
import { type AppRouter } from "../server/api/root";

export type RouterInput = inferRouterInputs<AppRouter>;
export type RouterOutput = inferRouterOutputs<AppRouter>;
