import React, { useMemo } from "react";
import styles from "./transactions.module.css";
import { PaymentType } from "@/shared/types/AdminTypes";
import { ColumnDef, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
interface Props {
  payments: PaymentType[];
}
const Transactions = ({ payments }: Props) => {
    const columns = useMemo<ColumnDef<PaymentType>[]>(
      () => [
        {
          accessorKey: "id",
          header: "ID",
        },
        {
          accessorKey: "customer_name",
          header: "Name",
          enableSorting: true,
        },
        {
          accessorKey: "customer_email",
          header: "Email",
          enableSorting: false,
          cell: ({ getValue }) => `$${getValue()}`,
        },
        {
          accessorKey: "customer_phone",
          header: "Phone",
          enableSorting: false,
        },

        {
          accessorKey: "payment_status",
          header: () => (
            <div>
              Status{" "}
              <select
                onChange={(e) =>
                  table
                    .getColumn("payment_status")
                    ?.setFilterValue(e.target.value)
                }
                style={{ marginLeft: "8px" }}
              >
                <option value="">All</option>
                <option value="success">Success</option>
                <option value="failed">Failed</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          ),
          enableSorting: true,
          cell: ({ getValue }) => {
            const status = getValue() as "success" | "failed" | "pending";
            const color = status === "success" ? "green" : "red";
            return <span style={{ color }}>{status}</span>;
          },
          filterFn: (row, columnId, filterValue) => {
            if (!filterValue) return true; // Show all if no filter is applied
            return row.getValue(columnId) === filterValue;
          },
        },
      ],
      []
    );
    const table = useReactTable({
      data: payments,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
      manualPagination: true,
    });
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Latest Transactions</h2>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {/* Render header content */}
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}

                    {/* Add sorting indicator */}
                    {{
                      asc: " 🔼",
                      desc: " 🔽",
                    }[header.column.getIsSorted() as string] ?? null}
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

export default Transactions;
