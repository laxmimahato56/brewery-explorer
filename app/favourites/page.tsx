"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
} from "@tanstack/react-table";
import { HeartMinus } from "lucide-react";

import { Brewery } from "@/types";
import { useFavStore } from "@/store/useStore";

const Favourites = () => {
  const { removeFavItem, favItems } = useFavStore();

  const columnHelper = createColumnHelper<Brewery>();

  const columns = [
    columnHelper.accessor("id", {
      cell: (info) => info.getValue(),
      enableSorting: false,
    }),
    columnHelper.accessor("name", {
      cell: (info) => info.getValue(),
      header: "Name",
    }),
    columnHelper.accessor("brewery_type", {
      cell: (info) => info.getValue(),
      enableSorting: false,
    }),
    columnHelper.accessor("city", {
      cell: (info) => info.getValue(),
      enableSorting: false,
    }),
    columnHelper.accessor("state", {
      cell: (info) => info.getValue(),
      header: "State",
    }),
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
      enableSorting: false,
    }),
    columnHelper.display({
      id: "actions",
      cell: ({ row }) => (
        <div>
          <HeartMinus
            color="red"
            onClick={() => {
              removeFavItem(row._valuesCache as Brewery);
            }}
          />
        </div>
      ),
    }),
  ];

  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    columns: columns,
    data: favItems,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div>
      Favourites
      <div>
        {" "}
        <table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getCanSort() ? header.column.getToggleSortingHandler() : undefined}
                    className={header.column.getCanSort() ? "cursor-pointer select-none" : undefined}
                  >
                    {header.isPlaceholder
                      ? null
                      : (
                        <div className="flex items-center gap-1">
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {header.column.getCanSort() && (
                            <span className={header.column.getIsSorted() ? "text-blue-600" : "text-gray-400"}>
                              {header.column.getIsSorted() === "asc" ? "▲" : header.column.getIsSorted() === "desc" ? "▼" : "↕"}
                            </span>
                          )}
                        </div>
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
      </div>
    </div>
  );
};

export default Favourites;
