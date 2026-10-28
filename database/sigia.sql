-- MySQL dump 10.13  Distrib 9.7.2, for Linux (x86_64)
--
-- Host: localhost    Database: sigia
-- ------------------------------------------------------
-- Server version	9.7.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '27c08ad1-c0e6-11f1-8715-9c6b00624175:1-9';

--
-- Table structure for table `alerta`
--

DROP TABLE IF EXISTS `alerta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alerta` (
  `alerta_id` int NOT NULL AUTO_INCREMENT,
  `fecha` datetime DEFAULT NULL,
  `tipo_alerta` varchar(50) DEFAULT NULL,
  `descripcion` varchar(50) DEFAULT NULL,
  `lote_id` int DEFAULT NULL,
  PRIMARY KEY (`alerta_id`),
  KEY `lote_id` (`lote_id`),
  CONSTRAINT `alerta_ibfk_1` FOREIGN KEY (`lote_id`) REFERENCES `lote` (`lote_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alerta`
--

LOCK TABLES `alerta` WRITE;
/*!40000 ALTER TABLE `alerta` DISABLE KEYS */;
/*!40000 ALTER TABLE `alerta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `generar_alerta`
--

DROP TABLE IF EXISTS `generar_alerta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `generar_alerta` (
  `usuario_id` int DEFAULT NULL,
  `alerta_id` int DEFAULT NULL,
  KEY `usuario_id` (`usuario_id`),
  KEY `alerta_id` (`alerta_id`),
  CONSTRAINT `generar_alerta_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`usuario_id`),
  CONSTRAINT `generar_alerta_ibfk_2` FOREIGN KEY (`alerta_id`) REFERENCES `alerta` (`alerta_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `generar_alerta`
--

LOCK TABLES `generar_alerta` WRITE;
/*!40000 ALTER TABLE `generar_alerta` DISABLE KEYS */;
/*!40000 ALTER TABLE `generar_alerta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gestiona`
--

DROP TABLE IF EXISTS `gestiona`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gestiona` (
  `lote_id` int NOT NULL,
  `usuario_id` int NOT NULL,
  KEY `lote_id` (`lote_id`),
  KEY `usuario_id` (`usuario_id`),
  CONSTRAINT `gestiona_ibfk_1` FOREIGN KEY (`lote_id`) REFERENCES `lote` (`lote_id`),
  CONSTRAINT `gestiona_ibfk_2` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`usuario_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gestiona`
--

LOCK TABLES `gestiona` WRITE;
/*!40000 ALTER TABLE `gestiona` DISABLE KEYS */;
/*!40000 ALTER TABLE `gestiona` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `insumos`
--

DROP TABLE IF EXISTS `insumos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `insumos` (
  `insumo_id` int NOT NULL AUTO_INCREMENT,
  `tipo_insumo` varchar(50) NOT NULL,
  `cantidad` varchar(50) NOT NULL,
  `unidad` varchar(5) NOT NULL,
  `usuario_id` int DEFAULT NULL,
  PRIMARY KEY (`insumo_id`),
  KEY `usuario_id` (`usuario_id`),
  CONSTRAINT `insumos_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`usuario_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `insumos`
--

LOCK TABLES `insumos` WRITE;
/*!40000 ALTER TABLE `insumos` DISABLE KEYS */;
/*!40000 ALTER TABLE `insumos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lote`
--

DROP TABLE IF EXISTS `lote`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lote` (
  `lote_id` int NOT NULL AUTO_INCREMENT,
  `nombre_lote` varchar(50) NOT NULL,
  `estado_lote` varchar(50) NOT NULL,
  PRIMARY KEY (`lote_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lote`
--

LOCK TABLES `lote` WRITE;
/*!40000 ALTER TABLE `lote` DISABLE KEYS */;
/*!40000 ALTER TABLE `lote` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permisos`
--

DROP TABLE IF EXISTS `permisos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permisos` (
  `permisos_id` int NOT NULL,
  `permisos_name` varchar(50) NOT NULL,
  PRIMARY KEY (`permisos_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permisos`
--

LOCK TABLES `permisos` WRITE;
/*!40000 ALTER TABLE `permisos` DISABLE KEYS */;
/*!40000 ALTER TABLE `permisos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permisos_usuario`
--

DROP TABLE IF EXISTS `permisos_usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permisos_usuario` (
  `usuario_id` int DEFAULT NULL,
  `permisos_id` int DEFAULT NULL,
  KEY `usuario_id` (`usuario_id`),
  KEY `permisos_id` (`permisos_id`),
  CONSTRAINT `permisos_usuario_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`usuario_id`),
  CONSTRAINT `permisos_usuario_ibfk_2` FOREIGN KEY (`permisos_id`) REFERENCES `permisos` (`permisos_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permisos_usuario`
--

LOCK TABLES `permisos_usuario` WRITE;
/*!40000 ALTER TABLE `permisos_usuario` DISABLE KEYS */;
/*!40000 ALTER TABLE `permisos_usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tarea`
--

DROP TABLE IF EXISTS `tarea`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tarea` (
  `tarea_id` int NOT NULL AUTO_INCREMENT,
  `tipo_tarea` varchar(50) NOT NULL,
  `instrucción` varchar(500) NOT NULL,
  `usuario_id` int DEFAULT NULL,
  PRIMARY KEY (`tarea_id`),
  KEY `usuario_id` (`usuario_id`),
  CONSTRAINT `tarea_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`usuario_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tarea`
--

LOCK TABLES `tarea` WRITE;
/*!40000 ALTER TABLE `tarea` DISABLE KEYS */;
/*!40000 ALTER TABLE `tarea` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `usuario_id` int NOT NULL AUTO_INCREMENT,
  `nombres` varchar(50) NOT NULL,
  `apellidos` varchar(50) NOT NULL,
  `correo` varchar(50) NOT NULL,
  `contraseña` varchar(255) NOT NULL,
  `rol` varchar(50) NOT NULL DEFAULT 'usuario',
  PRIMARY KEY (`usuario_id`),
  KEY `idx_usuario` (`usuario_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'LOL','whatever','maybe@gmail.com','$2b$10$fdcqfbvst4SlJaFlvNAVqeYvs6NU02YHvTTlLhhFIc3sJMbO.yAEW','usuario'),(2,'Kurt','Cobain','realKurt@gmail.com','$2b$10$kEK6Xw17kANpJ/Xp1c3MM.x/cpT4WVj2QaioQ4X5xg0JnCmxGoTIO','usuario'),(3,'myDog','mrDog','meDog@gmail.com','$2b$10$9tEXVp1zsAhuzE/LyfOrBOyPh64HTpiwNRe5N2iq0vyRD9KosSFYW','usuario'),(4,'Tom Yhorke','Your mom','jeje@gmail.com','$2b$10$I2rur4712P9oP4NNrdPxDuS/L9vzsqLzKiGMMTFcSNcHiaUxFzlA.','usuario'),(5,'mexicano','papu','papu@gmai.com','$2b$10$SexFdhpSCjI.kA54r1ARUejCJH0ecUJFlam0kn4EzFkfDYwmNxUny','usuario'),(6,'nigga','watermelon','nigga@gmail.com','$2b$10$zNkUYrk5c8XeQAHFHQXCuudCyVliyh38PSQs9Sdb5yh66ggJwdYZC','usuario'),(7,'William','Z','w@gmail.com','william','usuario');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-10-22 15:13:52
