"use client";
import React, { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";
import styles from "@/shared/components/ui/Admin/Products/product.module.css"; // Import CSS module
import Link from "next/link";
import productApiRequest from "@/shared/apiRequests/product";
import { Product } from "@/shared/types/ProductTypes";

const ProductsPage = () => {
  const [statusFilter, setStatusFilter] = useState("");
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 2,
  });
  const [totalPages, setTotalPages] = useState(0);

  const { data } = productApiRequest.useGetProductPage({
    page: pagination.pageIndex + 1,
    perPage: pagination.pageSize,
  });
  React.useEffect(() => {
    if (data) {
      setTotalPages(data?.last_page);
    }
  }, [data]);
  const handleEdit = (item: Product) => {
    console.log("Edit:", item);
    // Thêm logic edit ở đây
  };

  const handleDelete = async (item: Product) => {
    console.log("Delete:", item);
    // Call API to delete the item
    // await productApiRequest.deleteProduct(item.id);
    // Refetch data or update tableData state
  };
const columns = useMemo<ColumnDef<Product>[]>(
  () => [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "name",
      header: "Name",
      enableSorting: true,
    },
    {
      accessorKey: "status",
      header: "Status",
      enableColumnFilter: true,
      cell: ({ getValue }) => <span>{getValue() as string}</span>,
      filterFn: (row, columnId, filterValue) => {
        if (!filterValue) return true; // Nếu không chọn gì thì hiển thị tất cả
        return row.getValue(columnId) === filterValue;
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div>
          <button onClick={() => handleEdit(row.original)}>Edit</button>
          <button onClick={() => handleDelete(row.original)}>Delete</button>
        </div>
      ),
    },
  ],
  []
);
  const tableData =
    data?.data?.filter(
      (item: Product) => !statusFilter || item.status === statusFilter
    ) || [];

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true,
    pageCount: totalPages,
    state: { pagination },
    onPaginationChange: setPagination,
  });

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Link href="/admin/products/add">
          <button className={styles.addButton}>Add New</button>
        </Link>
      </div>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    <div onClick={header.column.getToggleSortingHandler()}>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: " 🔼",
                        desc: " 🔽",
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>

                    {/* Nếu là cột Status thì dùng dropdown thay vì input */}
                    {header.column.id === "status" ? (
                      <select
                        onChange={(e) =>
                          header.column.setFilterValue(e.target.value)
                        }
                      >
                        <option value="">All</option>
                        <option value="available">Available</option>
                        <option value="out_of_stock">Out of Stock</option>
                        <option value="discontinued">Discontinued</option>
                      </select>
                    ) : header.column.getCanFilter() ? (
                      <input
                        type="text"
                        onChange={(e) =>
                          header.column.setFilterValue(e.target.value)
                        }
                        placeholder={`Search ${header.column.id}`}
                      />
                    ) : null}
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

        {/* Pagination */}
        <div className={styles.pagination}>
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </button>
          <span>
            Page{" "}
            <strong>
              {table.getState().pagination.pageIndex + 1} of {totalPages}
            </strong>
          </span>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </button>
          <select
            value={pagination.pageSize}
            onChange={(e) =>
              setPagination((prev) => ({
                ...prev,
                pageSize: Number(e.target.value),
                pageIndex: 0,
              }))
            }
          >
            {[2, 5, 10].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
