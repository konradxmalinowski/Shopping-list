<?php
require_once 'db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['message' => 'Method Not Allowed']);
    exit;
}

$sql = 'SELECT items.id as item_id, items.Name as item_name, categories.Name as category_name, categories.id_category as category_id FROM items INNER JOIN categories ON items.id_category = categories.id_category;';

try {
    $stmt = $pdo->query($sql);
    $results = $stmt->fetchAll();
    echo json_encode($results);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['message' => 'Failed to select items from database']);
}