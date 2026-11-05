const mysql = require("mysql2/promise");

async function verificarBaseDeDatos() {
    try {
        const conexionTemporal = await mysql.createConnection({
            host: "localhost", 
            user: "root",
            password: "1111",
        });

        /*Guardar respuesta de mysql en tabla*/
        const [rows] = await conexionTemporal.query("SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = ?", ["sigia"]);

        if (rows.length === 0) {
            console.log("Base de datos no existe...");

            await conexionTemporal.query("CREATE DATABASE IF NOT EXISTS sigia;");
            const db = await mysql.createConnection({
                host: "localhost", 
                user: "root",
                password: "1111",
                database: "sigia",
            })
            conexionTemporal.end();
            // Crear tabla lote
            await db.query(`
                CREATE TABLE IF NOT EXISTS lote (
                    lote_id int NOT NULL AUTO_INCREMENT,
                    nombre_lote varchar(50) NOT NULL,
                    estado_lote varchar(50) NOT NULL,
                    PRIMARY KEY (lote_id)
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
            `);
            // Crear tabla usuario
            await db.query(`
                CREATE TABLE IF NOT EXISTS usuario (
                    usuario_id int NOT NULL AUTO_INCREMENT,
                    nombres varchar(50) NOT NULL,
                    apellidos varchar(50) NOT NULL,
                    correo varchar(50) NOT NULL,
                    contraseña varchar(255) NOT NULL,
                    rol varchar(50) NOT NULL DEFAULT 'usuario',
                    PRIMARY KEY (usuario_id),
                    KEY idx_usuario (usuario_id)
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
            `);
            // Crear tabla alerta
            await db.query(`
                CREATE TABLE IF NOT EXISTS alerta (
                    alerta_id int NOT NULL AUTO_INCREMENT,
                    fecha datetime DEFAULT NULL,
                    tipo_alerta varchar(50) DEFAULT NULL,
                    descripcion varchar(50) DEFAULT NULL,
                    lote_id int DEFAULT NULL,
                    PRIMARY KEY (alerta_id),
                    KEY lote_id (lote_id),
                    CONSTRAINT alerta_ibfk_1 FOREIGN KEY (lote_id) REFERENCES lote (lote_id)
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
            `);
            // Crear tabla ganerar_alerta
            await db.query(`
                CREATE TABLE IF NOT EXISTS generar_alerta (
                    usuario_id int DEFAULT NULL,
                    alerta_id int DEFAULT NULL,
                    KEY usuario_id (usuario_id),
                    KEY alerta_id (alerta_id),
                    CONSTRAINT generar_alerta_ibfk_1 FOREIGN KEY (usuario_id) REFERENCES usuario (usuario_id),
                    CONSTRAINT generar_alerta_ibfk_2 FOREIGN KEY (alerta_id) REFERENCES alerta (alerta_id)
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
            `);
            // Crear tabla gestiona
            await db.query(`
                CREATE TABLE IF NOT EXISTS gestiona (
                    lote_id int NOT NULL,
                    usuario_id int NOT NULL,
                    KEY lote_id (lote_id),
                    KEY usuario_id (usuario_id),
                    CONSTRAINT gestiona_ibfk_1 FOREIGN KEY (lote_id) REFERENCES lote (lote_id),
                    CONSTRAINT gestiona_ibfk_2 FOREIGN KEY (usuario_id) REFERENCES usuario (usuario_id)
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
            `);
            // Crear tabla insumos
            await db.query(`
                CREATE TABLE IF NOT EXISTS insumos (
                    insumo_id int NOT NULL AUTO_INCREMENT,
                    tipo_insumo varchar(50) NOT NULL,
                    cantidad varchar(50) NOT NULL,
                    unidad varchar(5) NOT NULL,
                    usuario_id int DEFAULT NULL,
                    PRIMARY KEY (insumo_id),
                    KEY usuario_id (usuario_id),
                    CONSTRAINT insumos_ibfk_1 FOREIGN KEY (usuario_id) REFERENCES usuario (usuario_id)
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
            `);
            //Crear tabla permisos
            await db.query(`
                CREATE TABLE IF NOT EXISTS permisos (
                    permisos_id int NOT NULL,
                    permisos_name varchar(50) NOT NULL,
                    PRIMARY KEY (permisos_id)
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
            `);
            //Crear tabla permisos_usuarios
            await db.query(`
                CREATE TABLE IF NOT EXISTS permisos_usuario (
                    usuario_id int DEFAULT NULL,
                    permisos_id int DEFAULT NULL,
                    KEY usuario_id (usuario_id),
                    KEY permisos_id (permisos_id),
                    CONSTRAINT permisos_usuario_ibfk_1 FOREIGN KEY (usuario_id) REFERENCES usuario (usuario_id),
                    CONSTRAINT permisos_usuario_ibfk_2 FOREIGN KEY (permisos_id) REFERENCES permisos (permisos_id)
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
            `);
            // Crear tabla tarea
            await db.query(`
                CREATE TABLE IF NOT EXISTS tarea (
                    tarea_id INT NOT NULL AUTO_INCREMENT,
                    tipo_tarea VARCHAR(50) NOT NULL,
                    instrucción VARCHAR(500) NOT NULL,
                    usuario_id INT DEFAULT NULL,
                    lote_id INT DEFAULT NULL,
                    PRIMARY KEY (tarea_id),
                    KEY usuario_id (usuario_id),
                    KEY lote_id (lote_id),
                    CONSTRAINT tarea_ibfk_1 FOREIGN KEY (usuario_id) REFERENCES usuario (usuario_id),
                    CONSTRAINT tarea_ibfk_2 FOREIGN KEY (lote_id) REFERENCES lote (lote_id)
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
            `);
            await db.end();
            console.log("Base de datos creada...");
        } 
    } catch(e) {
        console.log(e)
    }
}

verificarBaseDeDatos()
