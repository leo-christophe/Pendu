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

        this.darkLightMode = createElement("img", document.body, "", "Mode", "");
        this.darkLightMode.src = "assets/Parameters/darkmode.png";
        this.darkLightMode.title = "Bouton dark mode";
        this.darkLightMode.addEventListener("click", this.toggleDarkMode.bind(this));
        this.dessinPenduEtape = document.createElement("img");
    }

    /**
     * Affichage du pendu
     * @param {int} nbLettresIncorrectes Nombre de lettres incorrectes
     */
    penduAffichage(nbLettresIncorrectes) {
        this.dessinPenduEtape.remove();
        let dessinPenduString = this.images[6 - nbLettresIncorrectes];
        this.dessinPenduEtape.src = dessinPenduString;
        document.body.appendChild(this.dessinPenduEtape);
    }

    /**
     * Bascule entre le mode sombre et le mode clair
     */
    toggleDarkMode() {
        const body = document.body;
        const isDarkMode = body.classList.contains('dark-mode');
        if (isDarkMode) {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            this.darkLightMode.src = "assets/Parameters/lightmode.png";
        } else {
            body.classList.remove('light-mode');
            body.classList.add('dark-mode');
            this.darkLightMode.src = "assets/Parameters/darkmode.png";
        }
    }
}
