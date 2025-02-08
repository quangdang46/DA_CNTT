// /* eslint-disable @typescript-eslint/no-explicit-any */
// import React, { useState } from "react";
// import styles from "./TableFilter.module.css"; // Import CSS module

// interface FilterField {
//   key: string;
//   label?: string;
//   type: "text" | "number" | "select";
//   options?: { value: string; label: string }[];
// }

// interface TableFilterProps {
//   fields: FilterField[];
//   onFilter: (filters: Record<string, any>) => void;
// }

// const TableFilter: React.FC<TableFilterProps> = ({ fields, onFilter }) => {
//   const [filters, setFilters] = useState<Record<string, any>>({});

//   const handleChange = (key: string, value: any) => {
//     setFilters((prev) => ({ ...prev, [key]: value }));
//   };

//   return (
//     <div className={styles.filterContainer}>
//       {fields.map((field) => (
//         <div key={field.key} className={styles.filterGroup}>
//           <label>{field.label}</label>
//           {field.type === "text" || field.type === "number" ? (
//             <input
//               type={field.type}
//               className={styles.filterInput}
//               onChange={(e) => handleChange(field.key, e.target.value)}
//             />
//           ) : field.type === "select" && field.options ? (
//             <select
//               className={styles.filterSelect}
//               onChange={(e) => handleChange(field.key, e.target.value)}
//             >
//               <option value="">All</option>
//               {field.options.map((option) => (
//                 <option key={option.value} value={option.value}>
//                   {option.label}
//                 </option>
//               ))}
//             </select>
//           ) : null}
//         </div>
//       ))}
//       <button onClick={() => onFilter(filters)} className={styles.filterButton}>
//         Apply Filter
//       </button>
//     </div>
//   );
// };

// export default TableFilter;


import React, { useState, useCallback } from "react";
import styles from "./TableFilter.module.css"; // Import CSS module

interface FilterField {
  key: string;
  label?: string;
  type: "text" | "number" | "select";
  options?: { value: string; label: string }[];
}

interface TableFilterProps {
  fields: FilterField[];
  onFilter: (filters: Record<string, string | number>) => void;
}

const TableFilter: React.FC<TableFilterProps> = ({ fields, onFilter }) => {
  const [filters, setFilters] = useState<Record<string, string | number>>({});

  const handleChange = useCallback((key: string, value: string | number) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleApplyFilter = useCallback(() => {
    onFilter(filters);
  }, [filters, onFilter]);

  return (
    <div className={styles.filterContainer}>
      {fields.map((field) => (
        <div key={field.key} className={styles.filterGroup}>
          {field.label && <label>{field.label}</label>}
          {field.type === "text" || field.type === "number" ? (
            <input
              type={field.type}
              className={styles.filterInput}
              onChange={(e) => handleChange(field.key, e.target.value)}
              aria-label={field.label || `Filter by ${field.key}`}
            />
          ) : field.type === "select" && field.options ? (
            <select
              className={styles.filterSelect}
              onChange={(e) => handleChange(field.key, e.target.value)}
              aria-label={field.label || `Filter by ${field.key}`}
            >
              <option value="">All</option>
              {field.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : null}
        </div>
      ))}
      <button onClick={handleApplyFilter} className={styles.filterButton}>
        Apply Filter
      </button>
    </div>
  );
};

export default TableFilter;