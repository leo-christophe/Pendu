import InterfaceUtilisateur from './InterfaceUtilisateur.js';
import InitializeFightingScene from './Fighting/InitializeFightingScene.js';
import Player from './Models/Player.js';
import Enemy from './Models/Enemy.js';
import { createElement } from './Utilitaire.js';

function obtenirMotAleatoire(listeMots) {
    return listeMots[listeMots.length * Math.random() | 0];
        // const response = await fetch('https://random-word-api.herokuapp.com/word?lang=fr');
        // const data = await response.json();
        // const mot = data[0]; // Le mot est retourné sous forme de tableau, nous prenons donc le premier élément
        // return mot;
}


/**
 * Classe représentant le jeu du pendu et ses fonctionnalités associées. 
 * {@link Pendu}
 * @class Pendu
 * 
 * @property {InterfaceUtilisateur} Interface - L'interface utilisateur du jeu
 * @property {string[]} motsPendu - Liste des mots du pendu
 * @property {string[]} alphabet - Liste des lettres de l'alphabet
 * @property {string} motADeviner - Le mot à deviner
 * @property {string[]} etatMot - L'état du mot à deviner
 * @property {string[]} lettresIncorrectes - Les lettres incorrectes
 * @property {number} viesRestantes - Le nombre de vies restantes
 * @property {HTMLElement} vie - L'élément HTML représentant le nombre de vies restantes
 * @property {HTMLElement} startButton - Le bouton de démarrage du jeu
 * @property {HTMLElement} btdeviner - Le bouton pour deviner une lettre
 * @property {HTMLElement} Letterform - Le formulaire pour deviner une lettre
 * @property {HTMLElement} Gagne - L'élément HTML pour afficher le message de victoire
 * @property {HTMLElement} Perdu - L'élément HTML pour afficher le message de défaite
 * @property {HTMLElement} affichage - L'élément HTML pour afficher l'état du mot à deviner
 * @property {HTMLElement} lettresIncorrectes - L'élément HTML pour afficher les lettres incorrectes
 * @property {HTMLElement} penduDessin - L'élément HTML pour afficher le dessin du pendu
 * 
 * @method creationFormulaire - Méthode pour créer le formulaire de devinette
 * @method deviner - Méthode pour deviner une lettre
 * @method choisirMot - Méthode pour choisir un mot
 * @method essaiLettre - Méthode pour essayer une lettre
 * @method getEtatJeu - Méthode pour obtenir l'état du jeu
 * @method sauvegarderPartie - Méthode pour sauvegarder une partie
 * @method chargerPartie - Méthode pour charger une partie
 * @method penduAffichage - Méthode pour afficher le dessin du pendu
 * @method wordToUnderscore - Méthode pour transformer un mot en underscores
 * 
 * @requires InterfaceUtilisateur
 * @requires createElement
 * @requires Utilitaire
 */
class Pendu {
    /**
     * Crée une instance de Pendu.
     * @constructor
     * @property {InterfaceUtilisateur} Interface - L'interface utilisateur du jeu
     * @property {string[]} motsPendu - Liste des mots du pendu
     * @property {string[]} alphabet - Liste des lettres de l'alphabet
     */
    constructor() {
        
        if (!document.cookie.includes("combattendu")){
            document.cookie += "combattendu=0;";
        }
        
        this.Interface = new InterfaceUtilisateur();

        const combattenduCookie = document.cookie.split(';').find(cookie => cookie.trim().startsWith('combattendu='));
        const combattenduValue = combattenduCookie ? combattenduCookie.split('=')[1] : '0';
        this.Score = createElement("p", document.querySelector("section#flottant"), `Score: ${parseInt(combattenduValue)}`, "", "score", "visibility:hidden");

        this.motsPendu = [
            "ordinateur", "programmation", "developpeur", "javascript",
            "algorithmique", "interface", "compilation", "fonction",
            "boucle", "variable", "tableau", "objet", "methode", "parametre",
            "fonctionnalite", "condition", "operateur", "syntaxe", "classe",
            "heritage", "encapsulation", "polymorphisme", "hautniveau",
            "basniveau", "compilateur", "interpreteur", "gestionnaire",
            "package", "module", "bibliotheque", "framework", "version",
            "source", "erreur", "exception", "debugger", "optimisation",
            "memoire", "allocation", "pointeur", "reference", "lien",
            "interface", "API", "interfaceutilisateur", "interfacegraphique",
            "backend", "frontend", "basededonnees", "requete", "index",
            "cleprimaire", "cleetrangere", "jointure", "transaction", "commit",
            "rollback", "fonctiondagregation", "SQL", "NoSQL", "MongoDB",
            "MySQL", "PostgreSQL", "SQLite", "HTML", "CSS", "JavaScript",
            "React", "Angular", "Vuejs", "Nodejs", "Express", "RESTful",
            "API", "JSON", "XML", "AJAX", "HTTP", "HTTPS", "TCP/IP", "UDP",
            "socket", "clientserveur", "architecture", "systemedexploitation",
            "Linux", "Windows", "macOS", "Android", "iOS", "IDE", "debugger",
            "integrationcontinue", "deploiementcontinu", "git", "repository",
            "branche", "fusion", "commit", "pullrequest", "mergeconflict", "DevOps", "agile", "SCRUM", "Kanban", "waterfall"
        ];

        this.alphabet = [
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
            'é', 'è', 'â', 'ê', 'î', 'ô', 'û', 'à', 'ù', 'ë', 'ï', 'ü', 'ç', 'æ', 'œ', "'", 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 
            'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z', 'É', 'È', 'Â', 'Ê', 'Î', 'Ô', 'Û', 'À', 'Ù', 'Ë', 'Ï', 'Ü', 'Ç', 'Æ', 'Œ', " "
        ];

        this.motADeviner = '';
        this.etatMot = [];
        this.viesRestantes = 6;

        // Elements HTML
        this.vie = document.querySelector("p#vieRestante");

        // récupération du bouton de démarrage
        this.startButton = document.querySelector("button.buttonVisible");        
        this.startButton.addEventListener("click", () => this.creationFormulaire());

        // récupération du bouton de devinette
        this.btdeviner = document.querySelector("button.buttonHidden");
        this.btdeviner.addEventListener("click", () => {
            this.processLettre();
        });

        this.conteneurGauche = document.querySelector("#formulaire");

        // création du formulaire
        this.Letterform = createElement("form", this.conteneurGauche, "", "", "formLettre");
        this.Letterform.innerHTML = `
            <h2>Devinez une lettre</h2>
            <input type="text" id="Lettre" name="Lettre" required><br>`;
        this.Letterform.style.visibility = 'hidden';

        this.messagePartie = document.querySelector("#message")

        // récupèration du messages de victoire
        this.Gagne = createElement("h3", this.messagePartie, "Vous avez gagné ! Bravo !");
        this.Gagne.style.display = "none";

        // récupèration du messages de défaite
        this.Perdu = createElement("h3", this.messagePartie, "Vous avez perdu... Dommage!");
        this.Perdu.style.display = "none";

        this.espaceDevinette = document.querySelector("#espaceDevinette");

        // récupération de l'affichage du mot
        this.affichage = document.createElement("div");
        this.espaceDevinette.appendChild(this.affichage);
        this.affichage.style.visibility = 'hidden';

        // récupération des lettres incorrectes
        this.lettresIncorrectes = document.querySelector("div#lettresIncorrectes");

        this.penduDessin = document.createElement("div");
        document.querySelector("#partieHautJeu").appendChild(this.penduDessin);
        this.penduDessin.style.visibility = "hidden";

        this.cadre = document.querySelector(".pendu");
        this.imgPendu = document.querySelector("#imagePendu");

        document.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                event.preventDefault(); // Empêche le comportement par défaut de la touche Entrée
                this.processLettre();
            }
        });
        
    }

    /**
     * Prend une lettre et la traite.
     * 
     */
    processLettre(){
        // récupération de la lettre saisie
        const lettreSaisie = document.getElementById('Lettre').value.toLowerCase();
        
        // vérification de la lettre saisie (une seule lettre et dans l'alphabet)
        if (lettreSaisie.length == 1 && this.alphabet.includes(lettreSaisie) && !this.lettresIncorrectes.textContent.includes(lettreSaisie.toUpperCase())) {
            // on essaye la lettre
            this.essaiLettre(lettreSaisie);
        }
        // on vide le champ de saisie
        document.getElementById('Lettre').value = "";
    }

    /**
     * Permet d'afficher le formulaire pour deviner des lettres.
     * 
     * @return {void} Ne retourne rien.
     */
    creationFormulaire() {
        // On cache le bouton "Start" et on affiche le bouton "Deviner"
        document.querySelector("div#partieGaucheJeu").style.visibility = 'visible';
        document.querySelector("p#score").style.visibility = 'visible';

        this.startButton.classList.remove("buttonVisible");
        this.startButton.classList.add("buttonHidden");

        this.btdeviner.classList.remove('buttonHidden');
        this.btdeviner.classList.add('buttonVisible');

        this.Letterform.style.visibility = 'visible';

        this.Perdu.style.display = "none";
        this.Gagne.style.display = "none";
        this.penduDessin.style.visibility = "visible";

        this.imgPendu.visibility = "visible";
        this.cadre.visibility = "visible";


        this.Interface.penduAffichage(this.lettresIncorrectes.textContent.length);
        this.motADeviner = this.choisirMot();
        this.etatMot = this.motADeviner.split('').map(() => '_');

        document.querySelector("p#vieRestante").textContent = "6";
        this.affichage.textContent = this.etatMot.join(' ');
        this.affichage.style.visibility = 'visible';
    }

    /**
     * Permet de deviner une lettre dans le mot à deviner.
     * 
     * @param {string} lettre 
     * @return {void} Ne retourne rien.
     * @throws {Error} Si la lettre n'est pas une seule lettre.
     */
    deviner(lettre) {
        // Vérification erreur
        if (lettre.length !== 1) {
            throw new Error('La lettre doit être une seule lettre.');
        }
        console.log(this.motADeviner, lettre)
        // on ne trouve pas la lettre dans le mot à deviner
        if (this.motADeviner.indexOf(lettre) === -1) {
            this.viesRestantes--;
            this.lettresIncorrectes.textContent += " " + lettre.toUpperCase();
            this.vie.textContent = this.viesRestantes;

            let motString = this.lettresIncorrectes.textContent.replace(/\s/g, '');
            this.Interface.penduAffichage(motString.length);
        } else {
            for (let i = 0; i < this.motADeviner.length; i++) {
                if (this.motADeviner[i] === lettre) {
                    this.etatMot[i] = lettre;
                }
            }
        }
    }

    /**
 * Permet de choisir un mot aléatoire dans la liste des mots du pendu.
 * 
 * @returns {string} Le mot à deviner
 */
 choisirMot() {
    return obtenirMotAleatoire(this.motsPendu);
}


    /**
     * Permet d'essayer une lettre.
     * 
     * @param {string} lettreSaisie
     * @return {void} Ne retourne rien. 
     */
    essaiLettre(lettreSaisie) {
        this.deviner(lettreSaisie);
        this.affichage.textContent = this.etatMot.join(' ');

        let joueurGagne = this.motADeviner === this.etatMot.join('');
        let joueurPerdu = this.viesRestantes === 0;

        console.log(joueurGagne, joueurPerdu)

        // le joueur a gagné
        if (joueurGagne) {
            document.cookie = Number(document.cookie) + 1;
            this.Gagne.style.display = "block";

        // le joueur a perdu
        } else if (joueurPerdu) {
            this.Perdu.style.display="block";
        }
        
        // Fin de la partie
        if (joueurGagne==true || joueurPerdu==true) {
            this.startButton.classList.remove("buttonHidden")
            this.startButton.classList.add("buttonVisible");

            this.btdeviner.classList.remove("buttonVisible");
            this.btdeviner.classList.add("buttonHidden")
            
            this.lettresIncorrectes.textContent = "";
            this.affichage.textContent = "";

            this.Letterform.style.visibility = 'hidden';
            this.affichage.style.visibility = 'hidden';

            this.imgPendu.visibility = "hidden";
            this.cadre.visibility = "hidden";

            this.viesRestantes = 6;

            window.location.pathname = "./Pages/fightGame.html";

            var player = new Player(100, 10);
            var enemy = new Enemy(100, 1);

            this.penduDessin.style.visibility = "hidden";
            document.querySelector("div#partieGauche").style.visibility = 'hidden';
            document.querySelector("p#score").style.visibility = 'hidden';

            var fightingGame = new InitializeFightingScene(player, enemy);
        }
    }

    /**
     * Permet d'obtenir l'état du jeu.
     * @returns {Object} L'état du jeu
     */
    getEtatJeu() {
        return {
            motADeviner: this.motADeviner,
            etatMot: this.etatMot,
            lettresIncorrectes: this.lettresIncorrectes,
            viesRestantes: this.viesRestantes
        };
    }

    sauvegarderPartie() {
        throw new Error('Not implemented yet');
    }

    chargerPartie() {
        throw new Error('Not implemented yet');
    }

    penduAffichage() {
        wordString = this.lettresIncorrectes.textContent.join(' ');
        this.Interface.penduAffichage(wordString.length);
    }

    wordToUnderscore(mot) {
        return mot.split('').map(() => '_');
    }
}

export default Pendu;
