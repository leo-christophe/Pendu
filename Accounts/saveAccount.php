<?php

// Get the account data from the request
$accountData = $_POST['account'];

// Validate the account data (you can add your own validation logic here)

// Connect to the distant database
$host = 'your_host';
$dbName = 'your_database_name';
$username = 'your_username';
$password = 'your_password';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbName", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    // Handle the connection error
    $response = [
        'success' => false,
        'message' => 'Failed to connect to the database'
    ];
    echo json_encode($response);
    exit;
}

// Prepare the SQL statement
$sql = "INSERT INTO accounts (data) VALUES (:data)";
$stmt = $pdo->prepare($sql);
$stmt->bindParam(':data', json_encode($accountData));

// Execute the SQL statement
try {
    $stmt->execute();
    // Optionally, you can return a response to indicate success or failure
    $response = [
        'success' => true,
        'message' => 'Account saved successfully'
    ];
    echo json_encode($response);
} catch (PDOException $e) {
    // Handle the database error
    $response = [
        'success' => false,
        'message' => 'Failed to save the account'
    ];
    echo json_encode($response);
}