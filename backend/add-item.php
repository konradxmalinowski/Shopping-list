<?php
require_once 'db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['message' => 'Method Not Allowed']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);
$name = isset($data['name']) ? trim($data['name']) : '';
$category = isset($data['category']) ? trim($data['category']) : '';

if ($name === '') {
    http_response_code(400);
    echo json_encode(['message' => 'Name of item was not provided']);
    exit;
}
if ($category === '') {
    http_response_code(400);
    echo json_encode(['message' => 'Category of item was not provided']);
    exit;
}

try {
    // Get category id
    $stmt = $pdo->prepare('SELECT id_category FROM categories WHERE Name = ?');
    $stmt->execute([$category]);
    $cat = $stmt->fetch();
    if (!$cat) {
        http_response_code(500);
        echo json_encode(['message' => 'Failed to get category name', 'success' => false]);
        exit;
    }
    $cat_id = $cat['id_category'];

    // Insert item
    $stmt = $pdo->prepare('INSERT INTO items(Name, id_category) VALUES (?, ?)');
    $stmt->execute([$name, $cat_id]);

    // Return updated items list
    $sql = 'SELECT items.id as item_id, items.Name as item_name, categories.Name as category_name, categories.id_category as category_id FROM items INNER JOIN categories ON items.id_category = categories.id_category;';
    $stmt = $pdo->query($sql);
    $results = $stmt->fetchAll();
    echo json_encode([
        'message' => 'Item has been added',
        'success' => true,
        'items' => $results
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['message' => 'Failed to insert data', 'success' => false]);
}