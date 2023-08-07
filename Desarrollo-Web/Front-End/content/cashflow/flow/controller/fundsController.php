<?php
session_start();

include "../model/fundsModel.php";
$aux = $_POST["aux"];

if ($aux == "consultFlow") {

  $consulta = consultFlow();

  $aux = array();

  foreach ($consulta as $auxLista) {
    array_push($aux, array("id" => $auxLista["id"],"fecha" => $auxLista["fecha"],"nombres" => $auxLista["nombres"],
    "cedula" => $auxLista["cedula"], "url" => $auxLista["url"]
  
  )); //
  }
  echo json_encode($aux);
}











