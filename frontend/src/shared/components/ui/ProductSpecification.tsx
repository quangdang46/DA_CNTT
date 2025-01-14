import AttributeTable from "@/shared/components/ui/AttributeTable";
import React from "react";
interface Attribute {
  label: string;
  value: string | number;
}

interface ProductSpecificationProps {
  specifications: { title: string; attributes: Attribute[] }[];
  activeTab: string;
}
export default function ProductSpecification({
  specifications,
  activeTab,
}: ProductSpecificationProps) {
  const isActive = activeTab === "specification";

  return (
    <div
      className="tab-pane"
      id="tab-specification"
      role="tabpanel"
      style={isActive ? { display: "block" } : { display: "none" }}
    >
      <div className="tm-shop-attributes-detail like-column columns-3">
        {specifications.map((item, index) => (
          <AttributeTable
            key={index}
            title={item.title}
            attributes={item.attributes}
          />
        ))}
      </div>
    </div>
  );
}
