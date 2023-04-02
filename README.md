## [X-MAS-DEV-4-3][GraphQL] WANG Ziyi


## Installation
- npm install
- nodemon server.js
- Vous pouvez insérer des données en copiant root/migration.sql
- Vous pouvez tester des fonctionnalités en utilisant des exemples ci-dessous
- Si le fichier est endommagé, veuillez me contacter s'il vous plaît ziyiwang1027@gmail.com, merci


## Serveur graphiql
- http://localhost:3202/graphql


## getClasses: getter l'ensemble de classes
- 	{
      getClasses {
        idClasse,
        nomClasse,
        eleves{
          idEleve,
          nomEleve,
          prenomEleve,
          genre,
          dateNaiss,
          email,
          tel,
          notes{
            idNote,
            score
          }
        }
      }
    }
    
    
## getElevesById: getter un élève par idEleve
- {
    getElevesById(idEleve: 1) {
      idEleve,
      nomEleve,
      prenomEleve,
      genre,
      dateNaiss,
      email,
      tel
    }
  }


    
## getElevesByIdClasses: getter l'ensemble d'élève dans une classe
- {
    getElevesByIdClasses(idClasse: 1) {
      idEleve,
      identifiant,
      password,
      nomEleve,
      prenomEleve,
      genre,
      dateNaiss,
      email,
      tel
    }
  }
  
  
## getProfsByName: Récupérer l'ensemble de prof dont le nom ou prénom contient nameProf
- {
    getProfsByName(nameProf: "Lee") {
      idProf,
      identifiant,
      password,
      nomProf,
      prenomProf,
      genre,
      dateNaiss,
      email,
      tel,
      salaire
    }
  }
  
  
## getSessionsByDate: Récupérer l'ensemble de session dont la période pendant la date début et la date de fin
- {
    getSessionsByDate(
      dateDebut: "2023-03-04 00:00:00",
      dateFin: "2023-03-04 23:59:59"
    ) {
      idSession,
      descSession,
      dateDebut,
      dateFin
    }
  }


## getNotesByIdEleve: Récupérer l'ensemble de notes qu'idEleve indiqué
- {
    getNotesByIdEleve(idEleve: 3) {
      idNote,
      score,
      idEleve,
      idCours
    }
  }
  
  
## getMatiereById: Récupérer l'ensemble de matières qu'idMatiere indiqué
- {
    getMatiereById(idMatiere: 1) {
      idMatiere,
      descMatiere
    }
  }
  

## getCoursById: Récupérer un cours qu'idCours indiqué
- {
    getCoursById(idCours: 1) {
      idEleve,
      idProf,
      idMatiere,
      idSession,
      notes{
        idNote,
        score,
        idEleve,
        idCours
      }
    }
  }

    
## addEleveWithClasse: Ajout un élève qui lie avec une classe existant en saisant idClasse
- mutation{
    addEleveWithClasse
      (
        identifiant: "20221604", 
        password: "K39G3FIwgo9xcT8r",
        nomEleve: "Olivia",
        prenomEleve: "Tania", 
        genre: "f",
        dateNaiss: "2000-10-27", 
        email: "tania.olivia@efrei.net", 
        tel: "0637199806", 
        idClasse: 3
      ) 
      {
        idEleve,
        identifiant,
        password,
        nomEleve,
        prenomEleve,
        genre,
        dateNaiss,
        email,
        tel,
        idClasse
      }
  }
  
  
## addEleveWithClasseOrCreateClasse: Ajout un élève qui est possible de lier avec une classe inexistant
- mutation{
    addEleveWithClasseOrCreateClasse
      (
        identifiant: "20221604", 
        password: "K39G3FIwgo9xcT8r",
        nomEleve: "Kim",
        prenomEleve: "Tania", 
        genre: "f",
        dateNaiss: "2000-10-27", 
        email: "tania.olivia@efrei.net", 
        tel: "0637199806", 
        idClasse: 4,
        nomClasse: "X-MAS-DEV-4-4"
      ) 
      {
        idEleve,
        identifiant,
        password,
        nomEleve,
        prenomEleve,
        genre,
        dateNaiss,
        email,
        tel,
        idClasse
      }
  }
  
 
## addProf: Ajout un professeur
-  mutation{
     addProf
     (
       identifiant: "20221695", 
       password: "K39G3FIwgo9xcT8r",
       nomProf: "Kahouadji",
       prenomProf: "Mouad", 
       genre: "m",
       dateNaiss: "1970-01-27", 
       email: "mouad.kahouadji@efrei.net", 
       tel: "0637437659", 
       salaire: 5000
     ) 
     {
       idProf,
       identifiant,
       password,
       nomProf,
       prenomProf,
       genre,
       dateNaiss,
       email,
       tel,
       salaire
     }
   }
 
  
## addMatiere: Ajout une matière
- mutation{
    addMatiere(descMatiere: "Micro service") 
    {
      idMatiere,
      descMatiere,
    }
  }
  

## addSession: Ajout une session
- mutation{
    addSession(
      descSession: "2023-2024 - S9",
      dateDebut: "2024-03-04 14:00:00",
      dateFin: "2024-03-04 17:30:00"
    ) 
    {
      idSession,
      descSession,
      dateDebut,
      dateFin
    }
  }
  
  
## addOrCreateCours: Ajout un cours en créant élève prof matière session inexistants, ou en liant avec ceux qui existant
- mutation{
    addOrCreateCours(
      idEleve: 100, 
      identifiantEleve: "20221605", 
      passwordEleve: "K39G3FIwgo9xcT8r", 
      nomEleve: "Kim", 
      prenomEleve: "léon", 
      genreEleve: "m", 
      dateNaissEleve: "2000-04-27", 
      emailEleve: "leon.kim@efrei.net", 
      telEleve: "0649872450", 
      idClasse: 100,
      nomClasse: "X-MAS-DEV-4-5",
      idProf: 100, 
      identifiantProf: "20221694", 
      passwordProf: "K39G3FIwgo9xcT8r", 
      nomProf: "Iris", 
      prenomProf: "Tom", 
      genreProf: "f", 
      dateNaissProf: "1970-04-27", 
      emailProf: "tom.iris@efrei.net", 
      telProf: "0690743217", 
      salaire: 4000, 
      idMatiere: 100,
      descMatiere: "Anglais",
      idSession: 100,
      descSession: "2023-2024 - S10",
      dateDebut: "2024-07-04 ",
      dateFin: "2024-07-04 "
    ) 
    {
      idCours,
      idEleve,
      idProf,
      idMatiere,
      idSession,
    }
  }
  
  
## addNote: Ajout une note 
- mutation{
    addNote(
      score: 18,
      idEleve: 1,
      idCours: 2,
    ) 
    {
      idNote,
      score,
      idEleve,
      idCours
    }
  }

  
## updateEleveById: Mise à jour un élève par idEleve
- mutation{
    updateEleveById
    (
      idEleve: 1,
      identifiant: "20221604", 
      password: "K39G3FIwgo9xcT8r",
      nomEleve: "Kim",
      prenomEleve: "Tania", 
      genre: "f",
      dateNaiss: "2001-10-27", 
      email: "tania.olivia@efrei.net", 
      tel: "0637199806", 
      idClasse: 3
    ){
      idEleve,
      identifiant,
      password,
      nomEleve,
      prenomEleve,
      genre,
      dateNaiss,
      email,
      tel,
      idClasse
    }
  }
    
    
## updateOrCreateEleve: Modifie ou crée une classe en recherchant l'identifiant d'un élève
- mutation{
      updateOrCreateClasse
        (
          identifiant: "20221602",
          nomClasse: "X-MAS-DEV-4-9"
        ) 
        {
          idClasse,
          nomClasse,
          eleves{
            idEleve,
            identifiant,
            password,
            nomEleve,
            prenomEleve,
            genre,
            dateNaiss,
            email,
            tel,
            idClasse
          }
        },
    }


## updateOrCreateCours: Modifie ou crée un cours en cherchant idCours
- mutation{
    updateOrCreateCours(
      idCours: 7,
      idEleve: 1,
      idProf: 2,
      idMatiere: 3,
      idSession: 4,
    ) 
    {
      idCours,
      idEleve,
      idCours,
      idMatiere,
      idSession,
    }
  }
  

## updateOrCreateNotes: Modifie ou crée une note en cherchant idNote
- mutation{
    updateOrCreateNotes(
      idNote: 7, 
      score: 16, 
      idEleve: 2, 
      idCours: 1
    ){
      idNote,
      score,
      idEleve,
      idCours
    }
  }
  
  
## updateMatiereById: Mise a jour une matière en cherchant idMatiere
- mutation{
    updateMatiereById(
      idMatiere: 6
      descMatiere: "Communication"
    ){
      idMatiere,
      descMatiere
    }
  }


## updateSessionById: Mise a jour une session en cherchant idSession
- mutation{
    updateSessionById(
      idSession: 6,
      descSession: "2023-2024 - S9",
      dateDebut: "2023-04-03 14:00:00",
      dateFin: "2023-04-03 17:30:00"
    ){
      idSession,
      descSession,
      dateDebut,
      dateFin,
    }
  }
   
    
## deleteElevesWithClasse: Supprime des élèves de la classe indiqué ainsi que la classe en recherchant idClasse
- mutation{
    deleteElevesWithClasse(idClasse: 4){
      idClasse,
      nomClasse,
      eleves{
        idEleve,
        identifiant,
        password,
        nomEleve,
        prenomEleve,
        genre,
        dateNaiss,
        email,
        tel,
        idClasse
      }
    },
  }
  