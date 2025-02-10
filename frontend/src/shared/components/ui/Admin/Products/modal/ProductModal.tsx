"use client";
import { Modal } from "@/shared/components/ui/Admin/Model/Modal";
import { Product } from "@/shared/types/ProductTypes";
import styles from "./productmodal.module.css";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import uploadApiRequest from "@/shared/apiRequests/upload";
import { categoryApiRequest } from "@/shared/apiRequests/category";
interface Props {
  isOpen: boolean;
  onClose: () => void;
  product?: Product;
}

const availableAttributes = [
  { id: "battery_capacity", name: "Nội dung pin" },
  { id: "battery_type", name: "Loại pin" },
  { id: "camera_resolution", name: "Xây dựng mạng" },
  { id: "chip", name: "Chip" },
  { id: "dimensions", name: "Kich thuoc" },
  { id: "operating_system", name: "He đồ" },
  { id: "ram", name: "Dung luong ram" },
  { id: "storage", name: "Dung luong bo nho" },
];
const productSchema = z.object({
  name: z.string().min(1, "Tên sản phẩm không được để trống"),
  price: z.number().min(1, "Giá phải lớn hơn 0"),
  weight: z.number().min(0, "Trọng lượng không hợp lệ"),
  status: z.enum(["available", "out_of_stock", "discontinued"]),
  description: z.string().optional(),
  attributes: z.record(z.string(), z.string()).optional(),
});

export default function ProductModal({ isOpen, onClose, product }: Props) {
  const { data } = categoryApiRequest.useGetCategories();
  const categories = data?.data || [];
  const uploadFileMutation = uploadApiRequest.useUploadFile();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<File[]>([]);
  const [attributes, setAttributes] = useState<
    { key: string; value: string }[]
  >(() =>
    product?.attributes
      ? Object.entries(product.attributes).map(([key, value]) => ({
          key,
          value: value.toString(),
        }))
      : []
  );

  const defaultValues = useMemo(
    () => ({
      name: product?.name || "",
      description: product?.description || "",
      price: product?.price || 0,
      status: product?.status || "available",
      slug: product?.slug || "",
      review_count: product?.review_count || 0,
      weight: product?.weight || 0,
      category_id: product?.category_id || 1,
    }),
    [product]
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Product>({
    resolver: zodResolver(productSchema),
    defaultValues,
  });

  //   useEffect(() => {
  //     if (product) {
  //       reset(defaultValues);
  //     }
  //   }, [product, reset, defaultValues]);

  //   useEffect(() => {
  //     if (product) {
  //       reset({
  //         name: product.name || "",
  //         description: product.description || "",
  //         price: product.price || 0,
  //         status: product.status || "available",
  //         slug: product.slug || "",
  //         review_count: product.review_count || 0,
  //         weight: product.weight || 0,
  //         category_id: product.category_id || 1,
  //       });

  //       setImages(
  //         product.images ? product.images.map((item) => new File([], item.image_url)) : []
  //       );

  //       const updatedAttributes = product.attributes
  //         ? Object.entries(product.attributes).map(([key, value]) => ({
  //             key,
  //             value: value.toString(),
  //           }))
  //         : [];

  //       console.log("Updated Attributes:", updatedAttributes);
  //       setAttributes(updatedAttributes);
  //     }
  //   }, [product, reset]);

  useEffect(() => {
    if (product) {
      reset({
        name: product.name || "",
        description: product.description || "",
        price: product.price || 0,
        status: product.status || "available",
        slug: product.slug || "",
        review_count: product.review_count || 0,
        weight: product.weight || 0,
        category_id: product.category_id || 1,
      });

      // Lưu URL của ảnh hiện có
      setImages(
        product.images ? product.images.map((item) => item.image_url) : []
      );

      const updatedAttributes = product.attributes
        ? Object.entries(product.attributes).map(([key, value]) => ({
            key,
            value: value.toString(),
          }))
        : [];
      setAttributes(updatedAttributes);
    }
  }, [product, reset]);

  //   const handleFileChange = useCallback(
  //     (e: React.ChangeEvent<HTMLInputElement>) => {
  //       if (e.target.files) {
  //         setImages((prev) => [...prev, ...Array.from(e.target.files)]);
  //       }
  //     },
  //     []
  //   );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        setImages((prev) => [...prev, ...Array.from(e.target.files)]);
      }
    },
    []
  );
  const addAttribute = () => {
    setAttributes([...attributes, { key: "", value: "" }]);
  };

  //   const removeImage = useCallback((index: number) => {
  //     setImages((prev) => prev.filter((_, i) => i !== index));
  //   }, []);
  const removeImage = useCallback((index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const handleAttributeChange = useCallback(
    (index: number, key: string, value: string) => {
      setAttributes((prev) =>
        prev.map((attr, i) => (i === index ? { key, value } : attr))
      );
    },
    []
  );

  //   const onSubmit = async (data: Product) => {
  //     try {
  //       const imageUrls = await Promise.all(
  //         images.map((image) =>
  //           uploadFileMutation.mutateAsync({ file: image }).then((res) => res.url)
  //         )
  //       );
  //       const attributesObject = Object.fromEntries(
  //         attributes.map(({ key, value }) => [key, value])
  //       );
  //       console.log("Submitted Data:", {
  //         ...data,
  //         attributes: attributesObject,
  //         images: imageUrls,
  //       });
  //       onClose();
  //     } catch (error) {
  //       console.error("Error submitting form:", error);
  //     }
  //   };

  const onSubmit = async (data: Product) => {
    try {
      // Phân loại ảnh hiện có và ảnh mới
      const existingImageUrls = images.filter((img) => typeof img === "string");
      const newImages = images.filter((img) => img instanceof File);

      // Upload ảnh mới và lấy URL
      const newImageUrls = await Promise.all(
        newImages.map((image) =>
          uploadFileMutation.mutateAsync({ file: image }).then((res) => res.url)
        )
      );

      // Kết hợp URL của ảnh hiện có và ảnh mới
      const allImageUrls = [...existingImageUrls, ...newImageUrls];

      // Chuyển đổi attributes thành array
      const attributesArray = attributes.map((attr) => ({
        key: attr.key, // Lấy tên thuộc tính từ `value.key`
        value: attr.value, // Lấy giá trị thuộc tính từ `value.value`
      }));

      // Dữ liệu gửi lên backend
      console.log("Submitted Data:", {
        ...data,
        attributes: attributesArray,
        images: allImageUrls,
      });

      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const removeAttribute = (index: number) => {
    setAttributes(attributes.filter((_, i) => i !== index));
  };
  const remainingAttributes = availableAttributes.filter(
    (attr) => !attributes.some((a) => a.key === attr.id)
  );
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.modalContainer}>
        <h2 className={styles.title}>
          {product ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.formGrid}>
            {/* Tên sản phẩm */}
            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label className={styles.label}>Tên sản phẩm</label>
              <input
                type="text"
                {...register("name")}
                className={styles.input}
              />
              {errors.name && (
                <p className={styles.error}>{errors.name.message}</p>
              )}
            </div>

            {/* Giá */}
            <div className={styles.formGroup}>
              <label className={styles.label}>Giá</label>
              <input
                type="number"
                {...register("price", { valueAsNumber: true })}
                className={styles.input}
              />
              {errors.price && (
                <p className={styles.error}>{errors.price.message}</p>
              )}
            </div>

            {/* Trọng lượng */}
            <div className={styles.formGroup}>
              <label className={styles.label}>Trọng lượng (kg)</label>
              <input
                type="number"
                {...register("weight", { valueAsNumber: true })}
                step="0.01"
                className={styles.input}
              />
              {errors.weight && (
                <p className={styles.error}>{errors.weight.message}</p>
              )}
            </div>

            {/* Trạng thái */}
            <div className={styles.formGroup}>
              <label className={styles.label}>Trạng thái</label>
              <select {...register("status")} className={styles.select}>
                <option value="available">Còn hàng</option>
                <option value="out_of_stock">Hết hàng</option>
                <option value="discontinued">Ngừng kinh doanh</option>
              </select>
              {errors.status && (
                <p className={styles.error}>{errors.status.message}</p>
              )}
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Category</label>
              <select {...register("category_id")} className={styles.select}>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.status && (
                <p className={styles.error}>{errors.status.message}</p>
              )}
            </div>
            {/* Mô tả */}
            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label className={styles.label}>Mô tả</label>
              <textarea
                {...register("description")}
                className={styles.textarea}
                rows={3}
              />
            </div>

            {/* Hình ảnh */}
            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label className={styles.label}>Hình ảnh</label>
              <div
                className={styles.uploadContainer}
                onClick={() => fileInputRef.current?.click()}
              >
                📷 Click để chọn ảnh
              </div>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                hidden
                onChange={handleFileChange}
              />
              <div className={styles.imagePreview}>
                {images.map((img, index) => (
                  <div key={index} className={styles.imageItem}>
                    {/* <img src={URL.createObjectURL(img)} alt="preview" />
                     */}

                    {typeof img === "string" ? (
                      <img src={img} alt={`Product Image ${index}`} />
                    ) : (
                      <img
                        src={URL.createObjectURL(img)}
                        alt={`New Image ${index}`}
                      />
                    )}
                    <button
                      className={styles.deleteImage}
                      onClick={() => removeImage(index)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Thuộc tính */}
            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label className={styles.label}>Thuộc tính</label>
              {attributes.map((attr, index) => (
                <div key={index} className={styles.attributeRow}>
                  <select
                    value={attr.key}
                    onChange={(e) =>
                      handleAttributeChange(index, e.target.value, attr.value)
                    }
                    className={styles.select}
                  >
                    <option value="">Chọn thuộc tính</option>
                    {availableAttributes.map((option) => (
                      <option
                        key={option.id}
                        value={option.id}
                        disabled={attributes.some((a) => a.key === option.id)}
                      >
                        {option.name}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    value={attr.value}
                    onChange={(e) =>
                      handleAttributeChange(index, attr.key, e.target.value)
                    }
                    className={styles.input}
                    placeholder="Nhập giá trị"
                  />
                  <button
                    type="button"
                    className={styles.deleteAttribute}
                    onClick={() => removeAttribute(index)}
                  >
                    ×
                  </button>
                </div>
              ))}
              {remainingAttributes.length > 0 && (
                <button
                  type="button"
                  className={styles.addAttribute}
                  onClick={addAttribute}
                >
                  + Thêm thuộc tính
                </button>
              )}
            </div>
          </div>

          {/* Nút Hủy và Thêm */}
          <div className={styles.buttonGroup}>
            <button
              type="button"
              className={`${styles.button} ${styles.cancelButton}`}
              onClick={onClose}
            >
              Hủy
            </button>
            <button
              type="submit"
              className={`${styles.button} ${styles.submitButton}`}
            >
              Thêm
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
