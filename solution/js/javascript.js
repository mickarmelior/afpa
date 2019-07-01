
//chargement du script après la page HTML
window.onload = (function () {

	//récupération des élément du html
	let btnValid = document.getElementById("valid");
	let messageEr = document.getElementById("messageError");
	let nomEr = document.getElementById("nomError");
	let prenomEr = document.getElementById("prenomError");
	let mailEr = document.getElementById("courrielError");
	let selectPhoto = document.getElementById("selectPhoto");

	let imgPh = document.getElementById("image");
	let btnReset = document.getElementById("btnReset");

	btnValid.addEventListener("click", function (e) {

		//variables définissant mon objet client
		let nom = document.getElementById("nom");
		let prenom = document.getElementById("prenom");
		let courriel = document.getElementById("courriel");
		let message = document.getElementById("message");
		let selectedType = document.getElementById("selectType");

		let nbChampOK = 0;

		//conditions à respecter pour le déclenchement de la fonction. Ici instancier client issu de la classe Client.

		if (nom.value.length < 3) {
			majErreur(nomEr, nom, "ERREUR : Trois caractères minimum pour le nom ");
			e.preventDefault();
		}
		else {
			initErreur(nom, nomEr);
			nbChampOK++;
		}
		if (prenom.value.length < 3) {
			majErreur(prenomEr, prenom, "ERREUR : Trois caractères minimum pour le prenom ");
			e.preventDefault();
		}
		else {
			initErreur(prenom, prenomEr);
			nbChampOK++;
		}
		if (!validateEmail(courriel.value)) {
			majErreur(mailEr, courriel, "ERREUR : Adresse Email non valide ");
			e.preventDefault();
		}
		else {
			initErreur(courriel, mailEr);
			nbChampOK++;
		}
		if (message.value.length < 3) {
			majErreur(messageEr, message, "ERREUR : Trois caractères minimum pour le message ");
			e.preventDefault();
		} else {
			initErreur(message, messageEr);
			nbChampOK++;
		}
		if (selectPhoto.selectedIndex === 0) {
			majErreur(photoError, selectPhoto, "ERREUR : Veuillez choisir une photo ");
			e.preventDefault();
		} else {
			initErreur(selectPhoto, photoError);
			nbChampOK++;
		}
		if (nbChampOK == 5) {
			e.preventDefault();
			//instanciation de l'objet client depuis la classe Client
			let client = new Client(nom.value, prenom.value, courriel.value, selectPhoto.value);
			//instanciation de l'objet messageComplet depuis la classe Message
			let messageComplet = new Message(selectedType.value, message.value, client);

			console.log(client);
			console.log(messageComplet);


		}

	});
	message.addEventListener("blur", function () {
		initErreur(message, messageEr);
	});
	nom.addEventListener("blur", function () {
		initErreur(nom, nomEr);
	});
	prenom.addEventListener("blur", function () {
		initErreur(prenom, prenomEr);
	});
	courriel.addEventListener("blur", function () {
		initErreur(courriel, mailEr);
	});
	btnReset.addEventListener("click", function () {
		initErreur(message, messageEr);
		initErreur(nom, nomEr);
		initErreur(prenom, prenomEr);
		initErreur(courriel, mailEr);
		initErreur(selectPhoto, photoError);
		imgPh.src = "photos/neutre.jpg"
	});
	let listePhoto = ["Choisir photo", "alain", "albert", "alfred", "alphonse", "alphonsine", "berth", "elisabeth", "gertrude", "gilbert", "gilberte", "hugh", "jacques", "john"];

	for (let i = 0; i < listePhoto.length; i++) {
		let optionPhoto = document.createElement("option");
		if (i === 0) {
			listePhoto[i] = new Photo(listePhoto[i], "photos/neutre.jpg");
		} else {
			listePhoto[i] = new Photo(listePhoto[i], "photos/" + listePhoto[i] + ".jpg");
		}
		optionPhoto.innerText = listePhoto[i].titre;
		optionPhoto.value = listePhoto[i].titre;
		selectPhoto.appendChild(optionPhoto);
	};

	let listeType = ["Votre demande concerne", "Information articles", "Commande & paiement", "Expédition & livraison", "Retour, échange & remboursement", "Code promo & Bon d'achat", "Newsletters", "Problème technique", "Autres demandes", "Protection des données personnelles"]
	listeType.forEach(element => {
		let optionType = document.createElement("option");
		optionType.innerText = element;
		optionType.value = element;
		selectType.appendChild(optionType);
	});


	selectPhoto.addEventListener("change", function () {
		if (selectPhoto.selectedIndex === 0) {
			majErreur(photoError, selectPhoto, "ERREUR : Veuillez choisir une photo ");
		} else {
			imgPh.src = listePhoto[selectPhoto.selectedIndex].src;
			initErreur(selectPhoto, photoError);
		}

	});

});

function majErreur(cadre, champ, message) {
	cadre.innerText = (message);
	cadre.style.color = "red";
	champ.style.border = "1px solid red";
}
function initErreur(cadre, champ) {
	cadre.style.border = "1px solid gray";
	champ.innerText = "";
}
//verification du formatage du courriel
function validateEmail(email) {
	let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}

//Classe objet Message
class Message {

	//creation d'une nouvelle personne
	constructor(type, message, client) {
		this._type = type;
		this._message = message;
		this._client = client;
	}
	get type() {
		return this._type;
	}
	get message() {
		return this._message;
	}
	get client() {
		return this._client;
	}
};

//Classe objet Client
class Client {

	//creation d'une nouvelle personne
	constructor(nom, prenom, courriel, photo) {
		this._nom = nom;
		this._prenom = prenom;
		this._courriel = courriel;
		this._photo = photo;
	}
	get nom() {
		return this._nom;
	}
	get prenom() {
		return this._prenom;
	}
	get courriel() {
		return this._courriel;
	}
};

//creation d'une classe d'objet Photo

//Les objets ont pour attributs:
// un titre qui permet de se référer à la combobox du html
// un src qui permettra la modification du src de l'image

class Photo {

	constructor(titre, src) {
		this._titre = titre;
		this._src = src;
	}
	get titre() {
		return this._titre;
	}
	get src() {
		return this._src;
	}
};