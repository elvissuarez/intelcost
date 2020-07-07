<?php

/**
 * @file
 * Service for save data
 * .*/

require "db_connection.php";

// Open Connection.
$conn = new db_connection();
// Save Data.
$response = $conn->misBienes();
// Close Connection.
$conn->closeConn();

echo json_encode($response);
