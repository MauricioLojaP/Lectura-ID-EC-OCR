<?php
ob_start();
session_start();
unset($_COOKIE['PHPSESSID']);
session_unset();
session_destroy();
ob_flush();
header("location:/titulacion/");
?>