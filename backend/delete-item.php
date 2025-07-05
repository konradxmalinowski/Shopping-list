<?php
require_once 'db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['message' => 'Method Not Allowed']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);
$id = isset($data['id']) ? intval($data['id']) : 0;

if (!$id) {
    http_response_code(400);
    echo json_encode(['message' => 'Id was not provided']);
    exit;
}

try {
    $stmt = $pdo->prepare('DELETE FROM items WHERE id = ?');
    $stmt->execute([$id]);
    if ($stmt->rowCount() === 0) {
        http_response_code(404);
        echo json_encode(['message' => 'Item was not found', 'success' => false]);
        exit;
    }
    echo json_encode([
        'message' => 'Item has been deleted',
        'success' => true
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['message' => 'Failed to delete item', 'success' => false]);
}