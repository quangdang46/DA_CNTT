// Định nghĩa các kiểu dữ liệu cho Tỉnh, Quận, Phường
export interface Province {
  id: string; // ID tỉnh
  name: string; // Tên tỉnh
}

export interface District {
  id: string; // ID quận
  name: string; // Tên quận
  provinceId: string; // ID tỉnh liên quan
}

export interface Ward {
  id: string; // ID phường
  name: string; // Tên phường
  districtId: string; // ID quận liên quan
}
