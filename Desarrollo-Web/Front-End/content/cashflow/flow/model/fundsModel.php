<?php

function consultFlow()
{
    include "../../../../model/conection.php";
    $sqlBuscar = "SELECT * FROM datos";
    $result = mysqli_query($conection, $sqlBuscar);
    return $result;
}