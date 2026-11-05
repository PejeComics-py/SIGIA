/*DIV con ID listaLotes*/
/*Necesario para operar el DIV y actualizarlo*/
const lista = document.getElementById('listaLotes');
/*Obtener botones por ID y clase. Devuelve nodeList*/
const chips = document.querySelectorAll('#filtros .chip');
/*Diccionario de nombres para los filtros*/
const nombres = { todos: 'Todos', riesgo: 'Riesgos', atencion: 'Atención', optimo: 'Óptimo' };
/*Diccionario de estados para actualizarlos de los lotes*/
const ESTADOS = {
    riesgo:   { label: 'Riesgo',   icono: 'bi-exclamation-triangle' },
    optimo:   { label: 'Óptimo',   icono: 'bi-check-circle' },
    atencion: { label: 'Atención', icono: 'bi-slash-circle' }
};


let filtroActual = 'todos';
        
/*Función que devuelve un nodeList estatico de los elementos con clase .lote-card*/
const tarjetas = () => [...lista.querySelectorAll('.lote-card')];

// Función actializar para filtros y tarjetas
function actualizar() {
    /* Obtener el NodeList de los elementos en el div de la lista de los lotes*/
    const todas = tarjetas();
    /*Traversando cada elementos en nodeList*/
    chips.forEach(c => {
        const f = c.dataset.filtro;
        const n = f === 'todos' ? todas.length : todas.filter(t => t.dataset.estado === f).length;
        c.textContent = `${nombres[f]} (${n})`;
        c.classList.toggle('active', f === filtroActual);
    });
    let visibles = 0;
    todas.forEach(t => {
        const ver = filtroActual === 'todos' || t.dataset.estado === filtroActual;
        t.hidden = !ver;
        if (ver) visibles++;
    });
    document.getElementById('sinResultados').hidden = visibles > 0;
}

chips.forEach(c => c.addEventListener('click', () => { filtroActual = c.dataset.filtro; actualizar(); }));

// Crea una tarjeta de lote (con textContent para no inyectar HTML del usuario)
function crearTarjeta(nombre, estado) {
    const hora = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
        .replace(' AM', ' a.m').replace(' PM', ' p.m');
    const a = document.createElement('a');
    a.className = `lote-card estado-${estado}`;
    a.dataset.estado = estado;
    a.href = 'sigiaLoteDetalle.html?lote=' + encodeURIComponent(nombre);
    a.innerHTML = `
        <div class="lote-title"></div>
        <div class="lote-body">
            <div class="lote-next">Siguiente tarea: Sin asignar</div>
            <div class="d-flex justify-content-between align-items-end mt-3">
                <span class="fw-bold fs-6"><i class="bi ${ESTADOS[estado].icono} me-1"></i> ${ESTADOS[estado].label}</span>
                <span class="lote-update">Actualización: Hoy - ${hora}</span>
            </div>
        </div>`;
    a.querySelector('.lote-title').textContent = nombre;
    return a;
}

// Formulario "Agregar lote"
const modalEl = document.getElementById('modalAgregarLote');
const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
const form = document.getElementById('formLote');
const inNombre = document.getElementById('loteNombre');
const inEstado = document.getElementById('loteEstado');
const errNombre = document.getElementById('errorNombre');
const errEstado = document.getElementById('errorEstado');

function limpiarForm() {
    form.reset();
    [inNombre, inEstado].forEach(i => i.classList.remove('is-invalid'));
    errNombre.hidden = errEstado.hidden = true;
}

modalEl.addEventListener('shown.bs.modal', () => inNombre.focus());
modalEl.addEventListener('hidden.bs.modal', limpiarForm);

form.addEventListener('submit', e => {
    e.preventDefault();
    const nombre = inNombre.value.trim().replace(/\s+/g, ' ');
    const estado = inEstado.value;
    let error = '';
    if (!nombre) error = 'Escribe el nombre del lote.';
    else if (tarjetas().some(t => t.querySelector('.lote-title').textContent.toLowerCase() === nombre.toLowerCase()))
        error = 'Ya existe un lote con ese nombre.';
    errNombre.textContent = error;
    errNombre.hidden = !error;
    inNombre.classList.toggle('is-invalid', !!error);
    errEstado.hidden = !!estado;
    inEstado.classList.toggle('is-invalid', !estado);
    if (error || !estado) return;

    // TODO: guardar en el backend (POST /lotes) y usar el id que devuelva
    /lista.appendChild(crearTarjeta(nombre, estado));
    filtroActual = 'todos';
    actualizar();
    modal.hide();
});

actualizar();
