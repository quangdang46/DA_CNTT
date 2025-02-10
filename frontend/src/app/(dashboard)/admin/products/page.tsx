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
import { Product } from "@/shared/types/ProductTypes";
import productApiRequest from "@/shared/apiRequests/product";
import ProductModal from "@/shared/components/ui/Admin/Products/modal/ProductModal";
import Swal from "sweetalert2";

const ProductsPage = () => {
  const deleteProductMutation = productApiRequest.useDeleteProduct();
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [type, setType] = useState("add");
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });
  const openModal = () => {
    setSelectedProduct(null);
    setOpen(true);
  };
  const closeModal = () => setOpen(false);

  // Fetch data using React Query
  const { data, isLoading, isError, refetch } =
    productApiRequest.useGetProductPage({
      page: pagination.pageIndex + 1,
      perPage: pagination.pageSize,
    });

  // Handle Edit and Delete actions
  const handleEdit = (item: Product) => {
    setType("edit");
    setSelectedProduct(item);
    setOpen(true);
  };

  const handleDelete = async (item: Product) => {
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
        console.log("item", item.id);
        // Sử dụng useDeleteProduct để xóa sản phẩm
        await deleteProductMutation.mutate(item.id, {
          onSuccess: () => {
            refetch();
            // Hiển thị thông báo thành công
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Xóa sản phẩm thành công",
              showConfirmButton: false,
              timer: 1500,
            });
          },
        });

        // Thực hiện các hành động khác nếu cần (ví dụ: cập nhật danh sách sản phẩm)
        // Ví dụ: refetch dữ liệu từ API
      } catch (error) {
        // Hiển thị thông báo lỗi nếu xóa thất bại
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Xóa sản phẩm thất bại",
          text: "Có lỗi xảy ra, vui lòng thử lại sau.",
        });
      }
    }
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
        accessorKey: "price",
        header: "Price",
        enableSorting: true,
        cell: ({ getValue }) => `$${getValue()}`,
      },
      {
        accessorKey: "description",
        header: "Description",
        enableSorting: false,
      },
      {
        accessorKey: "slug",
        header: "Slug",
        enableSorting: false,
      },
      {
        accessorKey: "weight",
        header: "Weight",
        enableSorting: true,
      },
      {
        accessorKey: "rating",
        header: "Rating",
        enableSorting: true,
        cell: ({ getValue }) => `${getValue()} ★`,
      },
      {
        accessorKey: "status",
        header: () => (
          <div>
            Status{" "}
            <select
              onChange={(e) =>
                table.getColumn("status")?.setFilterValue(e.target.value)
              }
              style={{ marginLeft: "8px" }}
            >
              <option value="">All</option>
              <option value="available">Available</option>
              <option value="out_of_stock">Out of Stock</option>
              <option value="discontinued">Discontinued</option>
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
            <button onClick={() => handleEdit(row.original)}>Edit</button>
            <button onClick={() => handleDelete(row.original)}>Delete</button>
          </div>
        ),
      },
    ],
    []
  );

  // Initialize React Table
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

  // Render loading or error states
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  return (
    <>
      <ProductModal
        isOpen={open}
        onClose={closeModal}
        product={selectedProduct as Product}
        type={type}
        refetch={refetch}
      ></ProductModal>
      <div className={styles.container}>
        {/* Top Section with Add Button */}
        <div className={styles.top}>
          <button className={styles.addButton} onClick={openModal}>
            Add New
          </button>
        </div>

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
                      "status" ? null : header.column.getCanFilter() ? (
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
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
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
            {[5, 10, 20].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
};

export default ProductsPage;
