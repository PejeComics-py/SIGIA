-- MySQL dump 10.13  Distrib 8.4.10, for Linux (x86_64)
--
-- Host: localhost    Database: sigia
-- ------------------------------------------------------
-- Server version	8.4.10

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

--
-- Current Database: `sigia`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `sigia` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `sigia`;

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
  `contraseña` varchar(50) NOT NULL,
  `rol` varchar(50) NOT NULL,
  PRIMARY KEY (`usuario_id`),
  KEY `idx_usuario` (`usuario_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-08-26 17:12:14
