import InterfaceUtilisateur from './InterfaceUtilisateur.js';
import { createElement } from './Utilitaire.js';

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
        this.Interface = new InterfaceUtilisateur();

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
        this.lettresIncorrectes = [];
        this.viesRestantes = 6;

        // Elements HTML
        this.vie = document.querySelector("p#vieRestante");

        this.startButton = document.querySelector("button#buttonVisible");        
        this.startButton.addEventListener("click", () => this.creationFormulaire());

        this.btdeviner = document.querySelector("button#buttonHidden");

        this.Letterform = document.createElement("form");
        this.Letterform.innerHTML = `
            <h2>Devinez une lettre</h2>
            <label for="Lettre">Lettre:</label>
            <input type="text" id="Lettre" name="Lettre" required><br>`;
        document.body.appendChild(this.Letterform);
        this.Letterform.style.visibility = 'hidden';

        this.Gagne = document.createElement("h3");
        this.Gagne.textContent = "Vous avez gagné ! Bravo !";
        this.Gagne.style.visibility = "hidden";
        document.body.appendChild(this.Gagne);

        this.Perdu = document.createElement("h3");
        this.Perdu.textContent = "Vous avez perdu... Dommage!";
        this.Perdu.style.visibility = "hidden";
        document.body.appendChild(this.Perdu);

        this.affichage = document.createElement("div");
        document.body.appendChild(this.affichage);
        this.affichage.style.visibility = 'hidden';

        this.lettresIncorrectes = document.querySelector("div#lettresIncorrectes");

        this.penduDessin = document.createElement("div");
        document.body.appendChild(this.penduDessin);
        this.penduDessin.style.visibility = "hidden";

        this.btdeviner.addEventListener("click", () => {
            // récupération de la lettre saisie
            const lettreSaisie = document.getElementById('Lettre').value.toLowerCase();
            
            // vérification de la lettre saisie (une seule lettre et dans l'alphabet)
            if (lettreSaisie.length == 1 && this.alphabet.includes(lettreSaisie) && !this.lettresIncorrectes.textContent.includes(lettreSaisie.toUpperCase())) {
                // on essaye la lettre
                this.essaiLettre(lettreSaisie);
            }
        });
    }

    /**
     * Permet d'afficher le formulaire pour deviner des lettres.
     * 
     * @return {void} Ne retourne rien.
     */
    creationFormulaire() {
        // On cache le bouton "Start" et on affiche le bouton "Deviner"
        this.startButton.id = "buttonHidden";
        this.btdeviner.id = 'buttonVisible';

        this.Letterform.style.visibility = 'visible';
        this.Perdu.style.visibility = "hidden";
        this.Gagne.style.visibility = "hidden";
        this.penduDessin.style.visibility = "visible";

        // Nouvelle partie
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
        return this.motsPendu[Math.floor(Math.random() * this.motsPendu.length)];
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

        // le joueur a gagné
        if (this.motADeviner === this.etatMot.join('')) {
            this.startButton.id = "buttonVisible";
            this.Letterform.style.visibility = 'hidden';
            this.affichage.style.visibility = 'hidden';
            this.affichage.textContent = "";
            this.lettresIncorrectes.textContent = "";
            this.viesRestantes = 6;
            this.btdeviner.id = 'buttonInvisible';

            this.Gagne.style.visibility = "visible";

        // le joueur a perdu
        } else if (this.viesRestantes === 0) {
            this.startButton.id = "buttonVisible";
            this.Letterform.style.visibility = 'hidden';
            this.affichage.style.visibility = 'hidden';
            this.affichage.textContent = "";
            this.lettresIncorrectes.textContent = "";
            this.viesRestantes = 6;
            this.btdeviner.id = 'buttonInvisible';

            this.Perdu.style.visibility = "visible";
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