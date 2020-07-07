<?php

/**
 * Class Connection, almacena los metodos de conexion usados por el programa.
 */
class db_connection {

  private static $dbhost = "localhost";
  private static $dbuser = "root";
  private static $dbpass = "root";
  private static $db = "Intelcost_bienes";
  static $dbtable = "bienes_guardados";
  protected $conn;

  /**
   *
   */
  public function __construct() {
    $this->conn = $this->openConn();
    $this->createTable();
  }

  /**
   * Open Connection.
   */
  public function openConn() {
    $dbhost = "localhost";
    $dbuser = "root";
    $dbpass = "root";
    $db = "Intelcost_bienes";
    $conn = new mysqli(self::$dbhost, self::$dbuser, self::$dbpass, self::$db) or die("Connect failed: %s\n" . $conn->error);
    return $conn;
  }

  /**
   * Close Connection.
   */
  public function closeConn() {
    $this->conn->close();
  }

  /**
   * Crea la tabla para almacenar los bienes.
   */
  public function createTable() {
    $table = self::$dbtable;
    $sql = "CREATE TABLE IF NOT EXISTS $table (
      id INT(6) UNSIGNED PRIMARY KEY,
      direccion VARCHAR(255) DEFAULT '',
      ciudad VARCHAR(255) DEFAULT '',
      telefono VARCHAR(255) DEFAULT '',
      codigo_postal VARCHAR(255) DEFAULT '',
      tipo VARCHAR(255) DEFAULT '',
      precio VARCHAR(255) DEFAULT ''
    )";
    if ($this->conn->query($sql) === TRUE) {
      return "Tabla $table funciona correctamente";
    }
    else {
      return "Error creating table: " . $this->conn->error;
    }
  }

  /**
   * Almacena los datos de los bienes guardados.
   */
  public function saveDataTable($id, $direccion, $ciudad, $telefono, $codigo_postal, $tipo, $precio) {
    $table = self::$dbtable;
    $sql = "INSERT INTO $table (id, direccion, ciudad, telefono, codigo_postal, tipo, precio)
        VALUES ($id, '$direccion', '$ciudad', '$telefono', '$codigo_postal', '$tipo', '$precio')
       ON DUPLICATE KEY UPDATE
        direccion='$direccion', ciudad='$ciudad', telefono='$telefono', codigo_postal='$codigo_postal', tipo='$tipo', precio='$precio'";
    if ($this->conn->query($sql) === TRUE) {
      return "Tabla $table Actualizada correctamente";
    }
    else {
      return "$sql \nError updating table $table: " . $this->conn->error;
    }
  }

  /**
   * Almacena los datos de los bienes guardados.
   */
  public function misBienes() {
    $table = self::$dbtable;
    $sql = "SELECT * FROM $table ORDER BY 'id'";
    $result = $this->conn->query($sql);
    if ($result) {
      $response = [];
      while ($row = $result->fetch_object()) {
        $response[] = $row;
      }
      return $response;
    }
    else {
      return "$sql \nError get data table $table: " . $this->conn->error;
    }
  }

}
