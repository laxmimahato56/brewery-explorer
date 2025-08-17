"use client";

import {
  QueryClientProvider as NextQueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

export function QueryClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextQueryClientProvider client={queryClient}>
      {children}
    </NextQueryClientProvider>
  );
}
