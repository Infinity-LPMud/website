<?php
// Geocities-style hit counter API
// POST → increment + return count
// GET  → return count without incrementing

// Store counter alongside SORT_LEVEL.json in the data directory.
// Adjust this path if your data dir lives elsewhere on the server.
$COUNTER_FILE = __DIR__ . '/../data/counter.json';
$BASE_COUNT = 0;

header('Content-Type: application/json');
header('Cache-Control: no-cache');

function read_count() {
    global $COUNTER_FILE, $BASE_COUNT;
    if (!file_exists($COUNTER_FILE)) {
        return $BASE_COUNT;
    }
    $raw = file_get_contents($COUNTER_FILE);
    if ($raw === false) return $BASE_COUNT;
    $data = json_decode($raw, true);
    return isset($data['count']) ? (int)$data['count'] : $BASE_COUNT;
}

function write_count($count) {
    global $COUNTER_FILE;
    $dir = dirname($COUNTER_FILE);
    if (!is_dir($dir)) {
        mkdir($dir, 0755, true);
    }
    file_put_contents($COUNTER_FILE, json_encode(['count' => $count]), LOCK_EX);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $count = read_count() + 1;
    write_count($count);
    echo json_encode(['count' => $count]);
} else {
    echo json_encode(['count' => read_count()]);
}
