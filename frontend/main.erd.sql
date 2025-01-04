
-- Bảng users
CREATE TABLE users (
    id INT  PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(15),
    role VARCHAR(50) CHECK (role IN ('guest', 'employee', 'admin', 'customer','support','vendor')) DEFAULT 'guest',
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE(),
    loyalty_points INT DEFAULT 0,
    phone_login_token VARCHAR(255),
    last_login_at DATETIME DEFAULT GETDATE()
);

CREATE TABLE user_addresses (
    id INT PRIMARY KEY,
    user_id INT NOT NULL,
    address_line VARCHAR(255) NOT NULL,
    city VARCHAR(100),
    state VARCHAR(100),
    zip_code VARCHAR(20),
    is_default BIT DEFAULT 0,
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
-- Bảng categories
CREATE TABLE categories (
    id INT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE(),
);
-- Bảng products
CREATE TABLE products (
    id INT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) CHECK (status IN ('available', 'out_of_stock', 'discontinued')) DEFAULT 'available',
    category_id INT,
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE()
	FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL

);

-- Bảng product_attributes
CREATE TABLE product_attributes (
    id INT  PRIMARY KEY,
    product_id INT,
    attribute_name VARCHAR(255),
    attribute_value VARCHAR(255),
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Bảng product_images
CREATE TABLE product_images (
    id INT  PRIMARY KEY,
    product_id INT,
    image_url VARCHAR(255),
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);


-- Bảng orders (Đơn hàng)
CREATE TABLE orders (
    id INT PRIMARY KEY,
    user_id INT,
    customer_name VARCHAR(255),
    total_price DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) CHECK (status IN ('processing', 'delivered', 'cancelled')) DEFAULT 'processing',
    payment_method VARCHAR(50) CHECK (payment_method IN ('QR', 'cash')) DEFAULT 'cash',
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE(),
    delivery_time DATETIME,
    order_time DATETIME,
    cancel_time DATETIME,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Bảng order_items
CREATE TABLE order_items (
    id INT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);
-- Bảng reviews (Đánh giá)
CREATE TABLE reviews (
    id INT PRIMARY KEY,
    user_id INT,
    product_id INT,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    status VARCHAR(50) CHECK (status IN ('pending', 'approved')) DEFAULT 'pending',
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Bảng wishlist (Danh sách yêu thích)
CREATE TABLE wishlist (
    id INT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    created_at DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Bảng carts (Giỏ hàng)
CREATE TABLE carts (
    id INT PRIMARY KEY,
    user_id INT NOT NULL,
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Bảng cart_items (Sản phẩm trong giỏ hàng)
CREATE TABLE cart_items (
    id INT PRIMARY KEY,
    cart_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    created_at DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (cart_id) REFERENCES carts(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Bảng payments (Thanh toán)
CREATE TABLE payments (
    id INT PRIMARY KEY,
    order_id INT NOT NULL,
    payment_method VARCHAR(50) CHECK (payment_method IN ('QR', 'cash')) DEFAULT 'cash',
    amount DECIMAL(10, 2) NOT NULL,
    payment_status VARCHAR(50) CHECK (payment_status IN ('success', 'failed', 'pending')) DEFAULT 'pending',
    transaction_id VARCHAR(255),
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
);

-- Bảng notifications (Thông báo)
CREATE TABLE notifications (
    id INT PRIMARY KEY,
    user_id INT NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(50) CHECK (status IN ('unread', 'read')) DEFAULT 'unread',
    created_at DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Bảng payment_logs (Lịch sử thanh toán)
CREATE TABLE payment_logs (
    id INT PRIMARY KEY,
    payment_id INT NOT NULL,
    transaction_status VARCHAR(50) CHECK (transaction_status IN ('success', 'failed', 'pending')) DEFAULT 'pending',
    transaction_details TEXT,
    created_at DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (payment_id) REFERENCES payments(id) ON DELETE CASCADE
);

-- Bảng discounts (Giảm giá)
CREATE TABLE discounts (
    id INT PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    start_date DATETIME NOT NULL,
    end_date DATETIME NOT NULL,
    status VARCHAR(50) CHECK (status IN ('active', 'expired', 'disabled')) DEFAULT 'active'
);

-- Bảng order_discounts (Giảm giá cho đơn hàng)
CREATE TABLE order_discounts (
    id INT PRIMARY KEY,
    order_id INT NOT NULL,
    discount_id INT NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (discount_id) REFERENCES discounts(id) ON DELETE CASCADE
);

-- Bảng support_tickets (Yêu cầu hỗ trợ)
CREATE TABLE support_tickets (
    id INT PRIMARY KEY,
    user_id INT,
    issue_type VARCHAR(255) NOT NULL,
    status VARCHAR(50) CHECK (status IN ('new', 'in_progress', 'resolved')) DEFAULT 'new',
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);
CREATE TABLE chats (
    id INT  PRIMARY KEY,
    user_id INT,
    device_id VARCHAR(255),
    message TEXT,
    created_at DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);
CREATE TABLE inventory (
    id INT  PRIMARY KEY,
    product_id INT,
    quantity INT,
    updated_at DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);