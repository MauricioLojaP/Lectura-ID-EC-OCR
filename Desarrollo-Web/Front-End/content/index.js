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
        url: "./cashflow/flow/controller/fundsController.php",
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
                // scrollY: "300px",
                scrollX: true,
                scrollCollapse: true,

                columnDefs: [
                    { width: 300, targets: 0 }
                ],
                fixedColumns: true,
                
                columns: [
                    // { data: 'id' },
                    { data: 'fecha', render: function (data, type, row) {
                        if (type === 'display') {
                            const fecha = new Date(data);
                            fecha.setHours(fecha.getHours() - 5);
                            return fecha.toString();
                        }
                        return data
                    } },
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




