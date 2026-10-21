/* Initialize packages */
const express = require("express"); // Manage web server 
const mysql = require("mysql2/promise"); // Manage database 
const bcrypt = require("bcryptjs"); // Encrypt using hash 
const cors = require("cors"); // Prevent html from blocking contact with scrypt

const app = express();
app.use(express.json()); // Allow retrieval of JSON forms 
app.use(cors()); // Initilalize cors

/* Dictionary of entries to access database*/
const dbCredentials = {
	//localhost@root
    host: "localhost", 
	user: "root",
	password: "1111",
	database: "sigia"
};

let connect_db;

// Respond to https responses 
//Connect to the localhost/login as an asynchronous function
app.post("/login", async (req,res) => {
    // Get list of email and ṕassword from the http request
	const {email, password} = req.body;

	try {
        connect_db = await mysql.createConnection(dbCredentials)
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
        if (connect_db){
            await connect_db.end()
    }
});

app.post("/register", async (req,res) => {
    const {nombres, apellidos, email, password} = req.body;
    
    try {
        connect_db = await mysql.createConnection(dbCredentials)

        const temporal_password = await bcrypt.hash(password,10)

        const [resultado] = await connect_db.execute(
            "INSERT INTO usuario (nombres, apellidos, correo, contraseña) VALUES(?,?,?,?)",[nombres,apellidos,email,temporal_password]
        );
        if (resultado.affectedRows > 0) {
            res.json({mensaje: "¡Registro Exitoso!"})
        } 
    } catch(error){
        console.error(error)
        res.status(500).json({ mensaje: "Error en el server"})

    } finally {
        if (connect_db){
            await connect_db.end()
        }
    }
})

app.listen(3000, () => {
	console.log("Servidor escuchando en http://localhost:3000")
})
