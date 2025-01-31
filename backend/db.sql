INSERT INTO categories (id, name, created_at, updated_at) VALUES
(1, 'Smartphones', NOW(), NOW()),
(2, 'Tablets', NOW(), NOW()),
(3, 'Accessories', NOW(), NOW()),
(4, 'Wearable Devices', NOW(), NOW()),
(5, 'Gaming Phones', NOW(), NOW());

NSERT INTO `user_addresses` (`id`, `user_id`, `ward_code`, `district_code`, `province_code`, `address`, `is_default`, `created_at`, `updated_at`) VALUES (NULL, '1', '00001', '001', '01', 'aaaaaaaaa', '0', NULL, NULL);

INSERT INTO products (name, description, price, status, category_id, created_at, updated_at,rating,slug,review_count) VALUES
('iPhone 14 Pro', 'High-end Apple smartphone with A16 Bionic chip', 1099.99, 'available', 1, NOW(), NOW(),4,'iphone-14-pro',12),
('Samsung Galaxy Tab S8', 'Powerful Android tablet for work and play', 699.99, 'available', 2, NOW(), NOW(),4,'samsung-galaxy-tab-s8',10),
('AirPods Pro 2', 'Wireless noise-cancelling earbuds from Apple', 249.99, 'available', 3, NOW(), NOW(),3.1,'airpods-pro-2',8),
('Apple Watch Series 8', 'Advanced health-tracking wearable device', 399.99, 'out_of_stock', 4, NOW(), NOW(),4,'apple-watch-series-8',5),
('ASUS ROG Phone 6', 'Gaming smartphone with powerful specs', 999.99, 'discontinued', 5, NOW(), NOW(),4,'asus-rog-phone-6',6);


INSERT INTO product_attributes (product_id, operating_system, chip, ram, storage, camera_resolution, battery_capacity, battery_type, dimensions, created_at, updated_at) VALUES
(1, 'iOS', 'A16 Bionic', '6GB', '128GB', '48MP', '4323mAh', 'Li-ion', '147.5 x 71.5 x 7.85 mm', NOW(), NOW()),
(2, 'Android', 'Snapdragon 8 Gen 1', '8GB', '256GB', '13MP + 6MP (dual)', '8000mAh', 'Li-Po', '253.8 x 165.3 x 6.3 mm', NOW(), NOW()),
(3, 'iOS', 'H2 chip', '4GB', '64GB', 'Lightning', '2500mAh', 'Li-ion', '48.9 x 31.8 x 7.7 mm', NOW(), NOW()),
(4, 'watchOS', 'S8', '12GB', '512GB', '12MP', '308mAh', 'Li-ion', '45 x 38 x 10.7 mm', NOW(), NOW()),
(5, 'Android', 'Snapdragon 888+', '12GB', '512GB', '64MP', '6000mAh', 'Li-Po', '172.8 x 77.2 x 10.3 mm', NOW(), NOW());



INSERT INTO product_images (product_id, image_url, created_at, updated_at) VALUES
(1, 'https://images.unsplash.com/photo-1736617004818-a01c44c494ee?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', NOW(), NOW()),
(1, 'https://images.unsplash.com/photo-1735323656411-a43ad7822c90?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', NOW(), NOW()),
(1, 'https://images.unsplash.com/photo-1736841096703-d042981a6157?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', NOW(), NOW()),

(2, 'https://images.unsplash.com/photo-1736849544918-6ddb5cfc2c42?q=80&w=1036&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', NOW(), NOW()),
(2, 'https://images.unsplash.com/photo-1737074434131-73167e5fbcad?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', NOW(), NOW()),
(2, 'https://images.unsplash.com/photo-1737020622517-17a9dae61a11?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', NOW(), NOW()),

(3, 'https://images.unsplash.com/photo-1737064144135-4e6e46974261?q=80&w=988&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', NOW(), NOW()),
(3, 'https://images.unsplash.com/photo-1737020622517-17a9dae61a11?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', NOW(), NOW()),
(3, 'https://images.unsplash.com/photo-1736942901968-cdc44bff3295?q=80&w=985&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', NOW(), NOW()),

(4, 'https://images.unsplash.com/photo-1737069220405-6ddcbd8c70c1?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', NOW(), NOW()),
(4, 'https://plus.unsplash.com/premium_photo-1726845345390-3b32dd82e07d?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', NOW(), NOW()),
(4, 'https://images.unsplash.com/photo-1737063577062-4e605fdd71eb?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', NOW(), NOW()),

(5, 'https://images.unsplash.com/photo-1732134066696-37958947b7ad?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', NOW(), NOW()),
(5, 'https://plus.unsplash.com/premium_photo-1733306523150-77b7bc4e22db?q=80&w=1167&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', NOW(), NOW()),
(5, 'https://images.unsplash.com/photo-1737064144135-4e6e46974261?q=80&w=988&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', NOW(), NOW());
