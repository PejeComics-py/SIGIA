const express = require("express");
const mysql = require("mysql2/promise");
const bcrypt = require("bcryptjs");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const dbCredentials = {
	host: "localhost",
	user: "root",
	password: "1111",
	database: "sigia"
};

app.post("/login", async (req,res) => {
	const { email, password} = req.body;

	try {
		const connect_db = await mysql.createConnection(dbCredentials)
		const [filas] = await connect_db.execute(
			"SELECT * FROM usuario WHERE correo = ?", [email]
		);

		if(filas.length === 0) {
			return res.status(401).json({ mensaje: "Usuario o contraseña incorrectos"});
		}

		const usuario = filas[0]

		const validar = await bcrypt.compare(password, usuario.contraseña);

		if (validar) {
			res.json({ mensaje: "¡Inicio exitoso!"})
		} else {
			res.status(401).json({ mensaje: "Usuario o contraseña incorrectos"})
		} 
	} catch (error){
		console.error(error);
		res.status(500).json({ mensaje: "Error en el server"});
	} finally {
		connect_db.end()
	}
});

app.listen(3000, () => {
	console.log("Servidor escuchando en http://localhost:3000")
})
