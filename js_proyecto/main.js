// EJECUCION DE LA APLICACION
var equipo_obj;
estadisticasNBA();

// FUNCION PRINCIPAL
function estadisticasNBA(){
    let equipo = "";
    let equipo_seleccionado;
    $(document).ready(function() {
        equipo = $("a.activeTeam").attr('id');
        //Inicializacion
        $.get("view.php?select_team="+equipo, function(data, status){
            equipo_obj = JSON.parse(data);
            generarTabla();
            borrar();
            buscador();
            anadirJugador();
            editarJugador();
        });

        //Escoger una tabla
        var x = document.querySelector('.equipo');
        $('.equipo').on("click",function () {
            equipo = escogerEquipo(this);
            // Muestra en el html que equipo se ha solicitado
            $('.equipoSeleccionado').html(equipo);
            $('h3.equipoSeleccionado').html("Quinteto de los "+equipo);

            $.get("view.php?select_team="+equipo, function(data, status){
                equipo_obj = JSON.parse(data);
                // Carga la tabla y prepara las funciones a esta nueva tabla
                generarTabla();
                borrar();
                buscador();
                anadirJugador();
                editarJugador();
            });
        });
    });
}

/**
 * FUNCIONES
 */

function anadirJugador(){
    //Mostrar modal
    //$('#addJugador').unbind('click');   // Borra los eventos click cargados previamente
    $('#addJugador').unbind('click').click(function(){
        let equipo = $("a.activeTeam").attr('id');
        var modalHTML  = $('#formPlayers').html();  // contiene el html del modal para reutilizarlo cada vez que lo abro

        $('#tituloForm').html('Añadir jugador de los '+equipo); // titulo del modal
        $('#formulario').trigger('reset');
        $('#formPlayers').modal('show');

        // Envio datos
        $('#sendData').click(function (event) {
            do {    // do-while(false)  para forzar a hacer solo una vez este proceso
                let datos = [];
                $('input.datos').each(function(index){
                    datos.push($(this).val());
                });

                if (validar(datos)) {
                    // Recoger datos
                    let nombre = $('#nombre').val();
                    let pts = $('#pts').val();
                    let reb = $('#reb').val();
                    let asi = $('#asi').val();
                    let min = $('#min').val();
                    let dorsal = $('#dorsal').val();

                    // Crear jugador
                    let jugador = {
                        dorsal:parseInt(dorsal),
                        nombre:nombre,
                        pts:parseFloat(pts),
                        reb:parseFloat(reb),
                        ast:parseFloat(asi),
                        min:parseFloat(min)
                    }

                    //Añadir jugador a la bbdd
                    equipo = $("a.activeTeam").attr('id');
                    $.post('create.php?select_team='+equipo,
                        jugador,
                        function (data,status) {
                            console.log(data);
                            equipo_obj.push(jugador);
                            // Carga la tabla y prepara las funciones a esta nueva tabla
                            generarTabla();
                            borrar();
                            buscador();
                            anadirJugador();
                            editarJugador();
                        });
                }else
                    alert("No se ha podido crear el jugador");

                //Cerramos modal
                $('#formPlayers').modal('hide');
                $('#formPlayers').on('hidden.bs.modal',function (e) {
                    $(this).html(modalHTML);
                });

            } while (false);
        });
    });
}

function editarJugador(){
    $('button.editar').click(function () {
        var dorsal = $(this).attr('name');  // dorsal hace referencia al boton editar del jugador seleccionado, luego busca por este en el array de jugadores.
        dorsal = parseInt(dorsal);
        let jugador;
        var modalHTML  = $('#formPlayers').html();  // contiene el html del modal para reutilizarlo cada vez que lo abro

        // Obtener objeto jugador
        let equipo = $('a.activeTeam').attr('id');
        $.get(
            'update.php?select_team='+equipo+'&dorsal='+dorsal,
            function (data,status) {
                console.log(data);
                jugador = JSON.parse(data);
                console.log(jugador);
                // Mostrar formulario y asignar valores del jugador a editar
                $('#tituloForm').html('Editar a '+jugador.nombre); // titulo del modal
                $('#nombre').val(jugador.nombre);
                $('#pts').val(jugador.pts);
                $('#reb').val(jugador.reb);
                $('#asi').val(jugador.ast);
                $('#min').val(jugador.min);
                $('#dorsal').val(jugador.dorsal);
                $('#formPlayers').modal('show');

                // Envio de datos
                $('#sendData').click(function () {
                    let datos = [];
                    $('input.datos').each(function(index){
                        datos.push($(this).val());
                    });

                    if (validar(datos)) {

                        // Asignar nuevos valores al jugador
                        jugador.dorsal=parseInt($('#dorsal').val());
                        jugador.nombre=$('#nombre').val();
                        jugador.pts=parseFloat($('#pts').val());
                        jugador.reb=parseFloat($('#reb').val());
                        jugador.ast=parseFloat($('#asi').val());
                        jugador.min=parseFloat($('#min').val());

                        // Actualizar BBDD
                        $.post('update.php?select_team='+equipo,
                            jugador,
                            function (data,status) {
                                console.log(data);
                                $.get("view.php?select_team="+equipo, function(data, status){
                                    equipo_obj = JSON.parse(data);
                                    generarTabla();
                                    borrar();
                                    buscador();
                                    anadirJugador();
                                    editarJugador();
                                });
                            });
                    }else
                        alert("No se ha podido editar el jugador");

                    // Reinicialiar valores de los campos
                    $('#formulario').trigger('reset');

                    //Cerramos modal
                    $('#formPlayers').modal('hide');
                    $('#formPlayers').on('hidden.bs.modal',function (e) {
                        $(this).html(modalHTML);
                    });
                });
            }
        );


    });
}

function validar(datos){
    let validacion = true;
    for (let index = 0; index < datos.length; index++) {
        if(datos[index] == null || datos[index]===""){
            validacion = false;
        }
    }

    return validacion;
}


function escogerEquipo(equipo) {
    // Configuracion clase active
    $('a.activeTeam').removeClass('activeTeam');
    // Escoger equipo seleccionado
    $(equipo).addClass("activeTeam");
    equipo = $(equipo).attr('id');

    return equipo;
}

function borrar() {
    $('button.borrar').click(function () {
        let borrar = confirm("¿Estás seguro de que quieres borrar la fila?");

        if (borrar) {
            let jugador = $(this).attr('name');
            let equipo = $('a.activeTeam').attr('id');
            $('tr[name='+jugador+']').remove();         //Borrar fila de la tabla
            borrarDesdeBaseDatos(equipo, parseInt(jugador));
        }

    });
}

function borrarDesdeBaseDatos(equipo, jugadorEliminado) {
    $.ajax({
        url:"delete.php?select_team="+equipo+'&dorsal='+jugadorEliminado,
        type:'get',
        beforeSend: function () {
            console.log('borrando...');
        },
        success: function () {
            console.log('Jugador borrado');
        }
    });
}

function buscador(){
    $('#search').on('keyup',function name() {
        let filtro = $(this).val().toLowerCase();
        $('tbody tr td[name=nombreJugador]').filter(function(){
            $(this).parent().toggle($(this).text().toLowerCase().indexOf(filtro)>-1)
        });
    });
}

function generarTabla() {
    var tabla='';
        equipo_obj.forEach(jugador => {
            tabla = tabla+'<tr name="'+jugador.dorsal+'">\n';
            tabla = tabla+'\t<th scope="row" name="dorsalJugador">#'+jugador.dorsal+'</th>\n';
            tabla = tabla+'\t<td scope="row" name="nombreJugador">'+jugador.nombre+'</td>\n';
            tabla = tabla+'\t<td name="puntosJugador">'+jugador.pts+'</td>\n';
            tabla = tabla+'\t<td name="rebotesJugador">'+jugador.reb+'</td>\n';
            tabla = tabla+'\t<td name="asistenciasJugador">'+jugador.ast+'</td>\n';
            tabla = tabla+'\t<td name="minutosJugador">'+jugador.min+'</td>\n';
            tabla = tabla+'\t<td>\n';
            tabla = tabla+'\t<div>\n';
            tabla = tabla+'\t\t<button type ="button" class="btn btn-primary mb-2 w-50 material-icons editar" name="'+jugador.dorsal+'">edit</button>\n';
            tabla = tabla+'\t</div>\n';
            tabla = tabla+'\t<div>\n';
            tabla = tabla+'\t\t<button type ="button" class="btn btn-danger w-50 material-icons borrar" name="'+jugador.dorsal+'">delete</button>\n';
            tabla = tabla+'\t</div>\n';
            tabla = tabla+'\t</td>\n';
            tabla = tabla+'</tr>;'
        });
    $('#tabla').html(tabla);
}