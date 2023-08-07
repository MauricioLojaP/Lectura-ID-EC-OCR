<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Clients4</title>

    <!-- Bootstrap css-->
    <link href="assets/css/bootstrap.min.css" rel="stylesheet" />
    <link href="assets/css/bootstrap-extended.css" rel="stylesheet" />
    <link href="assets/css/style.css" rel="stylesheet" />
    <link href="assets/css/icons.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css">
    <link rel="stylesheet" href="assets/plugins/notifications/css/lobibox.min.css" />

    <script src="js/index.js"></script>

    <!-- loader -->
    <link href="assets/css/pace.min.css" rel="stylesheet" />
    <link href="css/style.css" rel="stylesheet" type="text/css" />
</head>
<div id='ajaxBusy'></div>
<!--start wrapper-->
<div class="wrapper">

    <!--start content-->
    <main class="authentication-content">
        <div class="container-fluid">
            <div class="authentication-card">
                <div class="card shadow rounded-0 overflow-hidden">
                    <div class="row g-0">
                        <div class="col-lg-6 bg-login d-flex align-items-center justify-content-center">
                            <img src="./img/espe.jpg" class="img-fluid" width="100%">
                        </div>
                        <div class="col-lg-6">
                            <div class="card-body p-4 p-sm-5">
                                <h5 class="card-title">Iniciar sesión</h5>
                                <p class="card-text mb-5"></p>
                                <form class="form-body" onsubmit="return false;">
                                    <div class="d-grid">
                                        <a class="btn btn-white radius-30" href="javascript:;"><span class="d-flex justify-content-center align-items-center">
                                                <img src="img/espelogo.png" alt="" style="width:70%">
                                            </span>
                                        </a>
                                    </div>
                                    <div class="login-separater text-center mb-4"> <span>SISTEMA CONTROL DE ACCESOS</span>
                                        <hr>
                                    </div>
                                    <div class="row g-3">
                                        <div class="col-12 ">
                                            <label for="inputName" class="form-label">Usuario</label>
                                            <div class="ms-auto position-relative">
                                                <div class="position-absolute top-50 translate-middle-y search-icon px-3"><i class="bi bi-person-circle"></i></div>
                                                <input type="text" class="form-control radius-30 ps-5" id="username" placeholder="Ingrese usuario">
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <label for="inputChoosePassword" class="form-label">Contraseña</label>
                                            <!-- 
                                            <div class="input-group" id="show_hide_password">
                                                <input class="form-control" type="password">
                                                <div class="input-group-addon">
                                                    <a href=""><i class="fa fa-eye-slash" aria-hidden="true"></i></a>
                                                </div>
                                            </div> -->
                                            <div class="ms-auto position-relative">
                                                <div class="position-absolute top-50 translate-middle-y search-icon px-3"><i class="bi bi-lock-fill"></i></div>
                                                <input type="password" class="form-control radius-30 ps-5" id="password" placeholder="Ingrese contraseña">
                                            </div>
                                            
                                        </div>
                                        <div class="col-12">
                                        <input type="checkbox" onclick="showPassword();">&nbsp Mostrar Contraseña</input>
                                        </div>

                                        <div class="col-12">
                                            <div class="d-grid">
                                                <button type="submit" onclick="login();" class="btn btn-primary radius-30">Ingresar</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>

    <!--end page main-->

</div>
<!--end wrapper-->


<!--plugins-->
<script src="assets/js/jquery.min.js"></script>
<script src="assets/plugins/notifications/js/lobibox.js"></script>
<script src="assets/plugins/notifications/js/notifications.min.js"></script>
<script src="assets/plugins/notifications/js/notification-custom-script.js"></script>
<script src="assets/js/pace.min.js"></script>



</body>

</html>