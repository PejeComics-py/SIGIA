/*---FUNCTIONS---*/
function mostrarAlerta(mensaje, tipo) {
    let icon;
    if(tipo === "danger") {
        icon = "bi bi-exclamation-diamond";
    }

    if(tipo === "warning") {
        icon = "bi bi-info-circle";
    }
    if(tipo === "success") {
        icon = "bi bi-check";
    }

    /*Show alert*/
    const errorMensaje = document.getElementById("errorMensaje")
    errorMensaje.className = `alert alert-${tipo} mb-4 text-center ${icon}`;

    errorMensaje.innerHTML = ` ${mensaje}`;
    /*Remove d-none class from bootstrap to make alert visible*/
    errorMensaje.classList.remove("d-none")
}

/*---MAIN SCRIPT---*/
const submit = document.getElementById("emailForm")

/*Add event to submit button and wait for response*/
submit.addEventListener("submit", async (button_event) => {
    /*Prevent event until something is returned*/
    button_event.preventDefault();

    /* Save the values placed inside form*/
    const email = document.getElementById("email").value;

    /* Send https request */
    try {
        /* Send https to defined route and await for the operation to end*/
        const respuesta = await fetch('http://localhost:3000/recuperar-password', {
            method: 'POST',
            headers: { 'Content-type': 'application/json'},
            body: JSON.stringify({ email })
        })

        const result = await respuesta.json();

        if(respuesta.ok) {
            console.log(result.mensaje);
            mostrarAlerta(result.mensaje, "success");
        } else {
            console.error(result.mensaje);
            mostrarAlerta(result.mensaje, "warning")
		}
    } catch (error) {
        console.error("Error en la peticion: ", error);
        mostrarAlerta("No se pudo conectar con el servidor.","danger")
        
    }
})
