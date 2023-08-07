<?php
function login($user, $password)
{

    $host = 'localhost';
    $user2 = 'root';
    $password2 = '';
    $db = 'db_registros_ingreso';

    $conection = mysqli_connect($host, $user2, $password2, $db);
    $sqlSearch = "SELECT * FROM usuarios WHERE user='$user' and password='$password'";
    $result = mysqli_query($conection, $sqlSearch);

    if (mysqli_num_rows($result) == 1) {
        session_start();
        $_SESSION['user'] = $user;
        foreach ($result as $aux) {
            $_SESSION['id'] = $aux['id'];
            $_SESSION['name'] = $aux['name'];
            $_SESSION['lastname'] = $aux['lastname'];
            $_SESSION['user'] = $aux['user'];
            $_SESSION['perfil'] = $aux['perfil'];
        }
        return true;
    } else {
        $sqlSearch2 = "SELECT * FROM usuarios_chile WHERE user='$user' and password='$password'";
        $result2 = mysqli_query($conection, $sqlSearch2);
        if (mysqli_num_rows($result2) == 1) {
            session_start();
            $_SESSION['user'] = $user;
            foreach ($result2 as $aux) {
                $_SESSION['id'] = $aux['id'];
                $_SESSION['name'] = $aux['name'];
                $_SESSION['user'] = $aux['user'];
                $_SESSION['perfil'] = $aux['perfil'];
            }
            return "user2";
        } else {
            return false;
        }
    }
}
