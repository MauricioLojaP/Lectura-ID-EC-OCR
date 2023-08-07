<?php
$host='localhost';
$user2='root';
$password2='';
$db='db_registros_ingreso';

    $conn=mysqli_connect($host,$user,$password,$db);
    if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
    }
    $sqlSearch="SELECT * FROM usuarios ";
    $result = mysqli_query($conn ,$sqlSearch);
    print_r($result);
    
?>
   
