<?php

/**
 * @file
 * Service for save data
 * .*/

require "db_connection.php";

$data = json_decode(file_get_contents('php://input'));
$id = $data->Id;
$direccion = $data->Direccion;
$ciudad = $data->Ciudad;
$telefono = $data->Telefono;
$codigo_postal = $data->Codigo_Postal;
$tipo = $data->Tipo;
$precio = $data->Precio;

// Open Connection.
$conn = new db_connection();
// Save Data.
$response = [];
$response['message'] = $conn->saveDataTable($id, $direccion, $ciudad, $telefono, $codigo_postal, $tipo, $precio);
// Close Connection.
$conn->closeConn();

echo json_encode($response);
