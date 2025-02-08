// /* eslint-disable @typescript-eslint/no-explicit-any */
// import React, { useState, useEffect } from "react";
// import styles from "./DataTable.module.css"; // Import CSS module
// import TableFilter from "@/shared/components/ui/Admin/Table/TableFilter/TableFilter";

// interface Column {
//   key: string;
//   label: string;
//   renderCell?: (item: any) => React.ReactNode;
// }

// interface FilterConfig {
//   key: string;
//   type: "text" | "number" | "select";
//   options?: { value: string; label: string }[];
// }

// interface DataTableProps {
//   columns: Column[];
//   data: any[];
//   filters: FilterConfig[];
// }

// const DataTable: React.FC<DataTableProps> = ({ columns, data, filters }) => {
//   const [filteredData, setFilteredData] = useState(data);

//   useEffect(() => {
//     setFilteredData(data);
//   }, [data]);

//   const handleFilter = (filters: Record<string, any>) => {
//     const filtered = data.filter((item) =>
//       Object.keys(filters).every((key) =>
//         filters[key]
//           ? String(item[key])
//               .toLowerCase()
//               .includes(String(filters[key]).toLowerCase())
//           : true
//       )
//     );
//     setFilteredData(filtered);
//   };

//   return (
//     <div>
//       <TableFilter fields={filters} onFilter={handleFilter} />

//       <table className={styles.dataTable}>
//         <thead>
//           <tr>
//             {columns.map((col) => (
//               <th key={col.key}>{col.label}</th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {filteredData.map((item, index) => (
//             <tr key={index}>
//               {columns.map((col) => (
//                 <td key={col.key}>
//                   {col.renderCell ? col.renderCell(item) : item[col.key]}
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default DataTable;
import React, { useState, useEffect, useCallback } from "react";
import styles from "./DataTable.module.css";
import TableFilter from "@/shared/components/ui/Admin/Table/TableFilter/TableFilter";

interface Column<T> {
  key: keyof T;
  label: string;
  renderCell?: (item: T) => React.ReactNode;
}

interface FilterConfig {
  key: string;
  type: "text" | "number" | "select";
  options?: { value: string; label: string }[];
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  filters: FilterConfig[];
}

const DataTable = <T extends Record<string, any>>({
  columns,
  data,
  filters,
}: DataTableProps<T>) => {
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const handleFilter = useCallback(
    (filters: Record<string, any>) => {
      const filtered = data.filter((item) =>
        Object.keys(filters).every((key) =>
          filters[key]
            ? String(item[key])
                .toLowerCase()
                .includes(String(filters[key]).toLowerCase())
            : true
        )
      );
      setFilteredData(filtered);
    },
    [data]
  );

  return (
    <div>
      <TableFilter fields={filters} onFilter={handleFilter} />

      <table className={styles.dataTable}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key as string}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index}>
              {columns.map((col) => (
                <td key={col.key as string}>
                  {col.renderCell ? col.renderCell(item) : item[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;