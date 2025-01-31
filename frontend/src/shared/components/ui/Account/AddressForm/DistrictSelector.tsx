import { useState } from "react";
import { District } from "@/shared/types/LocationTypes";
import locationApiRequest from "@/shared/apiRequests/locationApi";

interface DistrictSelectorProps {
  provinceId: string;
  onSelect: (selectedDistrict: District) => void;
}

const DistrictSelector: React.FC<DistrictSelectorProps> = ({
  provinceId,
  onSelect,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const {
    data: districts,
    error,
    isLoading,
  } = locationApiRequest.useDistricts(provinceId);
  const filteredDistricts = districts?.data.filter((district) =>
    district.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="location-selector">
      <div className="search-container">
        <input
          type="text"
          placeholder="Tìm quận..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="location-list">
        {filteredDistricts?.map((district) => (
          <div
            key={district.code}
            className="location-item"
            onClick={() => onSelect(district)}
          >
            {district.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DistrictSelector;
