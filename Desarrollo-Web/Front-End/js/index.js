/* global alertify */
$(document).ready(function () {
});



function showPassword() {
    var x = document.getElementById("password");
    if (x.type=== "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }

function login(){
    
    var user=$("#username").val();
    var pass=$("#password").val();

    user=user.replace(" ","");

    var cadena="username="+user+"&password="+pass;
    $.ajax({
        type:"POST",
        url:"controller/loginController.php",
        data:cadena,
        datatype:'json',
        beforeSend:function(xhr){
            $("#ajaxBusy").show();
        },
        success:function(data){
            $("#ajaxBusy").hide();
            if (data==true){
                $(location).attr('href','content/index.php')
                success_noti("Ingreso Exitoso!");
            // }else if (data=="user2"){
            //     $(location).attr('href','contenido/index2.php')
            //     success_noti("Ingreso Exitoso!");
            }else{
                error_noti("Usuario o Contraseña Incorrecta");
            }
        },
        error: function(e){
            $("ajaxBusy").hide();
            error_noti("Sistema No Disponible");
            console.log(data);
        }
    });

}
$(document).keypress(function (e) {
    if (e.which == 13) {
        login();
    }
});