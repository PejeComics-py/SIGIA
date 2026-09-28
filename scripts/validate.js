document.getElementById("loginForm").addEventListener("submit", async (e) => {
	e.preventDefault();
	
	const email = document.getElementById("email").value;
	const password = document.getElementById("password").value

	try {
		const respuesta = await fetch("http://localhost:3000/login", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email, password })
    });
		
		const result = await respuesta.json();

		if(respuesta.ok) {
			console.log(result.mensaje);
			window.location.href = "frontend/sigiaHomepage.html"
		} else {
			console.log(result.mensaje);
		}
	} catch(error){
		console.error("Error en la peticion: ", error);
		console.log("Ocurrió un error al intentar conectar con el server");
	}
});

