import GalleryImages from "@/shared/components/ui/GalleryImages";
import GalleryThumbnails from "@/shared/components/ui/GalleryThumbnails";
import { useGalleryContext } from "@/shared/contexts/GalleryContext";
import React from "react";
interface SingleProductGalleryProps {
  thumbnails: string[];
}

export default function SingleProductGallery({
  thumbnails,
}: SingleProductGalleryProps) {
  useGalleryContext().setThumbnails(thumbnails);
  return (
    <div
      id="techmarket-single-product-gallery"
      className="techmarket-single-product-gallery techmarket-single-product-gallery--with-images techmarket-single-product-gallery--columns-4 images"
      data-columns="4"
    >
      <GalleryImages />
      <GalleryThumbnails />
    </div>
  );
}
