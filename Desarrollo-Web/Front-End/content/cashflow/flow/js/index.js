$(document).ready(function () {
    // consultarFlujo();

    consultFlow();

    $('#tableFlow').on('click', 'tbody td.dt-control', function () {
        var tr = $(this).closest('tr');
        var table = $('#tableFlow').DataTable();
        var row = table.row(tr);
        if (row.child.isShown()) {
            row.child.hide();
        } else {
            row.child(format(row.data())).show();
        }
    });

    $('#tableFlow').on('requestChild.dt', function (e, row) {
        row.child(format(row.data())).show();
    });
});

// function consultarFlujo(){
//     var cadena = "aux=consultarFlujo";
//     $.ajax({
//         type: "POST",
//         url: "controller/fundsController.php",
//         data: cadena,
//         success: function (data) {
//             $("#divTableFlujo").html(data);
//             dataTable("tableFlujo");
//             console.log(data);
//         },
//         error: function (e) {
//             console.log(e);
//             error_noti("Sistema no disponible");
//         }
//     });
// }





function format(d) {
    // `d` is the original data object for the row
    var table1 = $('#tableFlow').DataTable();
    numPage = table1.page.info().page;
    return (
        '<table style="border: hidden">' +
        '    <tr>' +
        '        <td>' +
        '<form action="editflow.php" method="POST">' +
        '<input name="id" value="' + d.id + '" type="hidden" id="id">' +
        '<input name="pageTable" value="' + numPage + '" type="hidden" id="pageTable">' +
        '<button class="btn btn-outline-secondary btn-sm mr-1" type="submit">' +
        'Editar' +
        '</button>' +
        '</form>' +
        '        </td>' +
        '        <td>' +
        '<button class="btn btn-outline-secondary btn-sm mr-1" onclick="deletelead(' + d.id + ');">Eliminar</button>' +
        '        </td>' +
        '    </tr>' +
        '</table>'

    );
}







function consultFlow() {
    var cadena = "aux=consultFlow";

    $.ajax({
        type: "POST",
        url: "controller/fundsController.php",
        data: cadena,
        success: function (response) {
            console.log(response)
            jsondatos = JSON.parse(response)

            var table = $('#tableFlow').DataTable({
                data: jsondatos,
                deferRender: true,
                dom: 'Bfrtip',
                // dom: 'Pfrtip',
                searchPanes: {
                    orderable: false
                },
                scrollY: "300px",
                scrollX: true,
                scrollCollapse: true,

                columnDefs: [
                    { width: 300, targets: 0 }
                ],
                fixedColumns: true,
                columns: [
                    // { data: 'id' },
                    { data: 'fecha' },
                    { data: 'nombres' },
                    { data: 'cedula' },
                    { data: 'url' , render: function (data, type, row) {
                        if (type === 'display') {
                            return '<img src="'+data+'" alt="foto" width="100px">';
                        }
                        return data
                    }

                    },
                ],
                order: [[0, 'desc']],
            });

        },
        error: function (e) {
            console.log(e);
            error_noti("Sistema no disponible");
            console.log(jsonObj)
        }
    });
}














function deletelead(id) {
    const id2 = id;
    window.value = id2;
    $('#eliminateReg').modal({ backdrop: 'static', keyboard: false });
    $("#eliminateReg").modal("show");

}

function eliminate() {
    var cadena = "aux=deleteRow&id=" + window.value;
    $.ajax({
        type: "POST",
        url: "controller/fundsController.php",
        data: cadena,
        success: function (data) {
            if (data == true) {
                success_noti("Registro Eliminado");
                $("#eliminateReg").modal("hide");
                window.location.href = "index.php";

            } else {
                error_noti("Error al eliminar");
            }

        },
        error: function (e) {
            console.log(e);
            error_noti("Sistema no disponible");
        }
    });
}

function dataTable(nombreTabla) {
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
        "pageLength": 8,
        "scrollX": true,
        dom: 'Bfrtip',
        buttons: [],
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
