import { graphqlHTTP } from 'express-graphql'
import { buildSchema } from 'graphql'
import { PrismaClient } from '@prisma/client'
import express from 'express'
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { GraphQLScalarType, Kind } from 'graphql';

let app = express();
app.use(express.json())
const prisma = new PrismaClient({})

let schema = buildSchema(`
    scalar Date

    type classes{
        idClasse: ID!
        nomClasse: String!
        eleves: [eleves]
    }
    

    type cours{
       idCours: ID!
       idEleve: Int!
       idProf: Int!
       idMatiere: Int!
       idSession: Int!
       eleves: eleves
       professeurs: professeurs
       matieres: matieres
       sessions: sessions
       notes: [notes]
    }

    
    type eleves{
       idEleve: ID!
       identifiant: String!
       password: String!
       nomEleve: String!
       prenomEleve: String!
       genre: String!
       dateNaiss: Date!
       email: String!
       tel: String!
       idClasse: Int!
       cours: [cours]
       classes: classes
       notes: [notes]
    }
    
    
    type matieres{
       idMatiere: ID!
       descMatiere: String!
       cours: [cours]
    }

    
    type notes{
       idNote: ID!
       score: Int!
       idEleve: Int!
       idCours: Int!
       eleves: eleves
       cours: cours
    }

        
    type professeurs{
        idProf: ID!
        identifiant: String!
        password: String!
        nomProf: String!
        prenomProf: String!
        genre: String!
        dateNaiss: Date!
        email: String!
        tel: String!
        salaire: Int!
        cours: [cours]
    }

    
    type sessions{
        idSession: ID!
        descSession: String!
        dateDebut: Date!
        dateFin: Date!
        cours: [cours]
    }

   
    type Query{
        "Permet de récupérer l'ensemble de classes"
        getClasses: [classes]
        
        "Permet de récupérer un élève par idEleve"
        getElevesById(idEleve: Int!): eleves
        
        "Permet de récupérer l'ensemble d'élève dans une classe"
        getElevesByIdClasses(idClasse: Int!): [eleves]
        
        "Permet de récupérer l'ensemble de prof dont le nom ou prénom contient nameProf"
        getProfsByName(nameProf: String!): [professeurs]
        
        "Permet de récupérer l'ensemble de session dont la période pendant la date début et la date de fin"
        getSessionsByDate(dateDebut: String!, dateFin: String!): [sessions]
        
        "Permet de récupérer l'ensemble de notes qu'idEleve indiqué"
        getNotesByIdEleve(idEleve: Int!): [notes]
        
        "Permet de récupérer l'ensemble de matières qu'idMatiere indiqué"
        getMatiereById(idMatiere: Int!): matieres
        
        "Permet de récupérer un cours qu'idCours indiqué"
        getCoursById(idCours: Int!): cours
        
    }
    
    type Mutation{
        "Permet d'ajouter un élève qui lie avec une classe existant en saisant idClasse"
        addEleveWithClasse(identifiant: String!, password: String!, nomEleve: String!, prenomEleve: String!, genre: String!, dateNaiss: Date!, email: String!, tel: String!, idClasse: Int!): eleves
        
        "Permet d'ajouter un élève qui est possible de lier avec une classe inexistant"
        addEleveWithClasseOrCreateClasse(identifiant: String!, password: String!, nomEleve: String!, prenomEleve: String!, genre: String!, dateNaiss: Date!, email: String!, tel: String!, idClasse: Int!, nomClasse: String!): eleves
    
        "Permet d'ajouter un professeur"
        addProf(identifiant: String!, password: String!, nomProf: String!, prenomProf: String!, genre: String!, dateNaiss: Date!, email: String!, tel: String!, salaire: Int!): professeurs
    
        "Permet d'ajouter une matière"
        addMatiere(descMatiere: String!): matieres
        
        "Permet d'ajouter une session"
        addSession(descSession: String!, dateDebut: String!, dateFin: String!): sessions
        
        "Permet d'ajouter un cours en créant élève prof matière session inexistants, ou en liant avec ceux qui existant"
        addOrCreateCours(
            idEleve: Int!, identifiantEleve: String!, passwordEleve: String!, nomEleve: String!, prenomEleve: String!, genreEleve: String!, dateNaissEleve: Date!, emailEleve: String!, telEleve: String!, idClasse: Int!, nomClasse: String!,
            idProf: Int!, identifiantProf: String!, passwordProf: String!, nomProf: String!, prenomProf: String!, genreProf: String!, dateNaissProf: Date!, emailProf: String!, telProf: String!, salaire: Int!,
            idMatiere: Int!, descMatiere: String!,
            idSession: Int!, descSession: String!, dateDebut: String!, dateFin: String!
        ): cours
        
        "Permet d'ajouter une note"
        addNote(score: Int!, idEleve: Int!, idCours: Int!): notes
        
        "Permet de mettre à jour un élève par idEleve"
        updateEleveById(idEleve: Int!, identifiant: String!, password: String!, nomEleve: String!, prenomEleve: String!, genre: String!, dateNaiss: Date!, email: String!, tel: String!, idClasse: Int!): eleves
        
        "Permet de modifier ou créer une classe en recherchant l'identifiant d'un élève"
        updateOrCreateClasse(identifiant: String!, nomClasse: String!): classes
        
        "Permet de modifier ou créer un cours en cherchant idCours"
        updateOrCreateCours(idCours: Int!, idEleve: Int!, idProf: Int!, idMatiere: Int!, idSession: Int!): cours
        
        "Permet de modifier ou créer une note en cherchant idNote"
        updateOrCreateNotes(idNote: Int!, score: Int!, idEleve: Int!, idCours: Int!): notes
        
        "Permet de mettre a jour une matière en cherchant idMatiere"
        updateMatiereById(idMatiere: Int!, descMatiere: String!): matieres
        
        "Permet de mettre a jour une session en cherchant idSession"
        updateSessionById(idSession: Int!, descSession: String!, dateDebut: String!, dateFin: String!): sessions

        "Permet de supprimer des élèves de la classe indiqué ainsi que la classe en recherchant idClasse"
        deleteElevesWithClasse(idClasse: Int!): [classes]

    }

   
`)

let root = {

    /**
     * Récupérer l'ensemble de classes
     * @return {Promise<*>} [classes]
     */
    getClasses: async() => {
        return await prisma.classes.findMany({
            include: {
                eleves: {
                    include: {
                        notes: true
                    }
                }
            }
        })
    },


    /**
     * Récupérer un élève par idEleve
     * @param idEleve id d'un élève
     * @return {Promise<*>} eleves
     */
    getElevesById : async({idEleve}) => {
        return await prisma.eleves.findFirst({
            include: {
                notes: true,
                cours: true
            },
            where: { idEleve : parseInt(idEleve) }
        })
    },

    /**
     * Récupérer l'ensemble d'élève dans une classe
     * @return {Promise<void>} [eleves]
     */
    getElevesByIdClasses: async({idClasse}) => {
        return await prisma.eleves.findMany({
            where: { idClasse : parseInt(idClasse) }
        })
    },


    /**
     * Récupérer l'ensemble de prof dont le nom ou prénom contient nameProf
     * @param nameProf nom ou prénom d'un prof
     * @return {Promise<*>} [professeurs]
     */
    getProfsByName: async({nameProf}) => {
        return await prisma.professeurs.findMany({
            where: {
                OR: [
                    { nomProf: { contains: nameProf } },
                    { prenomProf: { contains: nameProf } }
                ]
            }
        })
    },


    /**
     * Récupérer l'ensemble de session dont la période pendant la date début et la date de fin
     * @param dateDebut la date de début
     * @param dateFin la date de fin
     * @return {Promise<*>} [sessions]
     */
    getSessionsByDate: async({dateDebut, dateFin}) => {
        return await prisma.sessions.findMany({
            where: {
                AND: [
                    { dateDebut: { gte: new Date(dateDebut) }},
                    { dateFin: { lte: new Date(dateFin) }}
                ]
            }
        })
    },


    /**
     * Récupérer l'ensemble de notes qu'idEleve indiqué
     * @param idEleve id d'un élève
     * @return {Promise<*>} [notes]
     */
    getNotesByIdEleve: async({idEleve}) => {
        return await prisma.notes.findMany({
            where: { idEleve: parseInt(idEleve) }
        })
    },


    /**
     * Récupérer une matière qu'idMatiere indiqué
     * @param idMatiere id d'une matière
     * @return {Promise<*>} matieres
     */
    getMatiereById: async({idMatiere}) => {
        return await prisma.matieres.findFirst({
            where: { idMatiere: parseInt(idMatiere) }
        })
    },


    /**
     * Récupérer un cours qu'idCours indiqué
     * @param idCours id d'un cours
     * @return {Promise<*>} cours
     */
    getCoursById: async({idCours}) => {
        return await prisma.cours.findFirst({
            include: {
                notes: true
            },
            where: { idCours: parseInt(idCours) }
        })
    },


    /**
     * Ajout un élève qui lie avec une classe existant en saisant idClasse
     * @param identifiant identifiant d'un compte
     * @param password mot de passe
     * @param nomEleve nom d'un élève
     * @param prenomEleve prénom d'un élève
     * @param genre sexe
     * @param dateNaiss date naissance
     * @param email adresse d'email
     * @param tel numéro de téléphone
     * @param idClasse id d'une classe
     * @return {Promise<void>} eleves
     */
    addEleveWithClasse: async({identifiant, password, nomEleve, prenomEleve, genre, dateNaiss, email, tel, idClasse}) => {
        return await prisma.eleves.create({
            data: {
                identifiant: identifiant,
                password: password,
                nomEleve: nomEleve,
                prenomEleve: prenomEleve,
                genre: genre,
                dateNaiss: new Date(dateNaiss),
                email: email,
                tel: tel,
                classes: {
                    connect: {
                        idClasse: idClasse
                    }
                }
            }
        })
    },


    /**
     * Ajout un élève qui est possible de lier avec une classe inexistant
     * Lorsque idClasse n'existe pas, ajout un eleve et lie avec une nouvelle classe créant. Lorsque idClasse existe, lie idClasse avec un élève
     * @param identifiant identifiant d'un compte
     * @param password mot de passe
     * @param nomEleve nom d'un élève
     * @param prenomEleve prénom d'un élève
     * @param genre sexe
     * @param dateNaiss date naissance
     * @param email adresse d'email
     * @param tel numéro de téléphone
     * @param idClasse id d'une classe
     * @param nomClasse nom d'une classe
     * @return {Promise<*>} eleves
     */
    addEleveWithClasseOrCreateClasse: async(
        {identifiant, password, nomEleve, prenomEleve, genre, dateNaiss, email, tel, idClasse, nomClasse}) => {
        return await prisma.eleves.create({
            data: {
                identifiant: identifiant,
                password: password,
                nomEleve: nomEleve,
                prenomEleve: prenomEleve,
                genre: genre,
                dateNaiss: new Date(dateNaiss),
                email: email,
                tel: tel,
                classes: {
                    connectOrCreate: {
                        where: {
                            idClasse: idClasse
                        },
                        create: {
                            nomClasse: nomClasse
                        }
                    }
                }
            }
        })
    },


    /**
     * Ajout un professeur
     * @param identifiant identifiant d'un compte
     * @param password mot de passe
     * @param nomProf nom d'un prof
     * @param prenomProf prénom d'un prof
     * @param genre sexe
     * @param dateNaiss date naissance
     * @param email email
     * @param tel numéro de téléphone
     * @param salaire salaire par mois
     * @return {Promise<*>} professeurs
     */
    addProf: async({identifiant, password, nomProf, prenomProf, genre, dateNaiss, email, tel, salaire}) => {
        return await prisma.professeurs.create({
            data: {
                identifiant: identifiant,
                password: password,
                nomProf: nomProf,
                prenomProf: prenomProf,
                genre: genre,
                dateNaiss: new Date(dateNaiss),
                email: email,
                tel: tel,
                salaire: salaire
            },
        })
    },


    /**
     * Ajout une matière
     * @param descMatiere description d'une matière
     * @return {Promise<*>} matieres
     */
    addMatiere: async({descMatiere}) => {
        return await prisma.matieres.create({
            data: {
                descMatiere: descMatiere,
            },
        })
    },


    /**
     * Ajout une session
     * @param descSession description d'une session
     * @param dateDebut la date de début
     * @param dateFin la date de fin
     * @return {Promise<*>} sessions
     */
    addSession: async({descSession, dateDebut, dateFin}) => {
        return await prisma.sessions.create({
            data: {
                descSession: descSession,
                dateDebut: new Date(dateDebut),
                dateFin: new Date(dateFin)
            },
        })
    },


    /**
     * Ajout un cours en créant élève prof matière session inexistants, ou en liant avec ceux qui existant
     * @param identifiantEleve identifiant identifiant d'un compte
     * @param passwordEleve password mot de passe
     * @param nomEleve nom d'un élève
     * @param prenomEleve prénom d'un élève
     * @param genreEleve sexe
     * @param dateNaissEleve date naissance
     * @param emailEleve email
     * @param telEleve numéro de téléphone
     * @param idClasse id d'une classe clé étranger d'un élève
     * @param nomClasse nom d'une classe, Lorsque idClasse n'existe pas, on crée une classe en utilisant nomClasse
     * @param idEleve id d'un élève
     * @param identifiantProf identifiant identifiant d'un compte
     * @param passwordProf password mot de passe
     * @param nomProf nom d'un prof
     * @param prenomProf prénom d'un prof
     * @param genreProf sexe
     * @param dateNaissProf date naissance
     * @param emailProf email
     * @param telProf numéro de téléphone
     * @param salaire salaire
     * @param idProf id d'un prof
     * @param descMatiere description d'une matière
     * @param idMatiere id d'une matière
     * @param descSession description d'une session
     * @param dateDebut la date de début
     * @param dateFin la date de fin
     * @param idSession id d'une session
     * @return {Promise<*>} cours
     */
    addOrCreateCours: async(
        {   idEleve, identifiantEleve, passwordEleve, nomEleve, prenomEleve, genreEleve, dateNaissEleve, emailEleve, telEleve, idClasse, nomClasse,
            idProf, identifiantProf, passwordProf, nomProf, prenomProf, genreProf, dateNaissProf, emailProf, telProf, salaire,
            idMatiere, descMatiere,
            idSession, descSession, dateDebut, dateFin
        }) => {
        return await prisma.cours.create({
            data: {
                eleves: {
                    connectOrCreate: {
                        where: {
                            idEleve: idEleve
                        },
                        create: {
                            identifiant: identifiantEleve,
                            password: passwordEleve,
                            nomEleve: nomEleve,
                            prenomEleve: prenomEleve,
                            genre: genreEleve,
                            dateNaiss: new Date(dateNaissEleve),
                            email: emailEleve,
                            tel: telEleve,
                            classes: {
                                connectOrCreate: {
                                    where: {
                                        idClasse: idClasse
                                    },
                                    create: {
                                        nomClasse: nomClasse
                                    }
                                }
                            }
                        }
                    }
                },
                professeurs: {
                    connectOrCreate: {
                        where: {
                            idProf: idProf
                        },
                        create: {
                            identifiant: identifiantProf,
                            password: passwordProf,
                            nomProf: nomProf,
                            prenomProf: prenomProf,
                            genre: genreProf,
                            dateNaiss: new Date(dateNaissProf),
                            email: emailProf,
                            tel: telProf,
                            salaire: salaire
                        }
                    }
                },
                matieres: {
                    connectOrCreate: {
                        where: {
                            idMatiere: idMatiere
                        },
                        create: {
                            descMatiere: descMatiere
                        }
                    }
                },
                sessions: {
                    connectOrCreate: {
                        where: {
                            idSession: idSession
                        },
                        create: {
                            descSession: descSession,
                            dateDebut: new Date(dateDebut),
                            dateFin: new Date(dateFin)
                        }
                    }
                }
            }
        })
    },


    /**
     * Ajout une note
     * @param score sccore
     * @param idEleve id d'un élève
     * @param idCours id d'un cours
     * @return {Promise<*>} notes
     */
    addNote: async({score, idEleve, idCours}) => {
        // Vérifier idClasse existe dans database
        let eleve = await prisma.eleves.findFirst({
            where: {
                idEleve: idEleve
            }
        })

        let cours = await prisma.cours.findFirst({
            where: {
                idCours: idCours
            }
        })

        if(eleve == null){
            throw new Error("idEleve " + idEleve + " n'existe pas");
        }
        if(cours == null){
            throw new Error("idCours " + idCours + " n'existe pas");
        }

        return await prisma.notes.create({
            data: {
                score: score,
                idEleve: idEleve,
                idCours: idCours
            },
        })
    },


    /**
     * Mise à jour un élève par idEleve
     * @param idEleve id d'un élève
     * @param identifiant identifiant d'un compte
     * @param password mot de passe d'un compte
     * @param nomEleve nom d'un élève
     * @param prenomEleve prénom d'un élève
     * @param genre sexe
     * @param dateNaiss date de naissance
     * @param email adresse d'email
     * @param tel numéro de téléphone
     * @param idClasse id d'une classe
     * @return {Promise<*>} eleve
     */
    updateEleveById: async(
        {idEleve, identifiant, password, nomEleve, prenomEleve, genre, dateNaiss, email, tel, idClasse}) => {
        return await prisma.eleves.update({
            include: {
                notes: true,
                cours: true
            },
            data: {
                identifiant: identifiant,
                password: password,
                nomEleve: nomEleve,
                prenomEleve: prenomEleve,
                genre: genre,
                dateNaiss: new Date(dateNaiss),
                email: email,
                tel: tel,
                idClasse: idClasse,
            },
            where: { idEleve : parseInt(idEleve) }
        })
    },


    /**
     * Modifie ou crée une classe en recherchant l'identifiant d'un élève
     * Lorsque identifiant d'un élève n'existe pas, ajout une nouvelle classe et lie avec ce élève.
     * Lorsque idClasse existe, modifie le nom de cette classe
     * @param identifiant identifiant d'un compte
     * @param nomClasse nom d'une classe
     * @return {Promise<*>}
     */
    updateOrCreateClasse: async({identifiant, nomClasse}) => {
        let eleve = await prisma.eleves.findFirst({
            where: { identifiant : identifiant },
        });
        let classe = await prisma.classes.findFirst({
            where: { nomClasse : nomClasse },
        });
        if(eleve == null){
            eleve = {idClasse: -1}
        }
        if(classe == null){
            eleve = {idClasse: -1}
        }
        return await prisma.classes.upsert({
            include: {
                eleves: true,
            },
            where: {
                idClasse: eleve.idClasse
            },
            update: {
                nomClasse: nomClasse
            },
            create: {
                nomClasse: nomClasse
            },
        })
    },


    /**
     * Modifie ou crée un cours en cherchant idCours
     * @param idCours id d'un cours
     * @param idEleve id d'un élève
     * @param idProf id d'un prof
     * @param idMatiere id d'une matière
     * @param idSession id d'une session
     * @return {Promise<*>} cours
     */
    updateOrCreateCours: async({idCours, idEleve, idProf, idMatiere, idSession}) => {
        return await prisma.cours.upsert({
            where: {
                idCours: parseInt(idCours)
            },
            update: {
                idEleve: idEleve,
                idProf: idProf,
                idMatiere: idMatiere,
                idSession: idSession,
            },
            create: {
                idEleve: idEleve,
                idProf: idProf,
                idMatiere: idMatiere,
                idSession: idSession,
            },
        })
    },


    /**
     * Modifie ou crée une note en cherchant idNote
     * @param idNote id d'une note
     * @param score résultat
     * @param idEleve id d'un élève
     * @param idCours id d'un cours
     * @return {Promise<*>} notes
     */
    updateOrCreateNotes: async({idNote, score, idEleve, idCours}) => {
        let cours = await prisma.cours.findFirst({
            where: {
                idCours: parseInt(idCours)
            }
        })
        let eleve = await prisma.eleves.findFirst({
            where: {
                idEleve: parseInt(idEleve)
            }
        })
        if(eleve == null){
            throw new Error("idEleve " + idEleve + " n'existe pas");
        }

        if(cours == null){
            throw new Error("idCours " + idCours + " n'existe pas");
        }
        return await prisma.notes.upsert({
            where: {
                idNote: parseInt(idNote)
            },
            update: {
                score: score,
                idEleve: idEleve,
                idCours: idCours,
            },
            create: {
                score: score,
                idEleve: idEleve,
                idCours: idCours,
            },
        })
    },


    /**
     * Mise a jour une matière en cherchant idMatiere
     * @param idMatiere id d'une matière
     * @param descMatiere descriptioin d'une matière
     * @return {Promise<*>} matieres
     */
    updateMatiereById: async({idMatiere, descMatiere}) => {
        let matiere = await prisma.matieres.findFirst({
            where: {
                idMatiere: parseInt(idMatiere)
            }
        })

        if(matiere == null){
            throw new Error("idMatiere " + idMatiere + " n'existe pas");
        }

        return await prisma.matieres.update({
            data: {
                descMatiere: descMatiere
            },
            where: { idMatiere : parseInt(idMatiere) }
        })
    },


    /**
     * Mise a jour une session en cherchant idSession
     * @param idSession id d'une session
     * @param descSession description d'une session
     * @param dateDebut la date de début
     * @param dateFin la date de fin
     * @return {Promise<*>}
     */
    updateSessionById: async({idSession, descSession, dateDebut, dateFin}) => {
        let session = await prisma.sessions.findFirst({
            where: {
                idSession: parseInt(idSession)
            }
        })

        if(session == null){
            throw new Error("idSession " + idSession + " n'existe pas");
        }

        return await prisma.sessions.update({
            data: {
                descSession: descSession,
                dateDebut: new Date(dateDebut),
                dateFin: new Date(dateFin)
            },
            where: { idSession : parseInt(idSession) }
        })
    },


    /**
     * Supprime des élèves de la classe indiqué ainsi que la classe en recherchant idClasse
     * @param idClasse id d'une classe
     * @return {Promise<void>} [classes]
     */
    deleteElevesWithClasse: async({idClasse}) => {
        let eleve = await prisma.eleves.findFirst({
            where: { idClasse : parseInt(idClasse) }
        })

        if(eleve == null){
            throw new Error("Aucun élève de la classe " + idClasse + " n'a été trouvé");
        }

        let deleteEleve = prisma.eleves.deleteMany({
            where: {
                idEleve : eleve.idEleve,
                idClasse : idClasse,
            },
        })

        let deleteClasse = prisma.classes.delete({
            where: { idClasse : parseInt(idClasse) },
        })

        const transaction = await prisma.$transaction([deleteEleve, deleteClasse])

        return await prisma.classes.findMany({
            include: {
                eleves: true,
            }
        })
    },


}

const dateScalar = new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    serialize(value) {
        if (value instanceof Date) {
            return value.getTime(); // Convert outgoing Date to integer for JSON
        }
        throw Error('GraphQL Date Scalar serializer expected a `Date` object');
    },
    parseValue(value) {
        if (typeof value === 'number') {
            return new Date(value); // Convert incoming integer to Date
        }
        throw new Error('GraphQL Date Scalar parser expected a `number`');
    },
    parseLiteral(ast) {
        if (ast.kind === Kind.INT) {
            // Convert hard-coded AST string to integer and then to Date
            return new Date(parseInt(ast.value, 10));
        }
        // Invalid hard-coded value (not an integer)
        return null;
    },
});


const resolvers = {
    Date: dateScalar,
};

const server = new ApolloServer({
    schema,
    resolvers,
});

await startStandaloneServer(server);

app.use("/graphql", graphqlHTTP(
    {schema: schema, rootValue: root, graphiql: true}
))

app.listen(3202)