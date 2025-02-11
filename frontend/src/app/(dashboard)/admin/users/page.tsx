/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import userApiRequest from "@/shared/apiRequests/user";
import styles from "@/shared/components/ui/Admin/Users/users.module.css";
import { UserResType } from "@/shared/types/UserTypes";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import Swal from "sweetalert2";

const UsersPage = () => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 2,
  });
  const { data, isLoading, isError, refetch } = userApiRequest.useGetUsers({
    page: pagination.pageIndex + 1,
    perPage: pagination.pageSize,
  });

  const columns = useMemo<ColumnDef<UserResType>[]>(
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
        accessorKey: "email",
        header: "Email",
        enableSorting: false,
        cell: ({ getValue }) => `$${getValue()}`,
      },
      {
        accessorKey: "phone",
        header: "Phone",
        enableSorting: false,
      },
      {
        accessorKey: "loyalty_points",
        header: "Point",
        enableSorting: true,
      },

      {
        accessorKey: "role",
        header: () => (
          <div>
            Role{" "}
            <select
              onChange={(e) =>
                table.getColumn("role")?.setFilterValue(e.target.value)
              }
              style={{ marginLeft: "8px" }}
            >
              <option value="">All</option>
              <option value="admin">Admin</option>
              <option value="guest">Guest</option>
              <option value="employee">Employee</option>
            </select>
          </div>
        ),
        cell: ({ getValue }) => <span>{getValue() as string}</span>,
        filterFn: (row, columnId, filterValue) => {
          if (!filterValue) return true; // Show all if no filter is applied
          return row.getValue(columnId) === filterValue;
        },
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div>
            <button onClick={() => handleDelete(row.original)}>Delete</button>
          </div>
        ),
      },
    ],
    []
  );
  const table = useReactTable({
    data: data?.data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true,
    pageCount: data?.last_page || 1,
    state: { pagination },
    onPaginationChange: setPagination,
  });
  const handleDelete = async (item: UserResType) => {
    // Hiển thị hộp thoại xác nhận
    const result = await Swal.fire({
      title: "Bạn có chắc chắn muốn xóa?",
      text: "Hành động này không thể hoàn tác!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    });

    // Nếu người dùng xác nhận xóa
    if (result.isConfirmed) {
      try {
        console.log("item", item);
        // Sử dụng useDeleteProduct để xóa sản phẩm
        // await deleteProductMutation.mutate(item.id, {
        //   onSuccess: () => {
        //     refetch();
        //     // Hiển thị thông báo thành công
        //     Swal.fire({
        //       position: "center",
        //       icon: "success",
        //       title: "Xóa sản phẩm thành công",
        //       showConfirmButton: false,
        //       timer: 1500,
        //     });
        //   },
        // });
      } catch (error) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Xóa sản phẩm thất bại",
          text: "Có lỗi xảy ra, vui lòng thử lại sau.",
        });
      }
    }
  };
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;
  return (
    <div className={styles.container}>
      {/* Table */}
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

                    {/* Add search input for filterable columns */}
                    {header.column.id ===
                    "role" ? null : header.column.getCanFilter() ? (
                      <input
                        type="text"
                        onChange={(e) =>
                          header.column.setFilterValue(e.target.value)
                        }
                        placeholder={`Search ${header.column.id}`}
                        style={{ display: "block", marginTop: "4px" }}
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
      </div>

      {/* Pagination Controls */}
      <div className={styles.pagination}>
        <button
          onClick={() =>
            setPagination((prev) => ({
              ...prev,
              pageIndex: Math.max(prev.pageIndex - 1, 0),
            }))
          }
          disabled={pagination.pageIndex === 0}
        >
          Previous
        </button>
        <span>
          Page{" "}
          <strong>
            {pagination.pageIndex + 1} of {data?.last_page || 1}
          </strong>
        </span>
        <button
          onClick={() =>
            setPagination((prev) => ({
              ...prev,
              pageIndex: Math.min(
                prev.pageIndex + 1,
                (data?.last_page || 1) - 1
              ),
            }))
          }
          disabled={pagination.pageIndex + 1 >= (data?.last_page || 1)}
        >
          Next
        </button>
        <select
          value={pagination.pageSize}
          onChange={(e) =>
            setPagination((prev) => ({
              ...prev,
              pageSize: Number(e.target.value),
              pageIndex: 0, // Reset to first page when changing page size
            }))
          }
        >
          {[2, 3, 5].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default UsersPage;
