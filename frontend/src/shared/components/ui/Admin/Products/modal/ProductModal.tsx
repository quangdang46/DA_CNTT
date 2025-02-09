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
/*

  battery_capacity: string;
  battery_type: string;
  camera_resolution: string;
  chip: string;
  created_at: string;
  dimensions: string;
  id: number;
  operating_system: string;
  product_id: number;
  ram: string;
  storage: string;
*/
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
  const [attributes, setAttributes] = useState<
    { key: string; value: string }[]
  >([]);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
    console.log("Uploaded Images:", images);
    console.log("Attributes:", attributes);
    onClose();
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
        <form onSubmit={handleSubmit}>
          <div className={styles.formGrid}>
            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label className={styles.label}>Tên sản phẩm</label>
              <input
                type="text"
                name="name"
                value={formData.name}
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
                value={formData.price}
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
                value={formData.weight}
                onChange={handleChange}
                step="0.01"
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Trạng thái</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className={styles.select}
              >
                <option value="available">Còn hàng</option>
                <option value="out_of_stock">Hết hàng</option>
                <option value="discontinued">Ngừng kinh doanh</option>
              </select>
            </div>

            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label className={styles.label}>Mô tả</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className={styles.textarea}
                rows={3}
              />
            </div>

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
