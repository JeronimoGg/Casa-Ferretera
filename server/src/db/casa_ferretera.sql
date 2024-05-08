-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: casa_ferretera
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

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
-- Table structure for table `auxmercadeo`
--

DROP TABLE IF EXISTS `auxmercadeo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auxmercadeo` (
  `id_auxmercado` int(11) NOT NULL AUTO_INCREMENT,
  `correo` varchar(100) NOT NULL,
  `contrasena` varchar(100) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  PRIMARY KEY (`id_auxmercado`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auxmercadeo`
--

LOCK TABLES `auxmercadeo` WRITE;
/*!40000 ALTER TABLE `auxmercadeo` DISABLE KEYS */;
INSERT INTO `auxmercadeo` VALUES (1,'samuel@gmail.com','$2a$10$xtwJGy6KdjjpCcGAqc1zrO16J22MC00xZp.ibZeLD4szq.P8EQkwi','samuel');
/*!40000 ALTER TABLE `auxmercadeo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `empresa`
--

DROP TABLE IF EXISTS `empresa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `empresa` (
  `id_empresa` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  PRIMARY KEY (`id_empresa`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empresa`
--

LOCK TABLES `empresa` WRITE;
/*!40000 ALTER TABLE `empresa` DISABLE KEYS */;
INSERT INTO `empresa` VALUES (1,'techvanguard'),(2,'casa ferretera'),(3,'eafit');
/*!40000 ALTER TABLE `empresa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estado`
--

DROP TABLE IF EXISTS `estado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estado` (
  `id_estado` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(20) NOT NULL,
  PRIMARY KEY (`id_estado`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estado`
--

LOCK TABLES `estado` WRITE;
/*!40000 ALTER TABLE `estado` DISABLE KEYS */;
INSERT INTO `estado` VALUES (1,'programada'),(2,'en progreso'),(3,'terminada'),(4,'cancelada');
/*!40000 ALTER TABLE `estado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `promotor`
--

DROP TABLE IF EXISTS `promotor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `promotor` (
  `id_promotor` int(11) NOT NULL AUTO_INCREMENT,
  `id_proveedor` int(11) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `contrasena` varchar(100) NOT NULL,
  `calificacion` int(11) NOT NULL,
  `documentos` varchar(100) NOT NULL,
  PRIMARY KEY (`id_promotor`),
  KEY `fk_proveedor` (`id_proveedor`),
  CONSTRAINT `fk_proveedor` FOREIGN KEY (`id_proveedor`) REFERENCES `proveedor` (`id_proveedor`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `promotor`
--

LOCK TABLES `promotor` WRITE;
/*!40000 ALTER TABLE `promotor` DISABLE KEYS */;
INSERT INTO `promotor` VALUES (1,1,'dav@gmail.com','dav','$2a$10$JHu8ADe61d9r9Kwr6TTvluCvhDQYZlCazVUvaRVW2.G0RV.2Enmk6',3,'documento'),(4,1,'test2@gmail.com','daniel','$2a$10$.fHXe9s3CWUWExXF3a6ulOWZmJkyLh/TqwyS5IB1htlsqLl.w5LYq',3,'documento');
/*!40000 ALTER TABLE `promotor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `promotoria`
--

DROP TABLE IF EXISTS `promotoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `promotoria` (
  `id_promotoria` int(11) NOT NULL AUTO_INCREMENT,
  `id_promotor` int(11) NOT NULL,
  `id_proveedor` int(11) NOT NULL,
  `id_sede` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `horaInicio` time NOT NULL,
  `horaFinal` time NOT NULL,
  `id_estado` int(11) NOT NULL,
  `calificacion` int(11) NOT NULL,
  `registroFotos` varchar(300) NOT NULL,
  `descripcion` varchar(300) NOT NULL,
  `id_empresa` int(11) NOT NULL,
  PRIMARY KEY (`id_promotoria`),
  KEY `fk_estado_promotoria` (`id_estado`),
  KEY `fk_promotor_promotoria` (`id_promotor`),
  KEY `fk_sede_promotoria` (`id_sede`),
  KEY `fk_proveedor_promotoria` (`id_proveedor`),
  KEY `promotoria_empresa_FK` (`id_empresa`),
  CONSTRAINT `fk_estado_promotoria` FOREIGN KEY (`id_estado`) REFERENCES `estado` (`id_estado`),
  CONSTRAINT `fk_promotor_promotoria` FOREIGN KEY (`id_promotor`) REFERENCES `promotor` (`id_promotor`),
  CONSTRAINT `fk_proveedor_promotoria` FOREIGN KEY (`id_proveedor`) REFERENCES `proveedor` (`id_proveedor`),
  CONSTRAINT `fk_sede_promotoria` FOREIGN KEY (`id_sede`) REFERENCES `sede` (`id_sede`),
  CONSTRAINT `promotoria_empresa_FK` FOREIGN KEY (`id_empresa`) REFERENCES `empresa` (`id_empresa`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `promotoria`
--

LOCK TABLES `promotoria` WRITE;
/*!40000 ALTER TABLE `promotoria` DISABLE KEYS */;
INSERT INTO `promotoria` VALUES (12,1,1,3,'2024-05-01','09:00:00','13:00:00',1,0,'','',1),(13,1,1,3,'2024-05-02','09:00:00','13:00:00',1,0,'','',1),(14,1,1,3,'2024-05-02','14:00:00','17:00:00',1,0,'','',1);
/*!40000 ALTER TABLE `promotoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proveedor`
--

DROP TABLE IF EXISTS `proveedor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `proveedor` (
  `id_proveedor` int(11) NOT NULL AUTO_INCREMENT,
  `correo` varchar(100) NOT NULL,
  `contrasena` varchar(100) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `id_empresa` int(11) NOT NULL,
  PRIMARY KEY (`id_proveedor`),
  KEY `fk_empresa_proveedor` (`id_empresa`),
  CONSTRAINT `fk_empresa_proveedor` FOREIGN KEY (`id_empresa`) REFERENCES `empresa` (`id_empresa`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proveedor`
--

LOCK TABLES `proveedor` WRITE;
/*!40000 ALTER TABLE `proveedor` DISABLE KEYS */;
INSERT INTO `proveedor` VALUES (1,'juanes@gmail.com','$2a$10$JbYl2vevWHmQ6mSv/PlSmeYdaqsgvn6yTrXT8TKRyAFeUzG9S7EZy','juanes',1),(3,'jane_smith5678@gmail.com','$2a$10$F/qxnC/zz6SrB4NQrWSbh.JNTfKQuxwotslkZ8EWaaSSnD88TpmQO','Jane',2),(4,'alex_jones@gmail.com','$2a$10$8lwKDsi894WCq54RLVI9IOHEARSJcjLaiAghW0hbmKQvzkArqC7FC','Alex',3),(5,'john_doe@gmail.com','$2a$10$VpuLEu5lroC6vKOuY/4rGe6V5cGHIXqyl03tLxf5wTs2k8zYcdBy2','john',1),(6,'michael_wilson@gmail.com','$2a$10$d.y02RJbA79/HNFh.s0fbOlPdWR7qSs2zowNLQ45HUT1fiN6jKpeu','michael',3),(7,'chris_taylor@gmail.com','$2a$10$GRv42axJZXpKrGVnml0xU.Cl4YAs8vlXrp.nDYvpy.bzYIRNlkGEW','chris',2);
/*!40000 ALTER TABLE `proveedor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sede`
--

DROP TABLE IF EXISTS `sede`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sede` (
  `id_sede` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  PRIMARY KEY (`id_sede`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sede`
--

LOCK TABLES `sede` WRITE;
/*!40000 ALTER TABLE `sede` DISABLE KEYS */;
INSERT INTO `sede` VALUES (1,'amador'),(2,'america'),(3,'palace'),(4,'centro'),(5,'itagui'),(6,'envigado'),(7,'rionegro'),(8,'la ceja'),(9,'apartado');
/*!40000 ALTER TABLE `sede` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `supervisor`
--

DROP TABLE IF EXISTS `supervisor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `supervisor` (
  `id_supervisor` int(11) NOT NULL AUTO_INCREMENT,
  `id_sede` int(11) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `contrasena` varchar(80) NOT NULL,
  `nombre` varchar(80) NOT NULL,
  PRIMARY KEY (`id_supervisor`),
  KEY `fk_sede_supervisor` (`id_sede`),
  CONSTRAINT `fk_sede_supervisor` FOREIGN KEY (`id_sede`) REFERENCES `sede` (`id_sede`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `supervisor`
--

LOCK TABLES `supervisor` WRITE;
/*!40000 ALTER TABLE `supervisor` DISABLE KEYS */;
INSERT INTO `supervisor` VALUES (1,3,'manin@email.com','$2a$10$vPCl5nZQ8.T9gJclFh5OlO9RxlGuxweiTawtX7TTGRPPtQIQFcOCG','manin'),(3,1,'Emily12@email.com','$2a$10$7qfSRVHQN/RFXrUOdXMO3uNQqZVuH0XJFmBN1wT7d058CBzYglOyy','Emily'),(4,9,'amanda32@email.com','$2a$10$xEHg.VVzGrTby3RIxPi/oet871Rw7mCqG/Hys/2y5NkJ4wQ8cQ/XC','Amanda'),(5,8,'david58@email.com','$2a$10$dUq14Bcmn1uNX3xI1ZIOxOzfWbPBc.YUGepwU3EU71uuc5EootceW','David'),(6,4,'sebastian7@email.com','$2a$10$pJcMly0plf04j7W0ZnKOyuiRftu/W9zJVNL1BcukJhDULSAjvwuKu','Sebastian');
/*!40000 ALTER TABLE `supervisor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'casa_ferretera'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-08 12:17:04
