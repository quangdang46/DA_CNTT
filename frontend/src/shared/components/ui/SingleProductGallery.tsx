import GalleryImages from "@/shared/components/ui/GalleryImages";
import GalleryThumbnails from "@/shared/components/ui/GalleryThumbnails";
import { GalleryProvider } from "@/shared/contexts/GalleryContext";
import React from "react";

export default function SingleProductGallery() {
  return (
    <div
      id="techmarket-single-product-gallery"
      className="techmarket-single-product-gallery techmarket-single-product-gallery--with-images techmarket-single-product-gallery--columns-4 images"
      data-columns="4"
    >
      <GalleryProvider>
        <GalleryImages />
        <GalleryThumbnails />
      </GalleryProvider>
    </div>
  );
}
