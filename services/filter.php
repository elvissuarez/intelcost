<?php

/**
 * @file
 * File as service to get filters.
 *
 * .*/

$filter = [];
$filter['title'] = 'TODOS LOS BIENES';
$filter['todo'] = TRUE;
if (isset($_POST) && !empty($_POST)) {
  $filter['title'] = 'Resultados de la Búsqueda';
  $filter['ciudad'] = $_POST['ciudad'];
  $filter['precio'] = $_POST['precio'];
  $filter['tipo'] = $_POST['tipo'];
  $filter['todo'] = FALSE;
}
echo json_encode($filter);
