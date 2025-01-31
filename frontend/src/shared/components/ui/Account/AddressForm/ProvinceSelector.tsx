import { useState } from "react";
import locationApiRequest from "@/shared/apiRequests/locationApi";
import { Province } from "@/shared/types/LocationTypes";



interface ProvinceSelectorProps {
  onSelect: (selectedProvince: Province) => void;
}

const ProvinceSelector: React.FC<ProvinceSelectorProps> = ({ onSelect }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const { data } = locationApiRequest.useProvinces();

  const filteredProvinces = data?.data.filter((province) =>
    province.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Tìm tỉnh..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="grid-container">
        {filteredProvinces?.map((province) => (
          <div
            key={province.code}
            className="grid-item"
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
