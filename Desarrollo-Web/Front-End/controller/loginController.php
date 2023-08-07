<?php
include '../model/loginModel.php';

$user=$_POST["username"];
$password=md5($_POST["password"]);

$login=login($user,$password);
echo $login;