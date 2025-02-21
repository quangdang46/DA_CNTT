Hướng dẫn chạy dự án Frontend Next.js và Backend Laravel 8.2.12

Dưới đây là hướng dẫn chi tiết để thiết lập và chạy dự án bao gồm frontend sử dụng Next.js và backend sử dụng Laravel 8.2.12. Dự án cũng bao gồm cơ sở dữ liệu với hai cách khởi tạo: sử dụng lệnh `php artisan migrate:fresh --seed` hoặc import file SQL.

------------------------------------------------------------

Yêu cầu hệ thống

Trước khi bắt đầu, hãy đảm bảo rằng bạn đã cài đặt các công cụ sau:
- Node.js (>= 16.x)
- PHP (>= 8.2)
- Composer
- Xampp (8.2.12 / PHP 8.2.12)

------------------------------------------------------------

Bước 1: Cấu trúc mã nguồn
Dự án sẽ có hai thư mục chính:
- frontend/: Chứa mã nguồn Next.js.
- backend/: Chứa mã nguồn Laravel phiên bản PHP 8.2.12
- ImportData_vn_units.sql: Chứa dữ liệu tên quận, huyện, tỉnh ở Việt Nam
- mobile_app.sql: Chứa toàn bộ dữ liệu của dự án

------------------------------------------------------------

Bước 2: Cài đặt Backend (Laravel)

1. Di chuyển vào thư mục backend:
   cd backend

2. Cài đặt các dependencies của Laravel:
   composer install

3. Sao chép file `.env.example` thành `.env` hoặc dùng luôn file `.env` mặc định.

4. Khởi tạo cơ sở dữ liệu bằng một trong hai cách sau:
   - Tạo 1 database có tên `mobile_app` ở phpMyAdmin (bắt buộc)

   Cách 1: Sử dụng lệnh `migrate:fresh --seed`
   - Lệnh này sẽ tạo cơ sở dữ liệu random từ các migration và seed dữ liệu mẫu:
     php artisan migrate:fresh --seed
   - Sau khi tạo xong cần import thêm dữ liệu về vị trí vào với tệp `ImportData_vn_units.sql`

   Cách 2: Import file SQL thủ công
   - Mở phpMyAdmin và import vào (Import > Chọn file mobile_app.sql > Thực thi)

5. Sau khi hoàn thành, bạn có thể khởi động server Laravel:
   php artisan serve
   - Backend sẽ chạy tại `http://127.0.0.1:8000`.

------------------------------------------------------------

Bước 3: Cài đặt Frontend (Next.js)

1. Di chuyển vào thư mục frontend:
   cd frontend

2. Cài đặt các dependencies của Next.js:
   npm install

3. Cập nhật file `.env` với URL của backend hoặc dùng mặc định:
   NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api

4. Khởi động server Next.js:
   npm run dev
   - Sau khi hoàn thành các bước trên, bạn có thể truy cập vào frontend tại `http://localhost:3000`

------------------------------------------------------------

Tài khoản mặc định
Nếu Laravel sử dụng seeder, có thể thêm một dòng nhắc rằng tài khoản này được tạo qua quá trình seed

- Admin:
  - Email: admin@example.com
  - Password: admin@example.com
- User:
  - Email: guest@example.com
  - Password: guest@example.com

------------------------------------------------------------

Tài khoản ngân hàng

Ngân hàng: NCB
Số thẻ: 9704198526191432198
Tên chủ thẻ: NGUYEN VAN A
Ngày phát hành: 07/15
Mật khẩu OTP: 123456

------------------------------------------------------------

Ghi chú

- Đảm bảo rằng Xampp đang chạy trước khi thực hiện các lệnh liên quan đến cơ sở dữ liệu.
- Nếu bạn muốn thay đổi dữ liệu mẫu, bạn có thể chỉnh sửa file seeder trong thư mục `database/seeders`.
