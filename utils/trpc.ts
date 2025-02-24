import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '@/server/routers/_app';

export const trpc = createTRPCReact<AppRouter>({
  overrides: {
    useMutation: {
      async onSuccess(opt) {
        // Calls the `onSuccess` defined in the `useMutation()`-options:
        await opt.originalFn()
        // Invalidate all queries in the react-query cache:
        opt.queryClient.invalidateQueries()
      }
    }
  }
});

export type RouterInput = inferRouterInputs<AppRouter>;
export type RouterOutput = inferRouterOutputs<AppRouter>;