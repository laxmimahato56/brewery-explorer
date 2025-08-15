"use client";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Heart } from "lucide-react";
import { Brewery } from "@/types";
import { useFavStore } from "@/store/useStore";

const fallbackData: Brewery[] = [];

const BreweriesTable = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;

  const { addFavItem } = useFavStore();

  const getBreweries = async (): Promise<Array<Brewery>> => {
    const response = await fetch(
      `https://api.openbrewerydb.org/v1/breweries?per_page=20&page=${page}`
    );
    return await response.json();
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["breweries", page],
    queryFn: getBreweries,
  });

  const columnHelper = createColumnHelper<Brewery>();

  const columns = [
    columnHelper.accessor("id", { cell: (info) => info.getValue() }),
    columnHelper.accessor("name", { cell: (info) => info.getValue() }),
    columnHelper.accessor("brewery_type", { cell: (info) => info.getValue() }),
    columnHelper.accessor("city", { cell: (info) => info.getValue() }),
    columnHelper.accessor("state", { cell: (info) => info.getValue() }),
    columnHelper.accessor("website_url", {
      cell: (info) => (
        <Link
          href={info.getValue() ?? ""}
          target="_blank"
          className="text-blue-700"
        >
          {info.getValue()}
        </Link>
      ),
    }),
    columnHelper.display({
      id: "actions",
      cell: ({ row }) => (
        <Heart
          color="red"
          className="cursor-pointer"
          onClick={() => addFavItem(row.original)}
        />
      ),
    }),
  ];

  const table = useReactTable({
    columns,
    data: data ?? fallbackData,
    getCoreRowModel: getCoreRowModel(),
  });

  const goToPage = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    router.push(`?${params.toString()}`);
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center">
        <div className="h-32 w-32 border-t-2 border-b-2 border-black rounded-full animate-spin"></div>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center text-red-500">
        {error.message || "Failed to load breweries"}
      </div>
    );

  return (
    <section>
      <div>
        <table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex gap-2 items-center mt-4">
          <span>Current Page: {page}</span>
          <Button
            onClick={() => goToPage(Math.max(page - 1, 1))}
            disabled={page === 1}
          >
            Previous Page
          </Button>
          <Button onClick={() => goToPage(page + 1)}>Next Page</Button>
        </div>
      </div>
    </section>
  );
};

export default BreweriesTable;
