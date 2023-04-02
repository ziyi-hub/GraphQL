-- CreateTable
CREATE TABLE `professeurs` (
    `idProf` INTEGER NOT NULL AUTO_INCREMENT,
    `identifiant` VARCHAR(50) NOT NULL,
    `password` VARCHAR(50) NOT NULL,
    `nomProf` VARCHAR(50) NOT NULL,
    `prenomProf` VARCHAR(50) NOT NULL,
    `genre` VARCHAR(50) NOT NULL,
    `dateNaiss` Date NOT NULL,
    `email` VARCHAR(50) NOT NULL,
    `tel` VARCHAR(50) NOT NULL,
    `salaire` INTEGER NOT NULL,

    PRIMARY KEY (`idProf`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `classes` (
    `idClasse` INTEGER NOT NULL AUTO_INCREMENT,
    `nomClasse` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`idClasse`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sessions` (
    `idSession` INTEGER NOT NULL AUTO_INCREMENT,
    `descSession` VARCHAR(255) NOT NULL,
    `dateDebut` DATETIME NOT NULL,
    `dateFin` DATETIME NOT NULL,

    PRIMARY KEY (`idSession`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `matieres` (
    `idMatiere` INTEGER NOT NULL AUTO_INCREMENT,
    `descMatiere` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`idMatiere`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;


-- CreateTable
CREATE TABLE `eleves` (
    `idEleve` INTEGER NOT NULL AUTO_INCREMENT,
    `identifiant` VARCHAR(50) NOT NULL,
    `password` VARCHAR(50) NOT NULL,
    `nomEleve` VARCHAR(50) NOT NULL,
    `prenomEleve` VARCHAR(50) NOT NULL,
    `genre` VARCHAR(50) NOT NULL,
    `dateNaiss` Date NOT NULL,
    `email` VARCHAR(50) NOT NULL,
    `tel` VARCHAR(50) NOT NULL,
    `idClasse` INTEGER NOT NULL,

    INDEX `idClasse`(`idClasse`),
    PRIMARY KEY (`idEleve`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `notes` (
     `idNote` INTEGER NOT NULL AUTO_INCREMENT,
     `score` INTEGER NOT NULL,
     `idEleve` INTEGER NOT NULL,
     `idCours` INTEGER NOT NULL,

     INDEX `idEleve`(`idEleve`),
     INDEX `idCours`(`idCours`),
     PRIMARY KEY (`idNote`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cours` (
    `idCours` INTEGER NOT NULL AUTO_INCREMENT,
    `idEleve` INTEGER NOT NULL,
    `idProf` INTEGER NOT NULL,
    `idMatiere` INTEGER NOT NULL,
    `idSession` INTEGER NOT NULL,

    INDEX `idEleve`(`idEleve`),
    INDEX `idProf`(`idProf`),
    INDEX `idMatiere`(`idMatiere`),
    INDEX `idSession`(`idSession`),
    PRIMARY KEY (`idCours`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `eleves` ADD CONSTRAINT `eleves_ibfk_1` FOREIGN KEY (`idClasse`) REFERENCES `classes`(`idClasse`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `notes` ADD CONSTRAINT `notes_ibfk_1` FOREIGN KEY (`idEleve`) REFERENCES `eleves`(`idEleve`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `notes` ADD CONSTRAINT `notes_ibfk_2` FOREIGN KEY (`idCours`) REFERENCES `cours`(`idCours`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cours` ADD CONSTRAINT `cours_ibfk_1` FOREIGN KEY (`idEleve`) REFERENCES `eleves`(`idEleve`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `cours` ADD CONSTRAINT `cours_ibfk_2` FOREIGN KEY (`idProf`) REFERENCES `professeurs`(`idProf`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `cours` ADD CONSTRAINT `cours_ibfk_3` FOREIGN KEY (`idMatiere`) REFERENCES `matieres`(`idMatiere`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `cours` ADD CONSTRAINT `cours_ibfk_4` FOREIGN KEY (`idSession`) REFERENCES `sessions`(`idSession`) ON DELETE CASCADE ON UPDATE CASCADE;

-- Déchargement des données
INSERT INTO `classes` (`idClasse`, `nomClasse`) VALUES (null, 'X-MAS-DEV-4-1'), (null, 'X-MAS-DEV-4-2'), (null, 'X-MAS-DEV-4-3');
INSERT INTO `eleves` (`idEleve`, `identifiant`, `password`, `nomEleve`, `prenomEleve`, `genre`, `dateNaiss`, `email`, `tel`, `idClasse`) VALUES
(null, '20221601', 'K39G3FIwgo9xcT8r', 'Devilliers', 'Paul', 'm', '2001-04-05', 'paul.devilliers@efrei.net', '0633129804', 3),
(null, '20221602', 'K39G3FIwgo9xcT8r', 'Wojciak', 'Thibaut', 'm', '2001-08-13', 'thibaut.wojciak@efrei.net', '0633129804', 1),
(null, '20221603', 'K39G3FIwgo9xcT8r', 'Wang', 'Ziyi', 'f', '2000-10-27', 'ziyi.wang@efrei.net', '0618978204', 2);
INSERT INTO `matieres` (`idMatiere`, `descMatiere`) VALUES
(null, 'Concevoir et développer une architecture de stockage de données'),
(null, 'Développement d\'applcations'),
(null, 'Gestion du système d\'information'),
(null, 'Intelligence artificielle');
INSERT INTO `professeurs` (`idProf`, `identifiant`, `password`, `nomProf`, `prenomProf`, `genre`, `dateNaiss`, `email`, `tel`, `salaire`) VALUES
(null, '20221699', 'K39G3FIwgo9xcT8r', 'Rémi', 'Do', 'm', '1970-03-06', 'do.remi@efrei.net', '0690745321', 5000),
(null, '20221698', 'K39G3FIwgo9xcT8r', 'Ouaki', 'Valentin', 'm', '1972-03-05', 'valentin.ouaki@efrei.net', '0647938201', 5500),
(null, '20221697', 'K39G3FIwgo9xcT8r', 'Carbonneau', 'Alexandre', 'm', '1980-03-06', 'carbonneau.alexandre@efrei.net', '0611003376', 4000),
(null, '20221696', 'K39G3FIwgo9xcT8r', 'Lee', 'Jessica', 'f', '1985-03-06', 'lee.jessica@efrei.net', '0633129852', 4500);
INSERT INTO `sessions` (`idSession`, `descSession`, `dateDebut`, `dateFin`) VALUES
(null, '2022-2023 - S8', '2023-04-03 09:00:00', '2023-03-03 13:00:00'),
(null, '2022-2023 - S8', '2023-04-03 14:00:00', '2023-03-03 17:30:00'),
(null, '2022-2023 - S8', '2023-03-04 09:00:00', '2023-03-04 13:00:00'),
(null, '2022-2023 - S8', '2023-03-04 14:00:00', '2023-03-04 17:30:00');
INSERT INTO `cours` (`idCours`, `idEleve`, `idProf`, `idMatiere`, `idSession`) VALUES (null, 3, 2, 3, 1), (null, 1, 2, 3, 4), (null, 2, 4, 2, 3);
INSERT INTO `notes` (`idNote`, `score`, `idEleve`, `idCours`) VALUES (null, 16, 3, 1), (null, 15, 1, 2), (null, 14, 2, 3);





