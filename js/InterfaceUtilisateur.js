import { createElement } from './Utilitaire.js';


export default class InterfaceUtilisateur {

    constructor() {
        this.images = ["assets/hangmanDrawing/step0.png", 
        "assets/hangmanDrawing/step1.png", 
        "assets/hangmanDrawing/step2.png", 
        "assets/hangmanDrawing/step3.png", 
        "assets/hangmanDrawing/step4.png", 
        "assets/hangmanDrawing/step5.png", 
        "assets/hangmanDrawing/step6.png"];

        this.darkLightMode = createElement("img", document.body, "", "Mode", "");
        this.darkLightMode.src = "assets/Parameters/darkmode.png";
        this.darkLightMode.addEventListener("click", ()=>toggleDarkMode());
        this.dessinPenduEtape = document.createElement("img");
    }



    // permet d'afficher l'image correspondante à l'état de la partie.
    penduAffichage(nbLettresIncorrectes){
        dessinPenduEtape.remove();
        let dessinPenduString = images[6-nbLettresIncorrectes];
        dessinPenduEtape.src = dessinPenduString;
        document.body.appendChild(dessinPenduEtape);
    }
}


function toggleDarkMode() {
    const body = document.body;
    const isDarkMode = body.classList.contains('dark-mode');
    if (isDarkMode) {
      body.classList.remove('dark-mode');
      body.classList.add('light-mode');
      darkLightMode.src="assets/Parameters/lightmode.png";
    } else {
      body.classList.remove('light-mode');
      body.classList.add('dark-mode');
      darkLightMode.src="assets/Parameters/darkmode.png";
    }
  }
  