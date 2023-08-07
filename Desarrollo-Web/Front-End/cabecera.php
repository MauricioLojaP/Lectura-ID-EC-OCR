<?php
include_once 'model/cabeceraModel.php';
// if (isset($_SESSION['user']) && (time() - $_SESSION['user'] > 100)) {
//     // last request was more than 30 minutes ago
//     session_unset();     // unset $_SESSION variable for the run-time 
//     session_destroy();   // destroy session data in storage
// }
// $_SESSION['user'] = time();

session_start();
if (isset($_SESSION['user'])) {
?>
    <!--start top header-->
    <div class="container">
        <header class="top-header">
            <nav class="navbar navbar-expand gap-3">
                <div class="mobile-toggle-icon fs-3">
                    <i class="bi bi-list"></i>
                </div>
                <!-- <form class="searchbar" onsubmit="return redireccionInit();">
                    <div class="position-absolute top-50 translate-middle-y search-icon ms-3"><i class="bi bi-search"></i></div>
                    <input class="form-control" list="datalistOptionsInicio" id="inicioNombreCliente" onkeypress="consultarCliente();" placeholder="Buscar cliente...">
                    <datalist id="datalistOptionsInicio"></datalist>
                    <div class="position-absolute top-50 translate-middle-y search-close-icon"><i class="bi bi-x-lg"></i></div>
                </form> -->
                <div class="top-navbar-right ms-auto">
                    <ul class="navbar-nav align-items-center">
                        <li class="nav-item search-toggle-icon">
                            <a class="nav-link" href="#">
                                <div class="">
                                    <i class="bi bi-search"></i>
                                </div>
                            </a>
                        </li>
                        <li class="nav-item dropdown dropdown-user-setting" id="headerUno">
                            <?php
                            $usuarios = consultarUsuario($_SESSION['id']);
                            foreach ($usuarios as $us) {
                                $nombreUsuario = $us["user"];
                                $name = $us["name"];
                            }
                            ?>
                            <a class="nav-link dropdown-toggle dropdown-toggle-nocaret" href="#" data-bs-toggle="dropdown">
                                <div class="user-setting d-flex align-items-center">

                                    <div class=""><i class="bi bi-person-fill"></i></div>

                                </div>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-end">
                                <li>
                                    <a class="dropdown-item" href="#">
                                        <div class="d-flex align-items-center">
                                            <div class="ms-3">
                                                <h6 class="mb-0 dropdown-user-name"></h6>
                                                <small class="mb-0 dropdown-user-designation text-secondary"></small>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <hr class="dropdown-divider">
                                </li>
                                <li>
                                    <a class="dropdown-item" href="/demo360/privado/usuarios/miUsuario.php">
                                        <div class="d-flex align-items-center">
                                            <div class=""><i class="bi bi-person-fill"></i></div>
                                            <div class="ms-3"><span>Usuario: <?php echo $_SESSION['name']; ?> <?php echo $_SESSION['lastname']; ?></span></div>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <hr class="dropdown-divider">
                                </li>
                                <li>
                                    <a class="dropdown-item" href="/titulacion/salir.php">
                                        <div class="d-flex align-items-center">
                                            <div class=""><i class="bi bi-lock-fill"></i></div>
                                            <div class="ms-3"><span>Cerrar sesion</span></div>
                                        </div>
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    </div>
    <!--end top header-->

    <!--start sidebar -->
    <aside class="sidebar-wrapper" data-simplebar="true" style="background-color:rgb(242, 244, 244)">
        <div class="sidebar-header" style="background-color:rgb(242, 244, 244)">
            <div>
                <img src="/titulacion/img/espelogo.png" class="logo-icon" alt="logo icon" style="width:50%">
            </div>

            <div class="toggle-icon ms-auto"> <i class="bi bi-list"></i>
            </div>
        </div>
        <!--navigation-->
        <ul class="metismenu" id="menu">

            <li>
                <a href="/titulacion/content/index.php" class="">
                    <div class="parent-icon"><i class="bi bi-house-fill"></i>
                    </div>
                    <div class="menu-title">Inicio</div>
                </a>
            </li>

            <li class="menu-label">REGISTROS</li>

            <li>
                <a href="/titulacion/content/registros.php" class="">
                    <div class="parent-icon"><i class="bi bi-person-fill"></i></i>
                    </div>
                    <div class="menu-title">Registros</div>
                </a>
            </li>

        </ul>
        <!--end navigation-->
    </aside>
    <!--end sidebar -->

<?php
} else {

    echo "<script>window.location.href='../index.php';</script>";
    exit;
}
?>