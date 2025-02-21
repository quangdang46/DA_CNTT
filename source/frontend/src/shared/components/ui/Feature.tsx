// components/Feature.tsx
import React from "react";

interface FeatureProps {
  icon: React.ReactNode; // Thay đổi kiểu icon thành ReactNode
  title: string;
  subtitle: string;
}

const Feature: React.FC<FeatureProps> = ({ icon, title, subtitle }) => (
  <div className="feature">
    <div className="media">
      <div className="feature-icon d-flex mr-3 tm">{icon}</div>{" "}
      <div className="media-body feature-text">
        <h5 className="mt-0">{title}</h5>
        <span>{subtitle}</span>
      </div>
    </div>
  </div>
);

export default Feature;
