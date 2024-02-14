const motsPendu = [
    "ordinateur", "programmation", "developpeur", "javascript",
    "algorithmique", "interface", "compilation", "fonction",
    "boucle", "variable", "tableau", "objet", "methode", "parametre",
    "fonctionnalite", "condition", "operateur", "syntaxe", "classe",
    "heritage", "encapsulation", "polymorphisme", "hautniveau",
    "basniveau", "compilateur", "interpreteur", "gestionnaire",
    "package", "module", "bibliothèque", "framework", "version",
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


const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
  'é', 'è', 'â', 'ê', 'î', 'ô', 'û', 'à', 'ù', 'ë', 'ï', 'ü', 'ç', 'æ', 'œ', "'", 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 
  'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z', 'É', 'È', 'Â', 'Ê', 'Î', 'Ô', 'Û', 'À', 'Ù', 'Ë', 'Ï', 'Ü', 'Ç', 'Æ', 'Œ', " "];
  
function createElement(type, parent, text="", className="", id="") {
    const element = document.createElement(type);
    if (text) {
      element.textContent = text;
    }
    if (id) {
      element.id = id;
    }
    if (className) {
      element.classList.add(className);
    }
    parent.appendChild(element);
    return element;
  }

const dessinPenduEtape = document.createElement("img");
let darkLightMode = createElement("img", document.body, "", "Mode", "");
darkLightMode.src = "assets/Parameters/darkmode.png";
darkLightMode.title = "Bouton dark mode";
darkLightMode.addEventListener("click", ()=>toggleDarkMode());

let etatPartie = [
    // mot à deviner
    "", 
    // vies restantes
    document.querySelector("p#vieRestante").textContent, 
    // mot deviné jusqu'à maintenant
    []
]

function penduAffichage()
/** Fonction permettant d'afficher l'étape du pendu
 *  Prend le nombre de vies du joueur et affiche le dessin de pendu correspondant.
 */
{
    const files = ["assets/hangmanDrawing/step0.png", 
                    "assets/hangmanDrawing/step1.png", 
                    "assets/hangmanDrawing/step2.png", 
                    "assets/hangmanDrawing/step3.png", 
                    "assets/hangmanDrawing/step4.png", 
                    "assets/hangmanDrawing/step5.png", 
                    "assets/hangmanDrawing/step6.png"];
    dessinPenduEtape.remove();
    let dessinPenduString = files[6-etatPartie[1]];
    
    dessinPenduEtape.src = dessinPenduString;
    document.body.appendChild(dessinPenduEtape);
}

function toggleDarkMode() 
/** Une fonction permettant de mettre à jour le dark-mode ou le light-mode.
 *  @return {void} - Ne retourne rien.
 */
{
    const body = document.body;
    const isDarkMode = body.classList.contains('dark-mode');
    // S'il est déjà en dark mode, on le met en light mode.
    if (isDarkMode) {
      body.classList.remove('dark-mode');
      body.classList.add('light-mode');
      darkLightMode.src="assets/Parameters/lightmode.png";
    // Si le bouton est déjà en light-mode, on le met en dark-mode.
    } else {
      body.classList.remove('light-mode');
      body.classList.add('dark-mode');
      darkLightMode.src="assets/Parameters/darkmode.png";
    }
  }

function choixMot(nombreMot=50)
/**
 *  @param {int} nombreMot Nombre de mot parmis lesquels choisir.
 *  @return {string} Le mot choisi.
 *  Permet de sélectionner un mot aléatoire de la base de donnée de mots
 */
{
    const randomIndex = Math.floor(Math.random()* nombreMot+1) 
    return motsPendu[randomIndex];
}

function wordToUnderscore(wordU)
/**
 *  Permet de transformer un mot en underscore pour qu'il soit caché.
 *  @param {string} wordU Mot à transformer en tiret du bas.
 *  @return {string} Une chaîne de caractère correspondant aux lettres du mot choisi avec chacune remplacée par un tiret du bas.
 */
{
    return wordU.split('').map(() => '_');
}

function deviner(lettre)
/** 
 *  Deviner prend en argument la lettre à deviner.
 *  Si la lettre est présente dans le mot à deviner, alors l'état actuel évolue, les lettres correspondantes s'affichent sinon, false est renvoyé. 
 * 
 *  @param {string} lettre - La lettre à deviner.
 *  @return {bool} - True si une lettre a été devinée, False si aucune lettre n'a été devinée.
 */ 
{
    let correct = true;
    const motADeviner = etatPartie[0]
    const etatMot = etatPartie[2]
    // la lettre n'existe pas dans le mot
    if (motADeviner.indexOf(lettre) == -1)
    {
        etatPartie[1] = etatPartie[1] - 1;
        
        vie.textContent = etatPartie[1];
        lettresIncorrectes.textContent += " " + lettre.toUpperCase()
        penduAffichage();
    }

    // la lettre existe, on change l'état du mot
    if (correct == true){
        for(let i = 0; i<motADeviner.length; i++){
            if(motADeviner[i]==lettre){
                etatMot[i]=lettre;
            }
        }
        etatPartie[2] = etatMot
        return true;
    }
    return false;
}
let vie = document.querySelector("p#vieRestante")

const startButton = document.createElement("button");
    startButton.textContent = "Start";
    startButton.type = "submit";
    // propriété visible
    startButton.id = "#buttonVisible";
    // style button
    startButton.classList.add("button-56");
    startButton.addEventListener("click",()=>creationFormulaire())
    document.body.appendChild(startButton);

const btdeviner = document.createElement("button");
    btdeviner.textContent = "Deviner";
    btdeviner.id="buttonHidden"
    btdeviner.type ="submit";
    document.body.appendChild(btdeviner)

const Letterform = document.createElement("form", document.body);
    Letterform.innerHTML = `
            <h2>Devinez une lettre</h2>
            <label for="Lettre">Lettre:</label>
            <input class="letterInput" type="text" id="Lettre" name="Lettre" required><br>`;
    document.body.appendChild(Letterform);
    let letterInput = document.querySelector("input#Lettre.letterInput");
    document.body.appendChild(Letterform);
    Letterform.style.visibility='hidden';

const Gagne = document.createElement("h3", document.body)
    Gagne.textContent = "Vous avez gagné ! Bravo !"
    Gagne.style.visibility = "hidden";

const Perdu = document.createElement("h3", document.body)
    Perdu.style.textContent = "Vous avez perdu... Dommage!"
    Perdu.style.visibility = "hidden";

let affichage = document.createElement("div");
document.body.appendChild(affichage)
affichage.style.visibility='hidden';

let lettresIncorrectes = document.querySelector("div#lettresIncorrectes");
document.body.appendChild(lettresIncorrectes)

let penduDessin = document.createElement("div")
document.body.appendChild(penduDessin)
penduDessin.style.visibility = "hidden";


function creationFormulaire(){
// création du formulaire
    startButton.id="buttonHidden";
    Letterform.style.visibility='visible';
    Perdu.style.visibility = "hidden";
    Gagne.style.visibility = "hidden";
    btdeviner.id='buttonVisible'
    penduDessin.style.visibility = "visible"
    penduAffichage();
    etatPartie[0] = choixMot()
    document.querySelector("p#vieRestante").textContent = "6";
    etatPartie[2] = wordToUnderscore(etatPartie[0]);

    affichage.textContent = etatPartie[2].join(' ');
    affichage.style.visibility='visible';
}

function DevinerLettre()
/** Fonction permettant de deviner une lettre
 *  @return {void} Ne retourne rien.
 */
{
    const lettreSaisie = document.getElementById('Lettre').value
    essaiLettre(lettreSaisie.toLowerCase())
    document.getElementById('Lettre').value = "";
}

btdeviner.addEventListener("click", function () {
    DevinerLettre()
});

document.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        DevinerLettre()
    }
});


function essaiLettre(lettreSaisie){
    deviner(lettreSaisie);
    affichage.textContent = etatPartie[2].join(' '); // Met à jour l'affichage

    // le joueur gagne
    console.log(etatPartie[0] == etatPartie[2].join(''))
    if (etatPartie[0] == etatPartie[2].join('')){
        startButton.id="buttonVisible";
        Letterform.style.visibility='hidden';
        affichage.style.visibility='hidden';
        affichage.textContent = "";
        lettresIncorrectes.textContent = "";
        etatPartie[1] = 6;
        btdeviner.id='buttonInvisible'

        Gagne.style.visibility = "visible"
    }

    // le joueur perd
    else if (etatPartie[1] == 0){
        startButton.id="buttonVisible";
        Letterform.style.visibility='hidden';
        affichage.style.visibility='hidden';
        affichage.textContent = "";
        lettresIncorrectes.textContent = "";
        etatPartie[1] = 6;
        btdeviner.id='buttonInvisible'

        Perdu.style.visibility = "visible";
    }
}