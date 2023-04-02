-- CreateTable
CREATE TABLE `classes` (
    `idClasse` INTEGER NOT NULL AUTO_INCREMENT,
    `nomClasse` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`idClasse`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cours` (
    `idCours` INTEGER NOT NULL AUTO_INCREMENT,
    `idEleve` INTEGER NOT NULL,
    `idProf` INTEGER NOT NULL,
    `idMatiere` INTEGER NOT NULL,
    `idSession` INTEGER NOT NULL,

    INDEX `idEleve`(`idEleve`),
    INDEX `idMatiere`(`idMatiere`),
    INDEX `idProf`(`idProf`),
    INDEX `idSession`(`idSession`),
    PRIMARY KEY (`idCours`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `eleves` (
    `idEleve` INTEGER NOT NULL AUTO_INCREMENT,
    `identifiant` VARCHAR(50) NOT NULL,
    `password` VARCHAR(50) NOT NULL,
    `nomEleve` VARCHAR(50) NOT NULL,
    `prenomEleve` VARCHAR(50) NOT NULL,
    `genre` VARCHAR(50) NOT NULL,
    `dateNaiss` DATE NOT NULL,
    `email` VARCHAR(50) NOT NULL,
    `tel` VARCHAR(50) NOT NULL,
    `idClasse` INTEGER NOT NULL,

    INDEX `idClasse`(`idClasse`),
    PRIMARY KEY (`idEleve`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `matieres` (
    `idMatiere` INTEGER NOT NULL AUTO_INCREMENT,
    `descMatiere` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`idMatiere`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `notes` (
    `idNote` INTEGER NOT NULL AUTO_INCREMENT,
    `score` INTEGER NOT NULL,
    `idEleve` INTEGER NOT NULL,
    `idCours` INTEGER NOT NULL,

    INDEX `idCours`(`idCours`),
    INDEX `idEleve`(`idEleve`),
    PRIMARY KEY (`idNote`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `professeurs` (
    `idProf` INTEGER NOT NULL AUTO_INCREMENT,
    `identifiant` VARCHAR(50) NOT NULL,
    `password` VARCHAR(50) NOT NULL,
    `nomProf` VARCHAR(50) NOT NULL,
    `prenomProf` VARCHAR(50) NOT NULL,
    `genre` VARCHAR(50) NOT NULL,
    `dateNaiss` DATE NOT NULL,
    `email` VARCHAR(50) NOT NULL,
    `tel` VARCHAR(50) NOT NULL,
    `salaire` INTEGER NOT NULL,

    PRIMARY KEY (`idProf`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sessions` (
    `idSession` INTEGER NOT NULL AUTO_INCREMENT,
    `descSession` VARCHAR(255) NOT NULL,
    `dateDebut` DATETIME(0) NOT NULL,
    `dateFin` DATETIME(0) NOT NULL,

    PRIMARY KEY (`idSession`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `cours` ADD CONSTRAINT `cours_ibfk_1` FOREIGN KEY (`idEleve`) REFERENCES `eleves`(`idEleve`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cours` ADD CONSTRAINT `cours_ibfk_2` FOREIGN KEY (`idProf`) REFERENCES `professeurs`(`idProf`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cours` ADD CONSTRAINT `cours_ibfk_3` FOREIGN KEY (`idMatiere`) REFERENCES `matieres`(`idMatiere`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cours` ADD CONSTRAINT `cours_ibfk_4` FOREIGN KEY (`idSession`) REFERENCES `sessions`(`idSession`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `eleves` ADD CONSTRAINT `eleves_ibfk_1` FOREIGN KEY (`idClasse`) REFERENCES `classes`(`idClasse`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `notes` ADD CONSTRAINT `notes_ibfk_1` FOREIGN KEY (`idEleve`) REFERENCES `eleves`(`idEleve`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `notes` ADD CONSTRAINT `notes_ibfk_2` FOREIGN KEY (`idCours`) REFERENCES `cours`(`idCours`) ON DELETE CASCADE ON UPDATE CASCADE;

