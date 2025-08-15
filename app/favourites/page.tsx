"use client";

import React from "react";
import Link from "next/link";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
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
    }),
    columnHelper.accessor("name", {
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("brewery_type", {
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("city", {
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("state", {
      cell: (info) => info.getValue(),
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

  const table = useReactTable({
    columns: columns,
    data: favItems,
    getCoreRowModel: getCoreRowModel(),
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
      </div>
    </div>
  );
};

export default Favourites;
