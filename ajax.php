<?php
require_once 'classes/autoload.php';
session_start();
header('Content-Type: application/json');

if (!empty($_POST['action']) && !empty($_SESSION['logged_in']) && !empty($_SESSION['user_id'])) {
    $action = $_POST['action'];

    try {
        $data = call_user_func('Ajax::' . $action);
        echo json_encode([
            'success' => true,
            'data' => $data
        ]);
    } catch(Exception $e) {
        echo json_encode([
            'success' => false,
            'data' => null
        ]);
    }
    exit;
} else {
    echo json_encode([
        'success' => false,
        'data' => 'Unauthorized request. Request was rejected.'
    ]);
}