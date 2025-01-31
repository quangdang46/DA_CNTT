import { useState } from "react";
import { Ward } from "@/shared/types/LocationTypes";
import locationApiRequest from "@/shared/apiRequests/locationApi";

interface WardSelectorProps {
  districtId: string;
  onSelect: (selectedWard: Ward) => void;
  curWardId?: string;
}

const WardSelector: React.FC<WardSelectorProps> = ({
  districtId,
  onSelect,
  curWardId,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const {
    data: wards,
    error,
    isLoading,
  } = locationApiRequest.useWards(districtId);
  const filteredWards = wards?.data.filter((ward) =>
    ward.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="location-selector">
      <div className="search-container">
        <input
          type="text"
          placeholder="Tìm phường..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="location-list">
        {filteredWards?.map((ward) => (
          <div
            key={ward.code}
            className={`location-item ${
              ward.code === curWardId ? "active" : ""
            }`}
            onClick={() => onSelect(ward)}
          >
            {ward.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WardSelector;
