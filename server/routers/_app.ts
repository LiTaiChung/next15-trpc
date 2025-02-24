/**
 * This file contains the root router of your tRPC-backend
 */
import { createCallerFactory, publicProcedure, router } from '../trpc';
import { todoRouter } from './todo';

export type Todo = {
    id: number;
    text: string;
    completed: boolean;
};

export const appRouter = router({
  healthcheck: publicProcedure.query(() => 'yay!'),
  todo: todoRouter,
});

export const createCaller = createCallerFactory(appRouter);

export type AppRouter = typeof appRouter;