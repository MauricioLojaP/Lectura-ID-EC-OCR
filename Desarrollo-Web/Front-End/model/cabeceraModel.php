<?php

function consultarUsuario($idUsuario) {
    include "conection.php";
    $sql = "SELECT * FROM usuarios WHERE id='$idUsuario';";
    $result = mysqli_query($conection, $sql);
    return $result;
}