import Image from "next/image";
import React from "react";

export default function ShopArchiveHeader() {
  return (
    <div className="shop-archive-header">
      <div className="jumbotron">
        <div className="jumbotron-img">
          <Image
            width={416}
            height={283}
            alt=""
            src="https://plus.unsplash.com/premium_photo-1736780995479-bc82c2bffa2a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="jumbo-image alignright"
          />
        </div>
        <div className="jumbotron-caption">
          <h3 className="jumbo-title">Virtual Reality Headsets</h3>
          <p className="jumbo-subtitle">
            Nullam dignissim elit ut urna rutrum, a fermentum mi auctor. Mauris
            efficitur magna orci, et dignissim lacus scelerisque sit amet. Proin
            malesuada tincidunt nisl ac commodo. Vivamus eleifend porttitor ex
            sit amet suscipit. Vestibulum at ullamcorper lacus, vel facilisis
            arcu. Aliquam erat volutpat.
            <br />
            <br />
            Maecenas in sodales nisl. Pellentesque ac nibh mi. Ut lobortis odio
            nulla, congue rhoncus risus facilisis eget. Orci varius natoque
            penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            <a href="#">read more →</a>
          </p>
        </div>
        {/* .jumbotron-caption */}
      </div>
      {/* .jumbotron */}
    </div>
  );
}
