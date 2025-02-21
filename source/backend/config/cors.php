<?php
return [
    'paths' => ['api/*'], // Các route áp dụng CORS (ví dụ: tất cả API)
    'allowed_methods' => ['*'], // Phương thức HTTP được phép (GET, POST, PUT, DELETE...)
    'allowed_origins' => ['http://localhost:3000'], // Domain frontend
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'], // Header được phép
    'exposed_headers' => ['X-Guest-ID'], // Đảm bảo rằng 'Set-Cookie' được phép exposed
    'max_age' => 0,
    'supports_credentials' => true, // Cho phép gửi cookie qua CORS
];
