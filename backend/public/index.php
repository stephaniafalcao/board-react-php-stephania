<?php

declare(strict_types=1);

require_once __DIR__ . '/../src/Database.php';

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
$uri = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH);
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$allowedOrigins = [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
];

if (in_array($origin, $allowedOrigins, true)) {
    header("Access-Control-Allow-Origin: {$origin}");
}

header('Vary: Origin');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept');
header('Content-Type: application/json');

if ($method === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($method === 'GET' && $uri === '/health') {
    try {
        $pdo = Database::getConnection();
        $pdo->query('SELECT 1');

        http_response_code(200);
        echo json_encode([
            'status' => 'ok',
            'database' => 'connected',
        ]);
        exit;
    } catch (Throwable $exception) {
        http_response_code(503);
        echo json_encode([
            'status' => 'error',
            'database' => 'disconnected',
        ]);
        exit;
    }
}

http_response_code(404);
echo json_encode([
    'status' => 'error',
    'message' => 'Route not found',
]);
