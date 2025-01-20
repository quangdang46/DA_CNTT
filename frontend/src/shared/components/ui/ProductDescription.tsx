import Image from "next/image";
import React from "react";
interface ProductDescriptionProps {
  title: string;
  description: string;
  videoUrl: string;
  images: string[];
  activeTab: string;
}
export default function ProductDescription({
  title,
  description,
  videoUrl,
  images,
  activeTab,
}: ProductDescriptionProps) {
  const isActive = activeTab === "description";
  return (
    <>
      <div
        className="tab-pane panel wc-tab"
        id="tab-description"
        role="tabpanel"
        style={isActive ? { display: "block" } : { display: "none" }}
      >
        <h2>{title}</h2>
        <h1 style={{ textAlign: "center" }}>
          Exceptional color. Authentic images.
        </h1>
        <p
          style={{
            textAlign: "center",
            maxWidth: "1160px",
            margin: "auto auto 60px",
          }}
        >
          {description}
        </p>
        <div style={{ textAlign: "center" }}>
          {/* <iframe
            width="854"
            height="480"
            allowFullScreen={true}
            src={videoUrl}
          ></iframe> */}
        </div>
        {images &&
          images.map((image, index) => (
            <div key={index} className="outer-wrap">
              {index % 2 === 0 ? (
                <>
                  <div className="image-info">
                    <Image
                      src={image}
                      alt={`description-image-${index}`}
                      width={0}
                      height={0}
                      sizes="100vw"
                      style={{ width: "500px", height: "500px" }}
                    />
                  </div>
                  <div className="content-info">
                    <h1 style={{ textAlign: "left" }}>
                      Dynamic brightness <br />
                      reveals hidden details
                    </h1>
                    <p style={{ textAlign: "left" }}>{description}</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="content-info">
                    <h1 style={{ textAlign: "left" }}>
                      Dynamic brightness <br />
                      reveals hidden details
                    </h1>
                    <p style={{ textAlign: "left" }}>{description}</p>
                  </div>
                  <div className="image-info">
                    <Image
                      src={image}
                      alt={`description-image-${index}`}
                      width={0}
                      height={0}
                      sizes="100vw"
                      style={{ width: "500px", height: "500px" }}
                    />
                  </div>
                </>
              )}
            </div>
          ))}
      </div>
    </>
  );
}
