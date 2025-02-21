import React from "react";
interface AttributeTableProps {
  title: string;
  attributes: {
    label: string;
    value: string | number;
  }[];
}

export default function AttributeTable({
  title,
  attributes,
}: AttributeTableProps) {
  return (
    <>
      <h3 className="tm-attributes-title">{title}</h3>
      <table className="shop_attributes">
        <tbody>
          {attributes.map((item, index) => (
            <tr key={index}>
              <th>{item.label}</th>
              <td>
                <p>{item.value}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
