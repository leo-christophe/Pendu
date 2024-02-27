import InterfaceUtilisateur from './InterfaceUtilisateur.js';
import { createElement } from './Utilitaire.js';

/**
 * Classe représentant le jeu du pendu et ses fonctionnalités associées. 
 * {@link Pendu}
 * @class Pendu
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
 * @method creationFormulaire - Méthode pour créer le formulaire de devinette
 * @method deviner - Méthode pour deviner une lettre
 * @method choisirMot - Méthode pour choisir un mot
 * @method essaiLettre - Méthode pour essayer une lettre
 * @method getEtatJeu - Méthode pour obtenir l'état du jeu
 * @method sauvegarderPartie - Méthode pour sauvegarder une partie
 * @method chargerPartie - Méthode pour charger une partie
 * @method penduAffichage - Méthode pour afficher le dessin du pendu
 * @method wordToUnderscore - Méthode pour transformer un mot en underscores
 * @exports Pendu
 * @requires InterfaceUtilisateur
 * @requires createElement
 * @requires Utilitaire
 * @see InterfaceUtilisateur
 * @see createElement
 * @see Utilitaire
 */
class Pendu {
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

        this.startButton = createElement("button");
        this.startButton.textContent = "Start";
        this.startButton.id = "buttonVisible";
        
        this.startButton.addEventListener("click", () => this.creationFormulaire());
        document.body.appendChild(this.startButton);

        this.btdeviner = document.createElement("button");
        this.btdeviner.textContent = "Deviner";
        this.btdeviner.id = "buttonHidden";
        document.body.appendChild(this.btdeviner);

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
            const lettreSaisie = document.getElementById('Lettre').value.toLowerCase();
            this.essaiLettre(lettreSaisie);
        });
    }

    creationFormulaire() {
        this.startButton.id = "buttonHidden";
        this.Letterform.style.visibility = 'visible';
        this.Perdu.style.visibility = "hidden";
        this.Gagne.style.visibility = "hidden";
        this.btdeviner.id = 'buttonVisible';
        this.penduDessin.style.visibility = "visible";
        this.penduAffichage();
        this.motADeviner = this.choixMot();
        document.querySelector("p#vieRestante").textContent = "6";
        this.etatMot = this.wordToUnderscore(this.motADeviner);

        this.affichage.textContent = this.etatMot.join(' ');
        this.affichage.style.visibility = 'visible';
    }

    deviner(lettre) {
        let correct = true;
        const motADeviner = this.motADeviner;
        const etatMot = this.etatMot;
        if (motADeviner.indexOf(lettre) === -1) {
            this.viesRestantes--;
            this.lettresIncorrectes.textContent += " " + lettre.toUpperCase();
            this.vie.textContent = this.viesRestantes;
            this.Interface.penduAffichage();
        } else {
            for (let i = 0; i < motADeviner.length; i++) {
                if (motADeviner[i] === lettre) {
                    etatMot[i] = lettre;
                }
            }
            this.etatMot = etatMot;
        }
    }

    choisirMot() {
        this.motADeviner = this.motsPendu[Math.floor(Math.random() * this.motsPendu.length)];
        this.etatMot = this.motADeviner.split('').map(() => '_');
    }

    essaiLettre(lettreSaisie) {
        this.deviner(lettreSaisie);
        this.affichage.textContent = this.etatMot.join(' ');

        if (this.motADeviner === this.etatMot.join('')) {
            this.startButton.id = "buttonVisible";
            this.Letterform.style.visibility = 'hidden';
            this.affichage.style.visibility = 'hidden';
            this.affichage.textContent = "";
            this.lettresIncorrectes.textContent = "";
            this.viesRestantes = 6;
            this.btdeviner.id = 'buttonInvisible';

            this.Gagne.style.visibility = "visible";
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

    getEtatJeu() {
        return {
            motADeviner: this.motADeviner,
            etatMot: this.etatMot,
            lettresIncorrectes: this.lettresIncorrectes,
            viesRestantes: this.viesRestantes
        };
    }

    sauvegarderPartie() {
        // Implémentez la logique pour sauvegarder l'état du jeu
    }

    chargerPartie() {
        // Implémentez la logique pour charger une partie sauvegardée précédemment
    }

    penduAffichage() {
        this.Interface.penduAffichage();
    }

    wordToUnderscore(mot) {
        return mot.split('').map(() => '_');
    }
}

export default Pendu;
