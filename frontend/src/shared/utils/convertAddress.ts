import { Address } from "@/shared/types/LocationTypes";

export function convertAddress(address: Address): string {
  if (!address) return "Chưa chọn địa chỉ mặc định";
  // Truyền đầy đủ thông tin vào dạng chuỗi dễ đọc
  const province = address.province.name || address.province.full_name;
  const district = address.district.name || address.district.full_name;
  const ward = address.ward.name || address.ward.full_name;

  const fullAddress = `${address.address}, ${ward}, ${district}, ${province}`;

  return fullAddress;
}
