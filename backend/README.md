1. ProductController (Quản lý sản phẩm)
GET /api/products/search: Tìm kiếm sản phẩm theo từ khóa.
GET /api/products/filter: Lọc sản phẩm theo các tiêu chí (loại sản phẩm, giá, thương hiệu, hệ điều hành, RAM, bộ nhớ trong, camera, v.v.).
GET /api/products/{id}: Lấy thông tin chi tiết của sản phẩm (mô tả, thông số kỹ thuật, hình ảnh, đánh giá, bảo hành, đổi trả).
POST /api/products/compare: Thêm sản phẩm vào danh sách so sánh.
GET /api/products/compare: Lấy danh sách sản phẩm so sánh.
GET /api/products/new: Lấy danh sách các sản phẩm mới cập nhật.
GET /api/products: Lấy danh sách tất cả sản phẩm (dành cho quản trị viên, nhân viên).
2. CartController (Quản lý giỏ hàng)
GET /api/cart: Lấy thông tin giỏ hàng (lưu trữ local).
POST /api/cart: Thêm sản phẩm vào giỏ hàng.
DELETE /api/cart: Xóa sản phẩm khỏi giỏ hàng.
3. ReviewController (Quản lý đánh giá sản phẩm)
POST /api/products/{id}/reviews: Gửi đánh giá và nhận xét cho sản phẩm (chưa công khai, cần phê duyệt).
GET /api/products/{id}/reviews: Lấy danh sách các đánh giá của sản phẩm (đã phê duyệt).
4. OrderController (Quản lý đơn hàng)
POST /api/orders: Tạo đơn hàng mới (thông tin giao nhận đơn giản).
GET /api/orders/{id}: Lấy chi tiết đơn hàng.
PUT /api/orders/{id}: Cập nhật trạng thái đơn hàng (hủy, thay đổi).
GET /api/orders/history: Lấy lịch sử các đơn hàng đã thực hiện.
POST /api/orders/quick: Tạo đơn hàng nhanh với một cú click.
5. UserController (Quản lý thông tin tài khoản người dùng)
PUT /api/user: Cập nhật thông tin tài khoản cá nhân (họ tên, địa chỉ, số điện thoại, email, mật khẩu).
GET /api/user/wishlist: Lấy danh sách yêu thích.
POST /api/user/wishlist: Thêm sản phẩm vào danh sách yêu thích.
DELETE /api/user/wishlist/{id}: Xóa sản phẩm khỏi danh sách yêu thích.
GET /api/user/search-history: Lấy lịch sử tìm kiếm của khách hàng.
GET /api/user/viewed-products: Lấy danh sách sản phẩm đã xem.
6. PromotionController (Quản lý khuyến mãi)
GET /api/promotions: Lấy danh sách các chương trình khuyến mãi và giảm giá.
7. ChatController (Quản lý chat hỗ trợ)
GET /api/chat: Khởi tạo chat với nhân viên hỗ trợ.
POST /api/chat: Gửi tin nhắn trong cuộc trò chuyện.
GET /api/chat/support: Tạo chat với nhân viên hỗ trợ.
POST /api/chat/support: Gửi tin nhắn trong cuộc trò chuyện hỗ trợ.
8. AdminController (Quản lý hệ thống cho quản trị viên)
GET /api/admin/analytics: Lấy dữ liệu phân tích doanh thu, lượng hàng bán ra, khách hàng, sản phẩm bán chạy.
GET /api/admin/users: Lấy danh sách người dùng.
GET /api/admin/products: Lấy danh sách sản phẩm.
GET /api/admin/orders: Lấy danh sách đơn hàng.
GET /api/admin/transactions: Lấy lịch sử giao dịch.
PUT /api/admin/users/{id}/role: Cập nhật quyền truy cập người dùng.
GET /api/admin/inventory: Lấy thông tin tồn kho sản phẩm.
PUT /api/admin/inventory/{productId}: Cập nhật số lượng tồn kho.
GET /api/admin/revenue: Xem báo cáo doanh thu và các sản phẩm bán chạy.
9. CommentController (Quản lý bình luận)
GET /api/admin/comments: Lấy danh sách bình luận của khách hàng.
PUT /api/admin/comments/{id}/approve: Phê duyệt bình luận của khách hàng.
10. SupportController (Hỗ trợ khách hàng)
POST /api/support/payment: Giải quyết vấn đề thanh toán.
POST /api/support/return: Giải quyết yêu cầu đổi trả sản phẩm.
11. WarehouseController (Quản lý kho hàng)
GET /api/warehouse/inventory: Xem số lượng tồn kho của các sản phẩm.
PUT /api/warehouse/inventory/{productId}: Cập nhật số lượng tồn kho.
12. DeliveryController (Quản lý giao hàng)
GET /api/delivery/orders: Xem danh sách đơn hàng cần giao.
PUT /api/delivery/orders/{id}/status: Cập nhật trạng thái giao hàng.
13. VendorController (Quản lý bên bán)
GET /api/vendor/products: Lấy danh sách sản phẩm của bên bán.
PUT /api/vendor/products/{id}: Cập nhật thông tin sản phẩm của bên bán.
GET /api/vendor/orders: Lấy danh sách đơn hàng của bên bán.
GET /api/vendor/inventory: Kiểm tra tình trạng kho của bên bán.
PUT /api/vendor/inventory/{productId}: Cập nhật số lượng kho của sản phẩm.
14. AuthController (Quản lý xác thực người dùng)
POST /api/auth/register: Đăng ký tài khoản người dùng.
POST /api/auth/login: Đăng nhập người dùng.
POST /api/auth/logout: Đăng xuất người dùng.
POST /api/auth/forgot-password: Quên mật khẩu (gửi email yêu cầu khôi phục).
POST /api/auth/reset-password: Đặt lại mật khẩu sau khi khôi phục.
