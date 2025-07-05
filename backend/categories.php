<?php
require_once 'db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['message' => 'Method Not Allowed']);
    exit;
}

$sql = 'SELECT Name as name FROM categories';
try {
    $stmt = $pdo->query($sql);
    $result = $stmt->fetchAll();
    if (count($result) === 0) {
        http_response_code(500);
        echo json_encode(['message' => 'Failed to select categories', 'success' => false]);
        exit;
    }
    echo json_encode([
        'message' => 'Successfully selected categories',
        'success' => true,
        'items' => $result
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['message' => 'Failed to select categories', 'success' => false]);
}