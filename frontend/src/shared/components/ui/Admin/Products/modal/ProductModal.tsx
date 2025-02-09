"use client";
import { Modal } from "@/shared/components/ui/Admin/Model/Modal";
import { Product } from "@/shared/types/ProductTypes";
import styles from "./productmodal.module.css";
import React, { useEffect, useState } from "react";
interface Props {
  isOpen: boolean;
  onClose: () => void;
  product?: Product;
}
export default function ProductModal({ isOpen, onClose, product }: Props) {
  const [formData, setFormData] = useState<Product>({
    name: "",
    description: "",
    price: 0,
    status: "available",
    slug: "",
    review_count: 0,
    weight: 0,
    category_id: 1,
  } as Product);

  const [images, setImages] = useState<File[]>([]);

  useEffect(() => {
    if (product) {
      setFormData(product);
    }
  }, [product]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages([...images, ...Array.from(e.target.files)]);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
    console.log("Uploaded Images:", images);
    onClose();
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.modalContainer}>
        <h2 className={styles.title}>
          {product ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGrid}>
            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label className={styles.label}>Tên sản phẩm</label>
              <input
                type="text"
                name="name"
                value={formData?.name}
                onChange={handleChange}
                className={styles.input}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Giá</label>
              <input
                type="number"
                name="price"
                value={formData?.price}
                onChange={handleChange}
                className={styles.input}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Trọng lượng (kg)</label>
              <input
                type="number"
                name="weight"
                value={formData?.weight}
                onChange={handleChange}
                step="0.01"
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Trạng thái</label>
              <select
                name="status"
                value={formData?.status}
                onChange={handleChange}
                className={styles.select}
              >
                <option value="available">Còn hàng</option>
                <option value="out_of_stock">Hết hàng</option>
                <option value="discontinued">Ngừng kinh doanh</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Slug</label>
              <input
                type="text"
                name="slug"
                value={formData?.slug}
                onChange={handleChange}
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Danh mục</label>
              <select
                name="category_id"
                value={formData?.category_id}
                onChange={handleChange}
                className={styles.select}
              >
                <option value="1">Điện thoại</option>
                <option value="2">Laptop</option>
                <option value="3">Phụ kiện</option>
              </select>
            </div>

            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label className={styles.label}>Mô tả</label>
              <textarea
                name="description"
                value={formData?.description}
                onChange={handleChange}
                className={styles.textarea}
                rows={3}
              />
            </div>

            {/* Upload Ảnh */}
            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label className={styles.label}>Hình ảnh</label>
              <div
                className={styles.uploadContainer}
                onClick={() => document.getElementById("fileUpload")?.click()}
              >
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
          </div>

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
