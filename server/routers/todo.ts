import { router, publicProcedure } from "../trpc";
// import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { prisma } from "../prisma";

// const defaultTodoSelect = {
//   id: true,
//   text: true,
//   completed: true,
// } satisfies Prisma.TodoSelect;

export const todoRouter = router({
  getTodos: publicProcedure.query(async () => {
    return await prisma.todo.findMany();
  }),
  addTodo: publicProcedure
    .input(z.object({ text: z.string() }))
    .mutation(async ({ input }) => {
      const todo = await prisma.todo.create({
        data: { text: input.text, completed: false },
      });
      return todo;
    }),
  toggleTodo: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const todo = await prisma.todo.findFirst({
        where: { id: input.id },
      });
      await prisma.todo.update({
        where: { id: input.id },
        data: { completed: { set: !todo?.completed } },
      });
      return await prisma.todo.findMany();
    }),
});
