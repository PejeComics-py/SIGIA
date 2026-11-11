/* Initialize packages */
const express = require("express"); // Manage web server 
const mysql = require("mysql2/promise"); // Manage database 
const bcrypt = require("bcryptjs"); // Encrypt using hash 
const cors = require("cors"); // Prevent html from blocking contact with scrypt
const nodemailer = require("nodemailer");
const crypto = require('crypto')
const database = require('./database.js')

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

/* ENDPOINT LOGEAR */
app.post("/login", async (req,res) => {
    // Get list of email and ṕassword from the http request and verify it
	
    const {email, password} = req.body;
	try {
        connect_db = await mysql.createConnection(dbCredentials)
		const [filas] = await connect_db.execute(
			"SELECT * FROM usuario WHERE correo = ?", [email]
		);

		if(filas.length === 0) {
			return res.status(401).json({ mensaje: "Usuario o contraseña incorrectos"});
		}

		const usuario = filas[0];
   
		const validar = await bcrypt.compare(password, usuario.contraseña);

		if (validar) {
			res.json({ mensaje: "¡Inicio exitoso!"});
		} else {
			res.status(401).json({ mensaje: "Usuario o contraseña incorrectos"});
		} 
	} catch (error){
		console.error(error);
		res.status(500).json({ mensaje: "Error en el server"});
	} finally {  
        if (connect_db){
            await connect_db.end();
        };
    };
});
/*--- ENDPOINT REGISTRAR ---*/ 
app.post("/register", async (req,res) => {
    // Save data send to end point into database
    
    const {nombres, apellidos, email, password} = req.body;
    try {
        connect_db = await mysql.createConnection(dbCredentials)

        const temporal_password = await bcrypt.hash(password,10)

        const [resultado] = await connect_db.execute(
            "INSERT INTO usuario (nombres, apellidos, correo, contraseña) VALUES(?,?,?,?)",[nombres,apellidos,email,temporal_password]
        );
        if (resultado.affectedRows > 0) {
            res.json({mensaje: "¡Registro Exitoso!"});
        } 
    } catch(error){
        console.error(error)
        res.status(500).json({ mensaje: "Error en el server"});
    } finally {
        if (connect_db){
            await connect_db.end();
        }
    }
});

/*--- ENDPOINT RECUPERARR CONTRASEÑA ---*/
app.post('/recuperar-password', async(req,res) => {
    const {email} = req.body;

    try {
        connect_db = await mysql.createConnection(dbCredentials)
        
        const[usuarios] = await connect_db.query('SELECT * FROM usuario WHERE correo = ?', [email]) 

        if (usuarios.length === 0) {
            res.status(404).json({ mensaje: 'No sé encontro correo.'});
            return 
        };
        
        const usuario = usuarios[0]

        /* Generar token aleatorio para enlace de recuperación */
        const token = crypto.randomBytes(32).toString('hex');

        /* Expirar luego de 15 minutos */
        const expire = new Date(Date.now() + 15 * 60 * 1000);

        /*Guardar token y expiration date en la base de datos*/
        await connect_db.query("UPDATE usuario SET reset_token = ?, reset_expires = ? WHERE usuario_id = ?", [token, expire, usuario.usuario_id]
        );


        /* Crear un Transport object con los datos del correo de SIGIA*/
        const sigia_correo = nodemailer.createTransport({
            // Can't do anything, google is ds
            service: 'Gmail',
            auth: {
                user: 'sigiaEmpresa@gmail.com',
                pass: 'contrasena123#'
            }
        })

        const temporal_link = `http://localhost:8080/resetPassword.html?token=${token}`

        const correo = {
            from: 'sigiaEmpresa@gmail.com',
            to: usuario.correo,
            subject: 'Recuperación de contraseña - SIGIA',
            html: `
                <div style="font-family: Arial, sans-serif;">
                    <h2>¿Olvidaste tu contraseña?</h2>
                    <p>Hola, <strong>${usuario.nombres}</strong>. Has solicitado restablecer tu contraseña en el sistema SIGIA.</p>
                    <p>Haz clic en el siguiente botón para continuar (este enlace expira en 15 minutos):</p>
                    <div>
                        <a href="${temporal_link}">Restablecer contraseña</a>
                    </div>
                    <p>Si tú no solicitaste este cambio, puedes ignorar este mensaje de forma segura.</p>
                </div>
            `
        };

        /* Enviar el correo */
        await sigia_correo.sendMail(correo);

        res.status(200).json({ mensaje: 'Recibíras un enlace de recuperación a tu correo.'});

    } catch(error) {
        console.error(error)
        res.status(500).json({ mensaje: "Error en el server"});
    } finally {
        if (connect_db){
            await connect_db.end();
        }
    }
});

(async () => {
    await database.verificarBaseDeDatos();
    app.listen(3000, async () => {
        console.log("Servidor escuchando en http://localhost:3000");
    });
})();
