"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { usePatientStore } from "@/store/patientStore";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  ColumnSort,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { columns } from "./columns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowDown, ArrowUp, Inbox, Loader } from "lucide-react";
import SearchDebounced from "./search-debounced";
import {
  Pagination,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";

const DataTable = () => {
  const { patients } = usePatientStore();
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [sorting, setSorting] = useState<ColumnSort[]>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, [patients]);

  const table = useReactTable({
    data: patients,
    columns,
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    state: {
      globalFilter,
      sorting,
      pagination,
    },
    getCoreRowModel: getCoreRowModel(),
    enableGlobalFilter: true,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const handleSearch = (search: string) => {
    setGlobalFilter(search);
  };

  return (
    <Card className="mt-5 p-5 lg:p-8 rounded-3 bg-white">
      <CardHeader className="flex flex-2 justify-between">
        <div className="">
          <CardTitle>Daftar Pasien</CardTitle>
          <CardDescription>Daftar Pasien Rumah Sakit</CardDescription>
        </div>
        <Link href="/register">
          <Button className="bg-teal-600 cursor-pointer">
            Registrasi Pasien
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <SearchDebounced onSearch={handleSearch} />
        <Table>
          <TableHeader className="overflow-hidden rounded-lg">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="border-b bg-gray-200 dark:bg-gray-700"
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className={`body-base-bold bg-gray-200 dark:bg-gray-700 py-2 text-gray-800 dark:text-gray-200 ${
                        header.column.getCanSort()
                          ? "cursor-pointer select-none"
                          : ""
                      }`}
                      onClick={
                        header.column.getCanSort()
                          ? header.column.getToggleSortingHandler()
                          : undefined
                      }
                    >
                      <div className="flex items-center gap-1">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}

                        {header.column.getCanSort() &&
                          (() => {
                            const sorted = header.column.getIsSorted();
                            if (sorted === "asc") return <ArrowUp size={16} />;
                            if (sorted === "desc")
                              return <ArrowDown size={16} />;
                            return null;
                          })()}
                      </div>
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="">
                  <div className="w-full min-h-[60svh] flex justify-center items-center">
                    <Loader className="animate-spin" />
                  </div>
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-64">
                  <div className="flex flex-col items-center justify-center gap-4 py-12">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Inbox />
                      <p className="body-base-bold">Belum ada daftar pasien</p>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <select
          value={pagination.pageSize.toString()}
          onChange={(e) =>
            setPagination({
              ...pagination,
              pageSize: parseInt(e.currentTarget.value),
            })
          }
        >
          <option value="2">2</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>

        <Pagination className="list-none justify-end">
          {Array.from({ length: table.getPageCount() }, (_, i) => (
            <PaginationItem key={i}>
              <PaginationLink
                isActive={table.getState().pagination.pageIndex === i}
                onClick={(e) => {
                  e.preventDefault();
                  table.setPageIndex(i);
                }}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
        </Pagination>
      </CardFooter>
    </Card>
  );
};

export default DataTable;
