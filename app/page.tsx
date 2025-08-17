"use client";

import BreweriesTable from "@/components/BreweriesTable";

export default function Home() {
  return (
    <main className="p-8 flex flex-col gap-8">
      <BreweriesTable />
    </main>
  );
}
