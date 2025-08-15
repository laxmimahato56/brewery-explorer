"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import BreweriesTable from "@/components/BreweriesTable";

const queryClient = new QueryClient();

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <main className="p-8 flex flex-col gap-8">
        <h1>Brewery Explorer</h1>

        <BreweriesTable />
      </main>
    </QueryClientProvider>
  );
}
