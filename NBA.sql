-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Temps de generació: 23-01-2020 a les 12:01:15
-- Versió del servidor: 10.4.6-MariaDB
-- Versió de PHP: 7.3.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de dades: `NBA`
--

-- --------------------------------------------------------

--
-- Estructura de la taula `Equipo`
--

CREATE TABLE `Equipo` (
  `id_equipo` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Bolcament de dades per a la taula `Equipo`
--

INSERT INTO `Equipo` (`id_equipo`, `nombre`) VALUES
(1, 'Lakers'),
(2, 'Rockets'),
(3, 'Blazers');

-- --------------------------------------------------------

--
-- Estructura de la taula `Jugador`
--

CREATE TABLE `Jugador` (
  `id_jugador` int(11) NOT NULL,
  `dorsal` int(11) NOT NULL,
  `equipo` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `pts` float NOT NULL,
  `reb` float NOT NULL,
  `ast` float NOT NULL,
  `min` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Bolcament de dades per a la taula `Jugador`
--

INSERT INTO `Jugador` (`id_jugador`, `dorsal`, `equipo`, `nombre`, `pts`, `reb`, `ast`, `min`) VALUES
(15, 23, 1, 'Lebron James', 25.7, 7.1, 11, 34.8),
(16, 3, 1, 'Anthony Davis', 26.1, 9.2, 3.5, 34.5),
(17, 14, 1, 'Danny Green', 8.4, 3.4, 1.2, 25.3),
(18, 39, 1, 'Dwight Howard', 6.9, 7.1, 0.8, 20.3),
(19, 9, 1, 'Rajon Rondo', 8.4, 3, 5.3, 20.2),
(20, 0, 3, 'Damian Lillard', 27.3, 4.8, 7.3, 37),
(21, 3, 3, 'CJ McCollum', 22, 4.6, 3.8, 36.8),
(22, 7, 3, 'Carmelo Anthony', 22, 6, 2.2, 30.7),
(23, 21, 3, 'Hassan Whiteside', 14.8, 12.2, 0.9, 27.6),
(24, 5, 3, 'Roodney Hood', 12.2, 3.6, 1.6, 30.4),
(25, 13, 2, 'James Harden', 38.9, 5.9, 7.8, 36.8),
(26, 0, 2, 'Russell Westbrook', 22.1, 7.6, 6.9, 33.2),
(27, 15, 2, 'Clint Capela', 14.6, 14.7, 1, 31.9),
(28, 10, 2, 'Eric Gordon', 10.9, 1.9, 0.8, 29.4),
(29, 17, 2, 'PJ Tucker', 9.7, 6.1, 1.4, 34.7);

--
-- Índexs per a les taules bolcades
--

--
-- Índexs per a la taula `Equipo`
--
ALTER TABLE `Equipo`
  ADD PRIMARY KEY (`id_equipo`);

--
-- Índexs per a la taula `Jugador`
--
ALTER TABLE `Jugador`
  ADD PRIMARY KEY (`id_jugador`),
  ADD KEY `equipo` (`equipo`);

--
-- AUTO_INCREMENT per les taules bolcades
--

--
-- AUTO_INCREMENT per la taula `Equipo`
--
ALTER TABLE `Equipo`
  MODIFY `id_equipo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT per la taula `Jugador`
--
ALTER TABLE `Jugador`
  MODIFY `id_jugador` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- Restriccions per a les taules bolcades
--

--
-- Restriccions per a la taula `Jugador`
--
ALTER TABLE `Jugador`
  ADD CONSTRAINT `equipo` FOREIGN KEY (`equipo`) REFERENCES `Equipo` (`id_equipo`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
