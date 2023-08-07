<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ESPE</title>

    <!-- Bootstrap css-->
    <link href="assets/css/bootstrap.min.css" rel="stylesheet" />
    <link href="assets/css/bootstrap-extended.css" rel="stylesheet" />
    <link href="assets/css/style.css" rel="stylesheet" />
    <link href="assets/css/icons.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css">
    <link rel="stylesheet" href="assets/plugins/notifications/css/lobibox.min.css" />
    
    <!-- loader -->
    <link href="assets/css/pace.min.css" rel="stylesheet" />
    <link href="css/login.css" rel="stylesheet" type="text/css"/>
</head>
<body class="login">   
<div id='ajaxBusy'></div>
        <!--start wrapper-->
        <div class="wrapper">

            <!--start content-->
           <div class="container">

               <div class="row">
                   <div class="col-lg-4 col-sm-12 pt-5">
                       <img src="img/Capture.PNG" alt="logo">

                       <div class="row g-3 pt-5">
                                <div class="col-12 ">
                                       <label for="inputName" class="form-label">Usuario</label>
                                       <div class="ms-auto position-relative">
                                             <div class="position-absolute top-50 translate-middle-y search-icon px-3"><i class="bi bi-person-circle"></i></div>
                                                    <input type="text" class="form-control radius-30 ps-5" id="username" placeholder="Ingrese usuario">
                                             </div>
                                        </div>
                                <div class="col-12">
                                        <label for="inputChoosePassword" class="form-label">Contraseña</label>
                                        <div class="ms-auto position-relative">
                                              <div class="position-absolute top-50 translate-middle-y search-icon px-3"><i class="bi bi-lock-fill"></i></div>
                                                    <input type="password" class="form-control radius-30 ps-5" id="password" placeholder="Ingrese contraseña">
                                        </div>
                                </div>
                                               
                                <div class="col-4">
                                        <div class="d-grid">
                                            <button type="submit" onclick="login();" class="btn btn-primary radius-30">Ingresar</button>
                                        </div>
                                </div>
                        </div>

                   </div>
                   

                   
                    <div class="col-lg-8 background">
                    <div class="container">
                        <img class="img" src="img/login-vector1.svg" alt="">
                        <div class="text">
                            <h1>Crater helps you track expenses, record payments & generate beautiful invoices & estimates.</h1>
                      

                        </div>
                    </div>
                   </div>
               </div>
           </div>

            <!--end page main-->

        </div>
        <!--end wrapper-->


        <!--plugins-->
        <script src="assets/js/jquery.min.js"></script>
        <script src="assets/plugins/notifications/js/lobibox.js"></script>
        <script src="assets/plugins/notifications/js/notifications.min.js"></script>
        <script src="assets/plugins/notifications/js/notification-custom-script.js"></script>
        <script src="assets/js/pace.min.js"></script>
        <script src="js/index2.js"></script>


    </body>

</html>
