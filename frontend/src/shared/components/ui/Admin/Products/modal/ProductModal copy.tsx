"use client";
import { Modal } from "@/shared/components/ui/Admin/Model/Modal";
import { Product } from "@/shared/types/ProductTypes";
import styles from "./productmodal.module.css";
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import uploadApiRequest from "@/shared/apiRequests/upload";
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
  { id: "created_at", name: "Ngày tạo" },
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
 
  const uploadFileMutation = uploadApiRequest.useUploadFile();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Product>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      status: "available",
      slug: "",
      review_count: 0,
      weight: 0,
      category_id: 1,
    },
  });

  const [images, setImages] = useState<File[]>([]);
  const [attributes, setAttributes] = useState<
    { key: string; value: string }[]
  >([]);

  useEffect(() => {
    if (product) {
      reset(product);
      if (product.attributes) {
        setAttributes(
          Object.entries(product.attributes).map(([key, value]) => ({
            key,
            value: value.toString(),
          }))
        );
      }
    } else {
      reset();
      setAttributes([]);
    }
  }, [product, reset]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages([...images, ...Array.from(e.target.files)]);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const addAttribute = () => {
    setAttributes([...attributes, { key: "", value: "" }]);
  };

  const removeAttribute = (index: number) => {
    setAttributes(attributes.filter((_, i) => i !== index));
  };

  const handleAttributeChange = (index: number, key: string, value: string) => {
    const updatedAttributes = [...attributes];
    updatedAttributes[index] = { key, value };
    setAttributes(updatedAttributes);
  };

  const onSubmit = async (data: Product) => {
    try {
      const imageUrls = await Promise.all(
        images.map(async (image) => {
          const payload = { file: image }; // Payload cho uploadApiRequest
          const response = await uploadFileMutation.mutateAsync(payload);

          return response.url; // Lấy URL từ response
        })
      );
      console.log("Image URLs:", imageUrls);
      // Step 2: Prepare data to send to backend
      const attributesObject = attributes.reduce((acc, { key, value }) => {
        acc[key] = value;
        return acc;
      }, {} as Record<string, string>);

      const submittedData = {
        ...data,
        attributes: attributesObject,
        images: imageUrls, // Thêm danh sách URL của ảnh vào dữ liệu gửi đi
      };

      console.log("Submitted Data:", submittedData);

      // Send data to backend
      //   await axios.post("/api/products", submittedData);

      // Close modal after successful submission
      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
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
                onClick={() => document.getElementById("fileUpload")?.click()}
              >
                <span className={styles.uploadIcon}>📷</span>
                Click để chọn ảnh
              </div>
              <input
                id="fileUpload"
                type="file"
                multiple
                hidden
                onChange={handleFileChange}
              />
              <div className={styles.imagePreview}>
                {images.map((img, index) => (
                  <div key={index} className={styles.imageItem}>
                    <img src={URL.createObjectURL(img)} alt="preview" />
                    <span className={styles.imageInfo}>{img.name}</span>
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
