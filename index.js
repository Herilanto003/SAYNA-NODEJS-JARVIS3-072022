const express = require("express");
const app = express();


// le port
const PORT = 3000;
app.listen(PORT, console.log("le serveur démarre..."));

// utilisation des css et des js dans le dossier public
app.use(express.static("public"));

// --------------- le route vers index.html -------------------

app.get("/", (req,res)=>{
    res.sendFile(__dirname+"/index.html");
})


// --------------- login --------------------
app.post(`/saynajarvis/login`, (req, res)=>{
    res.json({

        success: { 
            "error": false, 
            "message": "L'utilisateur a été authentifié succès", 
            "user": { 
                "firstname": "xxxxxx", 
                "lastname": "xxxxxx", 
                "email": "xxxxxx", 
                "sexe": "xxxxxx", "role": "xxxxx", 
                "dateNaissance": "xxxx-xx-xx", 
                "createdAt": "xxxxxx" 
            }, 
            "token": "xxxxxx" 
        },
        fail: {
            dataMissing: { 
                "error": true, 
                "message": "Email/password manquants" 
            },
            dataNotCorrect : { 
                "error": true, 
                "message": "Email/password incorrect" 
            },
            tropTentive: { 
                "error": true, "message": 
                "Trop de tentative sur l'email xxxxx (5 max) - Veuillez patienter (2min)" 
            }
        }

    })
})



// -------------------- ROUTE POUR LE RIGISTER ------------------------------
app.post("/saynajarvis/register", (req, res)=>{
    res.json({
        success: { 
            "error": false, 
            "message": "L'utilisateur a bien été créé avec succès", 
            "user": { 
                "firstname": "xxxxxx", 
                "lastname": "xxxxxx", 
                "email": "xxxxxx", 
                "sexe": "xxxxxx", 
                "role": "xxxxx", 
                "dateNaissance": "xxxx-xx-xx", 
                "createdAt": "xxxxxx", "updateAt": "xxxxxx", "subscription": "xxxxxx" 
            } 
        },
        fail: {
            dataMissing: { 
                "error": true, 
                "message": "Une ou plusieurs données obligatoire sont manquantes" 
            },
            dataNotCorrect : { 
                "error": true, 
                "message": "Une ou plusieurs données sont erronées" 
            },
            emailExisted: { 
                "error": true, 
                "message": "Un compte utilisant cette adresse mail est déjà enregistré" 
            }
        }
    })
})


// --------------------- INVITATION ------------------------
app.post("/saynajarvis/invitation", (req, res)=>{
    res.json({
        success: {
            inscrit: { 
                "error": false, 
                "message": "Une invitation lui a été envoyé" 
            },
            notInscrit: { 
                "error": false, 
                "message": "Un mail d'inscription lui a été envoyé" 
            }
        },
        fail : {
            incorrectToken : { "error": true, "message": "Votre token n'est pas correct" },
            notAccess : { "error": true, "message": "Vos droits d'accès ne permettent pas d'accéder à la ressource" },
            dataMissing : { "error": true, "message": "Email manquants" },
            emailIncorrect : { "error": true, "message": "Email incorrect" }
        }
    })
})


// --------------------------- gestion d' invitation --------------------
app.get("/saynajarvis/invitation?token=xxx&resp=xxx", (req, res)=>{
    res.json({
        success : {
            accepte : { "error": false, "message": "Votre invitation dans la maison a été accepter" },
            refuse : { "error": false, "message": "Votre demande a bien été prise en compte" }
        },

        fail : {
            incorrectToken : { "error": true, "message": "Votre token n'est pas correct" },
            dataNotCorrect : { "error": true, "message": "Une ou plusieurs données sont erronées" },
            dataMissing : { "error": true, "message": "Email manquants" }
        }
    })
})



// ---------------------  ROOM ----------------------
app.post("/saynajarvis/room", (req, res)=>{
    res.json({
        success : { "error": false, "message": "Piece ajouté avec succès" },
        fail : {
            incorrectToken : { "error": true, "message": "Votre token n'est pas correct" },
            dataMissing : { "error": true, "message": "Une ou plusieurs données obligatoire sont manquantes" },
            incorrectData : { "error": true, "message": "Une ou plusieurs données sont erronées" },
            nameExiste : { "error": true, "message": "Ce nom a deja été choisi" }
        }
    })
});

// ------------------- SUPPRIMER UNE OU LES PIECE --------------
app.get("/saynajarvis/room?name=xxxx", (req, res)=>{
    res.json({
        success: { "error": false, "message": "Piece supprimé avec succès" },
        fail : {
            incorrectToken : { "error": true, "message": "Votre token n'est pas correct" },
            dataMissing : { "error": true, "message": "Une ou plusieurs données obligatoire sont manquantes" },
            incorrectData: { "error": true, "message": "Une ou plusieurs données sont erronées" }
        }
    })
})


// ----------------------- CREATION D OBJET -------------------------
app.post("/saynajarvis/object", (req, res)=>{
    res.json({
        success: { "error": false, "message": "Object ajouté avec succès" },
        fail : {
            incorrectToken : { "error": true, "message": "Votre token n'est pas correct" },
            dataMissing : { "error": true, "message": "Une ou plusieurs données obligatoire sont manquantes" },
            incorrectData : { "error": true, "message": "Une ou plusieurs données sont erronées" },
            nameExiste : { "error": true, "message": "Ce nom a deja été choisi" }
        }
    })
})


// ------------------ delete object ---------------------------------
app.get("/saynajarvis/object/:name", (req, res)=>{
    res.json({
        success : { "error": false, "message": "Object supprimé avec succès" },
        fail :  {
            incorrectToken : { "error": true, "message": "Votre token n'est pas correct" },
            dataMissing : { "error": true, "message": "Une ou plusieurs données obligatoire sont manquantes" },
            incorrectData : { "error": true, "message": "Une ou plusieurs données sont erronées" }
        },

        info: {
            obligatoire : "name "
        }
    })
})
