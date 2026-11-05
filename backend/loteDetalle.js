const ESTADOS = {
    riesgo:   { label: 'Riesgo' },
    optimo:   { label: 'Óptimo' },
    atencion: { label: 'Atención' }
};
const ESTADO_TAREA = {
    pendiente: 'Pendiente',
    completada: 'Completada',
    progreso: 'En progreso',
    retrasada: 'Retrasada'
};
const LOTES = {
    A: { estado: 'riesgo', actualizado: '22/10/2020', tareas: [
        { tipo: 'Preparar terreno', cuando: 'Hoy - 10:00 a.m', estado: 'completada', responsable: 'William S.', instruccion: 'Preparar terreno aplicando composta al lote A' },
        { tipo: 'Preparar terreno', cuando: 'Hoy - 10:00 a.m', estado: 'completada', responsable: 'William S.', instruccion: 'Preparar terreno aplicando composta al lote A' },
        { tipo: 'Preparar terreno', cuando: 'Hoy - 10:00 a.m', estado: 'completada', responsable: 'William S.', instruccion: 'Preparar terreno aplicando composta al lote A' },
        { tipo: 'Preparar terreno', cuando: 'Hoy - 10:00 a.m', estado: 'completada', responsable: 'William S.', instruccion: 'Preparar terreno aplicando composta al lote A' }
    ]},
    B: { estado: 'optimo', actualizado: '22/10/2020', tareas: [
        { tipo: 'Fertilizante', cuando: 'Hoy - 07:00 a.m', estado: 'completada', responsable: 'Laura M.', instruccion: 'Aplicar fertilizante a lote B' },
        { tipo: 'Podar', cuando: 'Hoy - 12:00 p.m', estado: 'progreso', responsable: 'Carlos R.', instruccion: 'Podar las ramas secas del lote B' }
    ]},
    C: { estado: 'atencion', actualizado: '22/10/2020', tareas: [
        { tipo: 'Regar', cuando: 'Hoy - 12:00 p.m', estado: 'progreso', responsable: 'Laura M.', instruccion: 'Regar lote C' },
        {tipo: 'Podar', cuando: 'Ayer - 04:00 p.m', estado: 'retrasada', responsable: 'Carlos R.', instruccion: 'Podar lote C' }
    ]},
    D: { estado: 'atencion', actualizado: '22/10/2020', tareas: [
        { tipo: 'Regar', cuando: 'Hoy - 02:00 p.m', estado: 'progreso', responsable: 'William S.', instruccion: 'Regar lote D' }
    ]}
};

const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const id = (new URLSearchParams(location.search).get('lote') || 'A').toUpperCase();
const lote = Object.hasOwn(LOTES, id) ? LOTES[id] : null;

if (!lote) {
    document.getElementById('noEncontrado').hidden = false;
} else {
    document.getElementById('detalle').hidden = false;
    document.title = 'SIGIA - Lote ' + id;
    document.getElementById('nombreLote').textContent = 'Lote ' + id;
    document.getElementById('fechaLote').textContent = lote.actualizado;

    // Estado del lote + formulario "Cambiar estado"
    const btn = document.getElementById('btnEstado');
    const panel = document.getElementById('panelEstado');

    function pintarEstado() {
        const abierto = !panel.hidden;
        btn.className = 'estado-btn estado-' + lote.estado;
        btn.innerHTML = ESTADOS[lote.estado].label + ` <i class="bi bi-chevron-${abierto ? 'up' : 'right'} ms-1"></i>`;
        btn.setAttribute('aria-label', 'Estado del lote: ' + ESTADOS[lote.estado].label);
        btn.setAttribute('aria-expanded', abierto);
        panel.querySelectorAll('input[name="estadoLote"]').forEach(r => r.checked = r.value === lote.estado);
    }
    function abrirPanel(abrir) { 
        panel.hidden = !abrir; pintarEstado(); 
    }

    btn.addEventListener('click', e => { e.stopPropagation(); abrirPanel(panel.hidden); });
    document.addEventListener('click', e => { if (!panel.hidden && !panel.contains(e.target)) abrirPanel(false); });
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && !panel.hidden) { abrirPanel(false); btn.focus(); }
    });
    panel.addEventListener('change', e => {
        if (e.target.name !== 'estadoLote') return;
        lote.estado = e.target.value;
        const h = new Date();
        lote.actualizado = [h.getDate(), h.getMonth() + 1, h.getFullYear()]
            .map((n, i) => i < 2 ? String(n).padStart(2, '0') : n).join('/');
        document.getElementById('fechaLote').textContent = lote.actualizado;
        // TODO: guardar en el backend (PATCH /lotes/:id) con el nuevo estado
        abrirPanel(false);
    });
    pintarEstado();
    
    let abierta = null;   // índice de la tarea expandida (una a la vez)

    function pintarTareas() {
        document.getElementById('listaTareas').innerHTML = lote.tareas.length
            ? lote.tareas.map((t, i) => {
                const abierto = abierta === i;
                return `
                    <div class="task-item">
                        <button type="button" class="task-toggle" data-i="${i}" aria-expanded="${abierto}" aria-controls="detalleTarea${i}">
                            <span>
                                <span class="d-block fw-bold">${esc(t.tipo)}</span>
                                <span class="d-block small fw-semibold my-1">${esc(t.cuando)}</span>
                                <span class="task-badge badge-${t.estado}">• ${ESTADO_TAREA[t.estado]}</span>
                            </span>
                            <i class="bi bi-chevron-${abierto ? 'up' : 'right'} fs-5"></i>
                        </button>
                        ${abierto ? `
                        <div id="detalleTarea${i}" class="px-3 pb-3">
                            <dl class="task-detail mb-3">
                                <dt>Tipo de tarea</dt>
                                <dd>${esc(t.tipo)}</dd>
                                <dt>Instrucciones</dt>
                                <dd>${esc(t.instruccion || 'Sin instrucciones')}</dd>
                                <dt>Responsable</dt>
                                <dd>${esc(t.responsable || 'Sin asignar')}</dd>
                            </dl>
                            <div class="task-actions d-flex justify-content-center gap-2">
                                <!-- Pendiente (siguiente paso): editar y eliminar tarea -->
                                <button type="button" class="btn-sigia-outline" data-accion="editar" data-i="${i}"><i class="bi bi-pencil-square me-1"></i>Editar</button>
                                <button type="button" class="btn-sigia-danger" data-accion="eliminar" data-i="${i}"><i class="bi bi-trash me-1"></i>Eliminar</button>
                            </div>
                        </div>` : ''}
                    </div>`;
            }).join('')
            : '<p class="text-center text-secondary small">Este lote aún no tiene tareas.</p>';
    }
    
    pintarTareas();

    // Expandir / contraer una tarea
    document.getElementById('listaTareas').addEventListener('click', e => {
        const toggle = e.target.closest('.task-toggle');
        if (!toggle) return;
        const i = Number(toggle.dataset.i);
        abierta = abierta === i ? null : i;
        pintarTareas();
        document.querySelector(`.task-toggle[data-i="${i}"]`).focus();
    });

    // Formulario "Agregar tarea"
    const modalTareaEl = document.getElementById('modalAgregarTarea');
    const modalTarea = bootstrap.Modal.getOrCreateInstance(modalTareaEl);
    const formTarea = document.getElementById('formTarea');
    const fTipo = document.getElementById('tareaTipo');
    const fLote = document.getElementById('tareaLote');
    const fResp = document.getElementById('tareaResp');
    const fFecha = document.getElementById('tareaFecha');
    const fInstr = document.getElementById('tareaInstr');
    const errorTarea = document.getElementById('errorTarea');
    const aviso = document.getElementById('avisoTarea');
    let temporizadorAviso;

    fLote.innerHTML = '<option value="" selected disabled>Selecciona un lote</option>' +
        Object.keys(LOTES).map(k => `<option value="${esc(k)}">Lote ${esc(k)}</option>`).join('');

    const actualizarContador = () => document.getElementById('contadorInstr').textContent = fInstr.value.length + '/500';
    fInstr.addEventListener('input', actualizarContador);
    formTarea.addEventListener('input', e => e.target.classList.remove('is-invalid'));
    formTarea.addEventListener('change', e => e.target.classList.remove('is-invalid'));

    modalTareaEl.addEventListener('show.bs.modal', () => { fLote.value = id; });   // lote actual preseleccionado
    modalTareaEl.addEventListener('hidden.bs.modal', () => {
        formTarea.reset();
        formTarea.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
        errorTarea.hidden = true;
        actualizarContador();
    });

    formTarea.addEventListener('submit', e => {
        e.preventDefault();
        const v = { tipo: fTipo.value, lote: fLote.value, responsable: fResp.value.trim(),
            fecha: fFecha.value, instruccion: fInstr.value.trim() };
        const campos = [[fTipo, v.tipo], [fLote, v.lote], [fResp, v.responsable], [fFecha, v.fecha], [fInstr, v.instruccion]];
        campos.forEach(([el, val]) => el.classList.toggle('is-invalid', !val));
        const completo = campos.every(([, val]) => val);
        errorTarea.hidden = completo;
        if (!completo) return;
        const h = new Date();
        const hoy = `${h.getFullYear()}-${String(h.getMonth() + 1).padStart(2, '0')}-${String(h.getDate()).padStart(2, '0')}`;
        const [y, m, d] = v.fecha.split('-');
        const tarea = {
            tipo: v.tipo, cuando: v.fecha === hoy ? 'Hoy' : `${d}/${m}/${y}`, estado: 'pendiente',
            responsable: v.responsable, instruccion: v.instruccion, fecha: v.fecha
        };
        // TODO: guardar en el backend (POST /tareas) y usar el id que devuelva
        LOTES[v.lote].tareas.push(tarea);
        if (v.lote === id) pintarTareas();
            aviso.textContent = `Tarea agregada al Lote ${v.lote}.`;
            aviso.hidden = false;
            clearTimeout(temporizadorAviso);
            temporizadorAviso = setTimeout(() => aviso.hidden = true, 4000);
            modalTarea.hide();
        });
    }
/* Eliminar lote: confirma y vuelve a la lista.
 * TODO: llamar al backend (DELETE /lotes/:id) antes de redirigir. */
document.getElementById('nombreEliminar').textContent = 'Lote ' + id;
document.getElementById('btnConfirmarEliminar').addEventListener('click', () => {
    location.href = 'sigiaLotes.html';
});

