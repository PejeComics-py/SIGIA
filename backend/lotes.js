/*TODO: Configurar el script para insertar lotes con información de la base de datos al cargar la pagina*/
/*NOTE: El flujo de trabajo seria: 
 cargar lotes actuales en base de datos(mostar mensaje de lotes vacio en caso de no contar con inputs) > Insertar Nuevos lotes a traves de formulario en la base de datos > Cargar lotes actuales */

/*--FILTROS--*/
const listaLotes = document.getElementById('listaLotes');
/*Obtener botones por ID y clase. Devuelve nodeList*/
const botonesFiltros = document.querySelectorAll('#filtros .chip');
/*Obtener objeto oculto para mostar mensaje de resultados*/
const sinResultados = document.querySelectorAll('sinResultados');
/*Diccionario de nombres para los filtros*/
const nombres = { todos: 'Todos', riesgo: 'Riesgos', atencion: 'Atención', optimo: 'Óptimo' };
/*Diccionario de estados para actualizarlos de los lotes*/
const ESTADOS = {
    riesgo:   { label: 'Riesgo',   icono: 'bi-exclamation-triangle' },
    optimo:   { label: 'Óptimo',   icono: 'bi-check-circle' },
    atencion: { label: 'Atención', icono: 'bi-slash-circle' }
};

/*Filtro actual*/
let filtroActual = 'todos';
        
/*Función que devuelve una lista o arreglo desde un nodelist*/
function obtenerTarjetasDeLotes() {
    return [...listaLotes.querySelectorAll('.lote-card')];
};

/*Cuenta cuantas tarjeta pertenecen a un filtro especifico*/
function contarTarjetasFiltro(tarjetas, filtro) {
    if (filtro === 'todos') {
        /*Devuelve el tamaño del array tarjetas*/
        return tarjetas.length;
    };

    /*Deuvelve las tarjetas que coincidan el estado otorgado dentro de un array*/
    const tarjetasConEstado = tarjetas.filter(function (tarjeta) {
        return tarjeta.dataset.estado === filtro; 
    });

    return tarjetasConEstado.length;
};

/*Devolver tarjetas con cumplen con el filtro*/
function tarjetaConFiltro (tarjeta, filtro) {
    /*NO IDEA*/
    const todasTarjeta = filtro === 'todos';

    const estadoCoincideConFiltro = tarjeta.dataset.estado === filtro;

    return todasTarjeta || estadoCoincideConFiltro;
};

/*Actualizar el contenido de los botones y marca el boton seleccionado como activo*/
function actualizarBotonesDeFiltro() {
    const tarjetasLotes = obtenerTarjetasDeLotes();

    /*Traversando Botones nodeList*/
    botonesFiltros.forEach(function (boton) {
        /*Obtener el filtro de cada boton*/
        const filtroDelBoton = boton.dataset.filtro
        /*Contar cuantos lotes coinciden con el filtro selecionado*/
        const cantidadDeLotes = contarTarjetasFiltro(tarjetasLotes,filtroDelBoton)
        /*Obtener el nombre asignado al filtro*/
        const nombreDelFiltro = nombres[filtroDelBoton];

        /*Asignar cotenido al elemmento boton*/
        boton.textContent = `${nombreDelFiltro} (${cantidadDeLotes})`;

        /*Verifica el button con el filtro actual y lo guarda en el variable como bolean */
        const esElFiltroSeleccionado = filtroDelBoton === filtroActual;
        /*Cambiar el estado a activo con el boton correspodiente*/
        boton.classList.toggle('active', esElFiltroSeleccionado);
    });
};

/* Ocultar tarjetas que no cumplan el filtro*/
function mostarTarjetaFiltroSeleccionado() {
    let cantidadDeTarjetasVisibles = 0;

    /* Traversar a traves del array */
    obtenerTarjetasDeLotes().forEach(function (tarjeta) {
        /* Guardar las tarjetas con el filtro actual*/
        const debeMostrarse = tarjetaConFiltro(tarjeta, filtroActual);

        /*Cambiar tarjeta flag si debe mostarse*/ 
        tarjeta.hidden = !debeMostrarse;

        if (debeMostrarse) {
            cantidadDeTarjetasVisibles++;
        };
    });

    /* Show message of no results*/
    if(cantidadDeTarjetasVisibles === 0) {
        sinResultados.hidden = !(cantidadDeTarjetasVisibles === 0);
    } else {
        sinResultados.hidden = true;
    };
}

/*Referescar vista*/
function actualizarVistaDeLotes() {
    actualizarBotonesDeFiltro();
    mostarTarjetaFiltroSeleccionado();
}

/*Guardar el filtro persionado y referescar la pagina*/
function seleccionarFiltro(boton) {
    filtroActual = boton.dataset.filtro;
    actualizarVistaDeLotes();
}

/*--TARJETAS--*/
/*Obtener la hora en formato español*/
function obtenerHoraActual() {
    const hora = new Date().toLocaleDateString('es-CO', {
        weekday: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    });
    return hora;
};

/*TODO: configurar hora actual al formato del diseño en Figma*/
function crearTarjetaLote(nombre, estado) {
    /*Guarda la hora actual*/
    const horaActual = obtenerHoraActual();
    /*Guarda los valores asociados al estado*/
    const estadoAtual = ESTADOS[estado];

    /*Crear una tarjeta temporal*/
    const tarjetaTemporal = document.createElement('temp');
    tarjetaTemporal.className = `lote-card estado-${estado}`;
    tarjetaTemporal.dataset.estado = estado; 
    tarjetaTemporal.href = 'sigiaLoteDetalle.html?lote='.concat(encodeURIComponent(nombre));

    tarjetaTemporal.innerHTML = `
        <div class="lote-title"></div>
        <div class="lote-body">
            <div class="lote-next"> Siguiente tarea: Sin asginar</div>
            <div class="d-flex justify-content-between align-items-end mt-3">
                <span class="fw-bold fs-6"><i class="bi ${estadoAtual.icono} me-1"></i>${estadoAtual.label}</span>
                <span class="lote-update">Actualización: ${horaActual}</span>
            </div>
        </div>
    `
    const tituloTarjeta = tarjetaTemporal.querySelector('.lote-title');
    tituloTarjeta.textContent = nombre; 

    return tarjetaTemporal;
};

/*--Agregar lotes--*/ 
/*TODO: Complete this code*/
const ventanaModalAgregarLote = document.getElementById('modalAgregarLote');
const controlVentanaModal = bootstrap.Modal.getOrCreateInstance(ventanaModalAgregarLote)
const formularioAgregarLote = document.getElementById('formLote');
const campoNombreLote = document.getElementById('loteNombre');
const campoEstadoLote = document.getElementById('loteEstado');
const mensajeErrorNombre = document.getElementById('errorNombre');
const mensajeErrorDelEstado = document.getElementById('errorEstado');

/*--MAIN SCRIPT--*/
/*Actualizar botones del filtro al ejecutar script*/
actualizarBotonesDeFiltro();

/*Add event listener*/
botonesFiltros.forEach(function (boton){
    boton.addEventListener('click', function() {
        seleccionarFiltro(boton);
    });
});
