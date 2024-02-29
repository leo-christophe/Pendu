import { createElement } from './Utilitaire.js';

export default class InterfaceUtilisateur {
    constructor() {
        this.images = [
            "../assets/hangmanDrawing/step0.png", 
            "../assets/hangmanDrawing/step1.png", 
            "../assets/hangmanDrawing/step2.png", 
            "../assets/hangmanDrawing/step3.png", 
            "../assets/hangmanDrawing/step4.png", 
            "../assets/hangmanDrawing/step5.png", 
            "../assets/hangmanDrawing/step6.png"
        ];

        this.elementFlottant = document.querySelector("section#flottant");

        this.darkLightMode = document.querySelector("img.Mode");
        this.darkLightMode.addEventListener("click", ()=>this.toggleDarkMode());

        this.conteneurImage = document.querySelector("#conteneurImagePendu");
        this.dessinPenduEtape = document.querySelector(".DessinPendu");
    }

    /**
     * Affichage du pendu
     * @param {int} nbLettresIncorrectes Nombre de lettres incorrectes
     */
    penduAffichage(nbLettresIncorrectes) {
        // on supprime l'image
        this.dessinPenduEtape.remove();

        // récupération de l'image correspondante à la partie du pendu
        let dessinPenduString = this.images[6 - nbLettresIncorrectes];
        this.dessinPenduEtape.src = dessinPenduString;

        // on réaffiche l'image
        this.conteneurImage.appendChild(this.dessinPenduEtape);
    }

    /**
     * Bascule entre le mode sombre et le mode clair
     * @returns {void}
     */
    toggleDarkMode() {
        const isDarkMode = document.body.classList.contains('dark-mode');
        console.log(isDarkMode)
        if (isDarkMode) {
            document.body.classList.remove('dark-mode');
            document.body.classList.add('light-mode');
            this.darkLightMode.src = "../assets/Parameters/lightmode.png";
        } else {
            document.body.classList.remove('light-mode');
            document.body.classList.add('dark-mode');
            this.darkLightMode.src = "../assets/Parameters/darkmode.png";
        }
    }
}
