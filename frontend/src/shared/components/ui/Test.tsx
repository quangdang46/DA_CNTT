"use client";
import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import styles from "./a.module.css";
const items = Array.from({ length: 50 }, (_, i) => `Item ${i + 1}`);

const EmblaCarouselExample = () => {
  const [emblaRef] = useEmblaCarousel({
    slidesToScroll: 1, // Scroll theo từng trang
    loop: false,
  });

  const itemsPerPage = 10; // 5 phần tử/hàng x 2 hàng
  const totalPages = Math.ceil(items.length / itemsPerPage);

  // Chia danh sách thành các trang
  const paginatedItems = Array.from({ length: totalPages }, (_, i) =>
    items.slice(i * itemsPerPage, (i + 1) * itemsPerPage)
  );

  return (
    <div>
      <div ref={emblaRef} className={styles.embla}>
        <div className={styles.embla__container}>
          {paginatedItems.map((page, pageIndex) => (
            <div className={styles.embla__slide} key={pageIndex}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(5, 1fr)", // 5 phần tử trên mỗi hàng
                  gap: "10px",
                }}
              >
                {page.map((item, index) => (
                  <div
                    key={index}
                    style={{
                      border: "1px solid #ccc",
                      padding: "10px",
                      textAlign: "center",
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmblaCarouselExample;
