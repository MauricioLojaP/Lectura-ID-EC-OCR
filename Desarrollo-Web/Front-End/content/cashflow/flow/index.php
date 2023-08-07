<?php

session_start();
$so = php_uname();
$windows = stripos($so, "Windows");
$path_so = "../../../cabecera.php";
#if ($windows !== false) {
#  $path_so = "C:/xampp/htdocs/gled/cabecera.php";
#} else {
#   $path_so = "/var/www/html/gled/cabecera.php";
#}

?>
<!doctype html>
<html lang="es">

<html>

<head>
    <meta http-equiv=”Content-Type” content=”text/html; charset=UTF-8″ />
    <title>Registros</title>


    <!-- <link rel="stylesheet" href="css/bootstrap.min.css"> -->
    <link rel="stylesheet" href="css/datatables.min.css">
    <link rel="stylesheet" href="css/dataTables.bootstrap4.min.css">
    <link rel="stylesheet" href="css/searchPanes.dataTables.min.css">
    <link rel="stylesheet" href="css/select.dataTables.min.css">

    <?php require_once "scripts.php"; ?>
    <script src="js/index.js" type="text/javascript"></script>

</head>

<body>
    <div id='ajaxBusy'></div>
    <div class="wrapper">
        <div class="viewlead">
            <main class="page-content">
                <?php require_once $path_so; ?>
                <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom viewdiv">
                    <h2 class="h4">Registros</h2>
                    <div class="btn-toolbar mb-2 mb-md-0">
                        <div class="form-row mb-3">
                        </div>
                    </div>
                </div>


                <div class="container-fluid" style="margin-top: 30px;">
                    <div class="card">
                        <div class="card-body">
                            <table id="tableFlow" class="table table-striped table-bordered" style="width:100%; white-space: nowrap">
                                <thead>
                                    <tr>
                                        <!-- <th>ID</ingresoth> -->
                                        <th>Fecha de Ingreso </th>
                                        <th>Apellidos y Nombres</th>
                                        <th># Cédula</th>
                                        <th>Foto</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                </div>
                <div hidden>
                    <input type="text" id="numpage"  value="<?php echo $numPage?>" >
                </div>

                <div class="container text-center pt-4">
                    <div><span data-feather="eye-off"></span></div>
                    <p></p>
                </div>

            </main>
        </div>
    </div>

    

        <!--end page main-->

        <!--start overlay-->
        <div class="overlay nav-toggle-icon"></div>
        <!--end overlay-->

        <!--Start Back To Top Button-->
        <a href="javaScript:;" class="back-to-top"><i class='bx bxs-up-arrow-alt'></i></a>
        <!--End Back To Top Button-->

        <!--start switcher-->

        <script src="js/jquery-3.3.1.min.js"></script>
        <!-- <script src="popper/popper.js"></script> -->
        <!-- <script src="bootstrap/js/bootstrap.min.js"></script> -->
        <script type="text/javascript" src="js/datatables.min.js"></script>
        <script type="text/javascript" src="js/dataTables.searchPanes.min.js"></script>
        <script type="text/javascript" src="js/dataTables.select.min.js"></script>

    </div>
    <!--end wrapper-->

</body>

</html>