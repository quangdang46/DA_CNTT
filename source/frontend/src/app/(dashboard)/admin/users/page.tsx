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
import { useEffect, useMemo, useRef, useState } from "react";
import Swal from "sweetalert2";

const UsersPage = () => {
  const { mutate: updateUser } = userApiRequest.useUpdateUser();
  const { mutate: deleteUser } = userApiRequest.useDeleteUser();
  const [editingRowId, setEditingRowId] = useState<string | null>(null);
  const [updatedData, setUpdatedData] = useState<
    Record<string, Partial<UserResType>>
  >({}); // Use Record<string, Partial<UserResType>>
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
        cell: ({ row, getValue }) => {
          const isEditing = row.original.id === editingRowId;
          return isEditing ? (
            <input
              type="number"
              defaultValue={getValue() as number}
              onBlur={(e) =>
                handleUpdateField(
                  row.original.id,
                  "loyalty_points",
                  e.target.value
                )
              }
            />
          ) : (
            getValue()
          );
        },
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
        cell: ({ row, getValue }) => {
          const isEditing = row.original.id === editingRowId;

          return isEditing ? (
            <select
              defaultValue={getValue() as string}
              onChange={(e) =>
                handleUpdateField(row.original.id, "role", e.target.value)
              }
            >
              <option value="admin">Admin</option>
              <option value="guest">Guest</option>
              <option value="employee">Employee</option>
            </select>
          ) : (
            <span>{getValue() as string}</span>
          );
        },
        filterFn: (row, columnId, filterValue) => {
          if (!filterValue) return true; // Show all if no filter is applied
          return row.getValue(columnId) === filterValue;
        },
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const isEditing = row.original.id === editingRowId;

          return isEditing ? (
            <div>
              <button onClick={() => handleSave(row.original)}>Save</button>
              <button onClick={() => setEditingRowId(null)}>Cancel</button>
            </div>
          ) : (
            <div>
              <button onClick={() => setEditingRowId(row.original.id)}>
                Edit
              </button>
              <button onClick={() => handleDelete(row.original)}>Delete</button>
            </div>
          );
        },
      },
    ],
    [editingRowId]
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

  const handleUpdateField = (
    id: string,
    field: keyof UserResType,
    value: string | number
  ) => {
    setUpdatedData((prev) => {
      const newState = {
        ...prev,
        [id]: {
          ...(prev[id] || {}),
          [field]: field === "loyalty_points" ? Number(value) : value, // Chuyển đổi thành số nếu là điểm
        },
      };
      console.log("newState", newState);
      return newState;
    });
  };
  const updatedDataRef = useRef(updatedData);

  useEffect(() => {
    updatedDataRef.current = updatedData;
  }, [updatedData]);
  const handleSave = async (item: UserResType) => {
    try {
      const updatedFields = updatedDataRef.current[item.id];
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, update it!",
      });
      if (!result.isConfirmed) {
        return;
      }
      if (!updatedFields) {
        return;
      }
      await updateUser(
        {
          id: item.id,
          body: updatedFields,
        },
        {
          onSuccess: (data) => {
            if (data.success) {
              setEditingRowId(null);
              setUpdatedData({});
              refetch(); // Refetch data to reflect changes

              // Hiển thị thong bao thanh cong
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Cap nhat thanh cong",
                showConfirmButton: false,
                timer: 1500,
              });
              return;
            }
            // Hiển thị thong bao loi
            Swal.fire({
              position: "center",
              icon: "error",
              title: "Cap nhat that bai",
              showConfirmButton: false,
              timer: 1500,
            });
          },
          onError: () => {
            // Hiển thị thong bao loi
            Swal.fire({
              position: "center",
              icon: "error",
              title: "Cap nhat that bai",
              showConfirmButton: false,
              timer: 1500,
            });
          },
        }
      );



      // Reset state
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Cập nhật thất bại",
        text: "Có lỗi xảy ra, vui lòng thử lại sau.",
      });
    }
  };
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
        await deleteUser(item.id, {
          onSuccess: (data) => {
            if (data.success) {
              refetch();
              // Hiển thị thong bao thanh cong
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Xóa thanh cong",
                showConfirmButton: false,
                timer: 1500,
              });
              return;
            }

            // Hiện thị thong bao loi
            Swal.fire({
              position: "center",
              icon: "error",
              title: "Xóa thất bài",
              text: "Có lỗi xảy ra, vui，请 thử lại sau.",
            });
          },
          onError: () => {
            // Hiển thị thong bao loi
            Swal.fire({
              position: "center",
              icon: "error",
              title: "Xóa thất bài",
              text: "Có lỗi xảy ra, vui lòng thử lại sau.",
            });
          },
        });
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
