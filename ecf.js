window.onload = function () {
    
    class Client {
        constructor(nom, prenom, mail, photo) {
            this._nom = nom;
            this._prenom = prenom;
            this._mail = mail;
            this._photo = photo;
        }
    }

    class Message {
        constructor(type, message, client) {
            this._type = type;
            this._message = message;
            this._client = client;
        }
    }

    class Photo {
        constructor(libelle) {
            this._libelle = libelle;
        }
        //méthode pour donner la source en fonction du nom de la photo
        setSource() {
            if (this._libelle == listePhoto[0]) { //option par défaut
                this._source = "neutre.jpg";
            } else {
                this._source = this._libelle + ".jpg";
            }
        }
        //méthode pour récupérer la source puisque le pararamètre est "private"
        getSource() {
            return this._source;
        }
    }

    let listeDemande = ["Votre demande concerne",
                        "Information articles",
                        "Commande & paiement",
                        "Expédition & livraison",
                        "Retour, échange & remboursement",
                        "Code promo & Bon d'achat",
                        "Newsletters",
                        "Problème technique",
                        "Autres demandes",
                        "Protection des données personnelles"];
    let listePhoto = ["Choisir photo", "alain", "albert", "alfred", "alphonse", "alphonsine", "berth", "elisabeth", "gertrude", "gilbert", "gilberte", "hugh", "jacques", "john"];

    //remplissage du menu déroulant des demandes à partir du tableau
    for (i = 0; i < listeDemande.length; i++) {
        let type = document.createElement("option");
        type.textContent = listeDemande[i];
        document.getElementById("choixdemande").appendChild(type);
    }
    //remplissage du menu déroulant des photos à partir du tableau
    for (i = 0; i < listePhoto.length; i++) {
        let photo = document.createElement("option");
        photo.textContent = listePhoto[i];
        document.getElementById("choixphoto").appendChild(photo);
    }

    //les boutons sont préparés
    let boutonEnvoi = document.getElementById("boutonenvoi");
    boutonEnvoi.addEventListener("click", envoiDonnees);
    let boutonReset = document.getElementById("boutonrefresh");
    boutonReset.addEventListener("click", remiseAZero);

    // création des messages d'erreur qui seront rendus visibles si nécessaires
    let formulaire = document.getElementById("formClient");
    let erreur = document.createElement("p");
    erreur.className = "erreur"; // on donne un nom de classe pour pouvoir agir dessus ensuite
    erreur.textContent = "ERREUR : Vous n'avez pas choisi de demande";
    erreur.style.color = "red";
    formulaire.insertAdjacentElement("afterbegin", erreur);
    erreur.style.display = "none";
    let textes = document.getElementsByClassName("texte");
    for (i = 0; i < textes.length; i++) { // on créé une erreur pour chaque texte à rentrer
        erreur = document.createElement("p");
        erreur.className = "erreur"; // on donne un nom de classe pour pouvoir agir dessus ensuite
        erreur.textContent = "ERREUR : 3 caractères minimum pour le " + textes[i].getAttribute("id");
        erreur.style.color = "red";
        textes[i].parentNode.appendChild(erreur);
        erreur.style.display = "none";
    }
    listeErreurs = document.getElementsByClassName("erreur");

    //fonction déclenchée quand on confirme les saisies
    function envoiDonnees(event) {
        //on définit tous les champs/choix
        let demande = document.getElementById("choixdemande").value;
        let message = document.getElementById("message").value;
        let prenom = document.getElementById("prénom").value;
        let nom = document.getElementById("nom").value;
        let mail = document.getElementById("mail").value;
        let photo = choixPhoto();
        let probleme = false;
        //on vérifie que les champs sont remplis d'au moins 3 caractères
        for (let i = 0; i < textes.length; i++) { //on teste tous les champs
            if (textes[i].value.length < 3) {
                event.preventDefault();
                listeErreurs[i + 1].style.display = "";
                probleme = true; //on garde en mémoire s'il y a eu un champ incorrect
            }
        }
        if (demande == "Votre demande concerne") { // on vérifie qu'une demande a bien été choisie
            event.preventDefault();
            listeErreurs[0].style.display = "";
            probleme = true; //on garde en mémoire l'erreur
        }
        if (!probleme) {
            let nouveauClient = new Client(nom, prenom, mail, photo); // création d'un objet Client
            let nouveauMessage = new Message(demande, message, nouveauClient); // création d'un objet Message
            console.log(nouveauClient);
            console.log(nouveauMessage);
            //window.location.assign("recup.html"); pas nécessaire
        }
    }

    //le menu des photos doit mettre l'image à jour
    let menuPhoto = document.getElementById("choixphoto");
    menuPhoto.addEventListener("change", choixPhoto);

    //fonction qui met l'image à jour et renvoie l'objet Photo créé
    function choixPhoto() {
        let photo = document.getElementById("choixphoto").value;
        let nouvellePhoto = new Photo(photo); //création d'un objet Photo puis on lui assigne une source
        nouvellePhoto.setSource();
        document.getElementById("avatar").src = "photos/" + nouvellePhoto.getSource();
        return nouvellePhoto;
    }

    //fonction qui supprime les messages d'erreur
    function remiseAZero() {
        listeErreurs = document.getElementsByClassName("erreur");
        for (i = 0; i < listeErreurs.length; i++) {
            listeErreurs[i].style.display = "none";
        }
    }

    // on rend les champs de texte réactifs
    document.getElementById("message").addEventListener("input", couleurCadre);
    document.getElementById("nom").addEventListener("input", couleurCadre);
    document.getElementById("prénom").addEventListener("input", couleurCadre);
    document.getElementById("mail").addEventListener("input", couleurCadre);

    // fonction qui met en rouge quand il y a moins de 3 caractères
    function couleurCadre() {
        if (this.value.length < 3) {
            this.style.borderColor = "red";
        } else {
            this.style.borderColor = "";
        }
    }





}
