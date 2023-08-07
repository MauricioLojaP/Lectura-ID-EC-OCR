/* global alertify */
$(document).ready(function () {

    $('.input-number').on('input', function () {
        this.value = this.value.replace(/[^0-9]/g, '');
    });
    $('.coordenadas').on('input', function () {
        this.value = this.value.replace(/[^0-9,.-]/g, '');
    });
    $('.decimales').on('input', function () {
        this.value = this.value.replace(/[^0-9,.]/g, '').replace(/,/g, '.');
    });
    $('.red').on('input', function () {
        this.value = this.value.replace(/[^0-9,./]/g, '').replace(/,/g, '.');
    });
    $('.comparticion').on('input', function () {
        this.value = this.value.replace(/[^0-9,:]/g, '');
    });
    $('.telefono').on('input', function () {
        this.value = this.value.replace(/[^0-9,/]/g, '');
    });

    $('.mac').on('input', function () {
        this.value = this.value.replace(/[^0-9:ABCDEF]/g, '');
    });

});

function filterFloat(evt, input) {
    // Backspace = 8, Enter = 13, ‘0′ = 48, ‘9′ = 57, ‘.’ = 46, ‘-’ = 43
    var key = window.Event ? evt.which : evt.keyCode;
    var chark = String.fromCharCode(key);
    var tempValue = input.value + chark;
    if (key >= 48 && key <= 57) {
        if (filter(tempValue) === false) {
            return false;
        } else {
            return true;
        }
    } else {
        if (key == 8 || key == 13 || key == 46 || key == 0) {
            return true;
        } else {
            return false;
        }
    }
}
function filter(__val__) {
    var preg = /^([0-9]+\.?[0-9]{0,2})$/;
    if (preg.test(__val__) === true) {
        return true;
    } else {
        return false;
    }

}

function dataTable2(nombreTabla) {
    $("#" + nombreTabla + " thead tr").clone(true).appendTo('#' + nombreTabla + ' thead');
    $('#' + nombreTabla + ' thead tr:eq(1) th').each(function (i) {
        var title = $(this).text();
        $(this).html('<input type="text" class="form-control input-sm" placeholder="" /> ');
        $('input', this).on('keyup change', function () {
            if (table.column(i).search() !== this.value) {
                table
                        .column(i)
                        .search(this.value)
                        .draw();
            }
        });
    });
    var table = $('#' + nombreTabla + '').DataTable({
        //orderCellsTop: true,
        //fixedHeader: true,
        "pageLength": 10,
        "scrollX": true,
        dom: 'Bfrtip',
        buttons: [
            'excelHtml5',
            'pdfHtml5'
        ],
        language: {
            "decimal": ",",
            "thousands": ".",
            "info": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "infoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
            "infoPostFix": "",
            "infoFiltered": "(filtrado de un total de _MAX_ registros)",
            "loadingRecords": "Cargando...",
            "lengthMenu": "Mostrar _MENU_ registros",
            "paginate": {
                "first": "Primero",
                "last": "Ultimo",
                "next": "Siguiente",
                "previous": "Anterior"
            },
            "processing": "Procesando...",
            "search": "Buscar:",
            "searchPlaceholder": "Termino de busqueda",
            "zeroRecords": "No se encontraron resultados",
            "emptyTable": "Ningun dato disponible en esta tabla",
            "buttons": {
                "create": "Nuevo",
                "edit": "Cambiar",
                "remove": "Borrar",
                "copy": "Copiar",
                "csv": "fichero CSV",
                "excel": "Excel",
                "pdf": " PDF",
                "print": "Imprimir",
                "colvis": "Visibilidad columnas",
                "collection": "ColecciÃ³n",
                "upload": "Seleccione fichero...."
            },
            "select": {
                "rows": {
                    _: '%d filas seleccionadas',
                    0: 'clic fila para seleccionar',
                    1: 'una fila seleccionada'
                }
            }
        },
        aoColumnDefs: [{
                'bSortable': false,
                'aTargets': [0]
            }]

    });
}

function dataTableConOrdenDescSinPag(nombreTabla) {
    $("#" + nombreTabla + " thead tr").clone(true).appendTo('#' + nombreTabla + ' thead');
    $('#' + nombreTabla + ' thead tr:eq(1) th').each(function (i) {
        var title = $(this).text();
        $(this).html('<input type="text" class="form-control input-sm" placeholder="" /> ');
        $('input', this).on('keyup change', function () {
            if (table.column(i).search() !== this.value) {
                table
                        .column(i)
                        .search(this.value)
                        .draw();
            }
        });
    });
    var table = $('#' + nombreTabla + '').DataTable({
        //orderCellsTop: true,
        //fixedHeader: true,
        "pageLength": 1000,
        "scrollX": true,
        dom: 'Bfrtip',
        buttons: [
            'excelHtml5',
            'pdfHtml5'
        ],
        "order": [[0, "desc"]],
        language: {
            "decimal": ",",
            "thousands": ".",
            "info": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "infoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
            "infoPostFix": "",
            "infoFiltered": "(filtrado de un total de _MAX_ registros)",
            "loadingRecords": "Cargando...",
            "lengthMenu": "Mostrar _MENU_ registros",
            "paginate": {
                "first": "Primero",
                "last": "Ultimo",
                "next": "Siguiente",
                "previous": "Anterior"
            },
            "processing": "Procesando...",
            "search": "Buscar:",
            "searchPlaceholder": "Termino de busqueda",
            "zeroRecords": "No se encontraron resultados",
            "emptyTable": "Ningun dato disponible en esta tabla",
            "buttons": {
                "create": "Nuevo",
                "edit": "Cambiar",
                "remove": "Borrar",
                "copy": "Copiar",
                "csv": "fichero CSV",
                "excel": "Excel",
                "pdf": " PDF",
                "print": "Imprimir",
                "colvis": "Visibilidad columnas",
                "collection": "ColecciÃ³n",
                "upload": "Seleccione fichero...."
            },
            "select": {
                "rows": {
                    _: '%d filas seleccionadas',
                    0: 'clic fila para seleccionar',
                    1: 'una fila seleccionada'
                }
            }
        },
        aoColumnDefs: [{
                'bSortable': false,
                'aTargets': [0]
            }]

    });
}


function dataTableConOrdenDescSinPagPlan(nombreTabla) {
    $("#" + nombreTabla + " thead tr").clone(true).appendTo('#' + nombreTabla + ' thead');
    $('#' + nombreTabla + ' thead tr:eq(1) th').each(function (i) {
        var title = $(this).text();
        $(this).html('<input type="text" class="form-control input-sm" placeholder="" /> ');
        $('input', this).on('keyup change', function () {
            if (table.column(i).search() !== this.value) {
                table
                        .column(i)
                        .search(this.value)
                        .draw();
            }
        });
    });
    var table = $('#' + nombreTabla + '').DataTable({
        //orderCellsTop: true,
        //fixedHeader: true,
        "pageLength": 1000,
        "scrollX": true,
        dom: 'Bfrtip',
        buttons: [
            'excelHtml5',
            'pdfHtml5'
        ],
        "order": [[0, "asc"]],
        language: {
            "decimal": ",",
            "thousands": ".",
            "info": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "infoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
            "infoPostFix": "",
            "infoFiltered": "(filtrado de un total de _MAX_ registros)",
            "loadingRecords": "Cargando...",
            "lengthMenu": "Mostrar _MENU_ registros",
            "paginate": {
                "first": "Primero",
                "last": "Ultimo",
                "next": "Siguiente",
                "previous": "Anterior"
            },
            "processing": "Procesando...",
            "search": "Buscar:",
            "searchPlaceholder": "Termino de busqueda",
            "zeroRecords": "No se encontraron resultados",
            "emptyTable": "Ningun dato disponible en esta tabla",
            "buttons": {
                "create": "Nuevo",
                "edit": "Cambiar",
                "remove": "Borrar",
                "copy": "Copiar",
                "csv": "fichero CSV",
                "excel": "Excel",
                "pdf": " PDF",
                "print": "Imprimir",
                "colvis": "Visibilidad columnas",
                "collection": "ColecciÃ³n",
                "upload": "Seleccione fichero...."
            },
            "select": {
                "rows": {
                    _: '%d filas seleccionadas',
                    0: 'clic fila para seleccionar',
                    1: 'una fila seleccionada'
                }
            }
        },
        aoColumnDefs: [{
                'bSortable': false,
                'aTargets': [0]
            }]

    });
}

function dataTableOrderDesc(nombreTabla) {
    $("#" + nombreTabla + " thead tr").clone(true).appendTo('#' + nombreTabla + ' thead');
    $('#' + nombreTabla + ' thead tr:eq(1) th').each(function (i) {
        var title = $(this).text();
        $(this).html('<input type="text" class="form-control input-sm" placeholder="" /> ');
        $('input', this).on('keyup change', function () {
            if (table.column(i).search() !== this.value) {
                table
                        .column(i)
                        .search(this.value)
                        .draw();
            }
        });
    });
    var table = $('#' + nombreTabla + '').DataTable({
        //orderCellsTop: true,
        //fixedHeader: true,
        "pageLength": 10,
        "scrollX": true,
        dom: 'Bfrtip',
        buttons: [
            'excelHtml5',
            'pdfHtml5'
        ],
        "order": [[0, "desc"]],
        language: {
            "decimal": ",",
            "thousands": ".",
            "info": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "infoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
            "infoPostFix": "",
            "infoFiltered": "(filtrado de un total de _MAX_ registros)",
            "loadingRecords": "Cargando...",
            "lengthMenu": "Mostrar _MENU_ registros",
            "paginate": {
                "first": "Primero",
                "last": "Ultimo",
                "next": "Siguiente",
                "previous": "Anterior"
            },
            "processing": "Procesando...",
            "search": "Buscar:",
            "searchPlaceholder": "Termino de busqueda",
            "zeroRecords": "No se encontraron resultados",
            "emptyTable": "Ningun dato disponible en esta tabla",
            "buttons": {
                "create": "Nuevo",
                "edit": "Cambiar",
                "remove": "Borrar",
                "copy": "Copiar",
                "csv": "fichero CSV",
                "excel": "Excel",
                "pdf": " PDF",
                "print": "Imprimir",
                "colvis": "Visibilidad columnas",
                "collection": "ColecciÃ³n",
                "upload": "Seleccione fichero...."
            },
            "select": {
                "rows": {
                    _: '%d filas seleccionadas',
                    0: 'clic fila para seleccionar',
                    1: 'una fila seleccionada'
                }
            }
        },
        aoColumnDefs: [{
                'bSortable': false,
                'aTargets': [0]
            }]

    });
}






function cedula(value) {
    var array = value.split("");
    var num = array.length;
    var aux = false;
    ;
    if (num === 13) {
        num = 10;
    }
    if (num === 10) {
        var total = 0;
        var digito = (array[9] * 1);
        for (i = 0; i < (num - 1); i++) {
            var mult = 0;
            if ((i % 2) !== 0) {
                total = total + (array[i] * 1);
            } else {
                mult = array[i] * 2;
                if (mult > 9)
                    total = total + (mult - 9);
                else
                    total = total + mult;
            }
        }
        var decena = total / 10;
        var decena = Math.floor(decena);
        decena = (decena + 1) * 10;
        var final = (decena - total);
        if ((final === 10 && digito === 0) || (final === digito)) {
            aux = true;
        } else {
            aux = false;
        }
    } else {
        aux = false;
    }
    return aux;
}

function validarFormU(variable, id, mensaje) {

    if (variable == "") {
        $("#" + id).focus();
        error_noti(mensaje);
        return false;
    } else {
        return true;
    }
}

function validarFormU2(variable, id, mensaje) {

    if (variable == "") {
        $("#" + id).focus();
        error_noti(mensaje);
        return true;
    } else {
        return false;
    }
}

function validarFormSelect2(variable, id, mensaje) {

    if (variable == "") {
        $("#" + id).focus();
        $("#" + id).select2("open");
        error_noti(mensaje);
        return false;
    } else {
        return true;
    }
}


function validarFormSelect22(variable, id, mensaje) {

    if (variable == "") {
        $("#" + id).focus();
        $("#" + id).select2("open");
        error_noti(mensaje);
        return true;
    } else {
        return false;
    }
}