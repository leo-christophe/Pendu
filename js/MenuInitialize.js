import InterfaceUtilisateur from './InterfaceUtilisateur.js';

/**
 * MenuInitialize
 * 
 * Classe représentant le menu d'initialisation du jeu Pendu.
 * 
 * @class MenuInitialize
 * @property {InterfaceUtilisateur} interfaceUtilisateur - Instance de l'interface utilisateur
**/
class MenuInitialize {
    constructor() {
        // Instance de l'interface utilisateur
        this.interfaceUtilisateur = new InterfaceUtilisateur();
        
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const menuInitialize = new MenuInitialize();
});

export default MenuInitialize;
