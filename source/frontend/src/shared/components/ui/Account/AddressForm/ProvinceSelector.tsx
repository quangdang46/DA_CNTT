import { useState } from "react";
import locationApiRequest from "@/shared/apiRequests/locationApi";
import { Province } from "@/shared/types/LocationTypes";

interface ProvinceSelectorProps {
  onSelect: (selectedProvince: Province) => void;
  curProvinceId?: string;
}

const ProvinceSelector: React.FC<ProvinceSelectorProps> = ({
  onSelect,
  curProvinceId,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const { data } = locationApiRequest.useProvinces();

  const filteredProvinces = data?.data.filter((province) =>
    province.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="location-selector">
      <div className="search-container">
        <input
          type="text"
          placeholder="Tìm tỉnh..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
      <div className="location-list">
        {filteredProvinces?.map((province) => (
          <div
            key={province.code}
            className={`location-item ${
              province.code === curProvinceId ? "active" : ""
            }`}
            onClick={() => onSelect(province)}
          >
            {province.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProvinceSelector;
