const latitud = 4.8143;
const longitud = -75.6949;

const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitud}&longitude=${longitud}&current=temperature_2m,relative_humidity_2m,precipitation_probability`;
async function obtenerVariables() {
	try {
		const respuesta = await fetch(url);
		if(!respuesta.ok) throw new Error("Error para solicitud del clima")

		// Obteniendo los datos de la respuesta en json
		const datos = await respuesta.json();

		//Obteniendo cada variable para el clima
		const temperatura = datos.current.temperature_2m;
		const humedad = datos.current.relative_humidity_2m;
		const prec = datos.current.precipitation_probability;

		document.getElementById("temp").textContent = `${temperatura}°C`;
		document.getElementById("humedad").textContent = `${humedad}%`;
		document.getElementById("prec").textContent = `${prec}%`;

	} catch (error){
		console.error("ERROR: No se pudo obtener el clima",error);

	}
}

obtenerVariables()

