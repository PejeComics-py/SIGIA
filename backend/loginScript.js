/*--- FUNCTIONS ---*/
/* Error box */
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
    errorMensaje.className = `alert alert-${tipo} mb-3 text-center ${icon}`;

    errorMensaje.innerHTML = ` ${mensaje}`;
    /*Remove d-none class from bootstrap to make alert visible*/
    errorMensaje.classList.remove("d-none")
}

/*--- MAIN SCRIPT ---*/
/*Get submit button form by ID*/
const submit = document.getElementById("loginForm")

/*Add event to submit button and wait for response*/
submit.addEventListener("submit", async (button_event) => {
    /*Prevent event until something is returned*/
    button_event.preventDefault();

    /* Save the values placed inside form*/
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value

    try {
        /* Fetch response with a return the promise promise*/
        const respuesta = await fetch("http://localhost:3000/login", { // fetch(resource, response)
            method: "POST",
            headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email, password })
        });

        /*Wait for the server response*/
		const result = await respuesta.json();

        /* Print result mensaje */
		if(respuesta.ok) {
            console.log(result.mensaje);
            mostrarAlerta(result.mensaje, "success");
            setTimeout(function() {
                window.location.href = "frontend/sigiaHomepage.html"
            }, 1500);
        } else {
            console.log(result.mensaje);
            mostrarAlerta(result.mensaje, "danger")
		}
	} catch(error){
        console.error("Error en la peticion: ", error);
        mostrarAlerta("No se pudo conectar con el servidor.", "danger")
    }
});
