/* --- FUNCTIONS --- */
// Mostar icono para dinstintos mensajes
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

// Verificar input del usuario 
function checkUserInput(nombres,apellidos,email,password,rpassword) {
    /*Check inputs*/ 
    if(nombres === "" || apellidos === "" || email === "" || password === "") {
        mostrarAlerta("Faltan campos por completar", "danger")
        return false
    }
    if (!nombres.match(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)) {
        /*Show error for names*/ 
        mostrarAlerta("No se aceptan numeros en nombres", "warning")
        return false
    } 
    if(!apellidos.match(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)) {
        /*Show error for lastnames*/ 
        mostrarAlerta("No se aceptan numeros en apellidos", "warning")
        return false
    }
    if (password !== rpassword) {
        /*Return error for password and rpassword no matching*/
        mostrarAlerta("Las contraseñas no coinciden","warning")
        return false 
    }
    return true
} 

/*------- MAIN SCRIPT -------*/
/*Get submit button form by ID*/
const submit = document.getElementById("registerForm")
       
/*Add event to submit button and wait for response*/
submit.addEventListener("submit", async (button_event) => {
    /* Save the values placed inside form*/
    const nombres = document.getElementById("nombres").value;
    const apellidos = document.getElementById("apellidos").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("contraseña").value;
    const rpassword = document.getElementById("rcontraseña").value;
    /*Prevent event until something is returned*/
    button_event.preventDefault();

    /*Return if form does not comply given criteria*/
    if (!checkUserInput(nombres,apellidos,email,password,rpassword)) {
        return 
    }

    try {
        /* Fetch response with a return the promise promise*/
        // fetch(resource, response)
        const respuesta = await fetch("http://localhost:3000/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nombres, apellidos, email, password })
        });

        /*Wait for the server response and save response in .json()*/
        const result = await respuesta.json();
        if(respuesta.ok) {
            mostrarAlerta(result.mensaje, "success")
            console.log(result.mensaje);
            setTimeout(function() {
                window.location.href = "../index.html"
            }, 1500);
        } else {
            mostrarAlerta(result.mensaje, "danger")
        }
    } catch(error){
        console.error("Error en la peticion: ", error);
        mostrarAlerta("No se pudo conectar con el servidor.", "danger")
    }
});

