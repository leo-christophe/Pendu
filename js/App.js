import Pendu from './Pendu.js';
import InterfaceUtilisateur from './InterfaceUtilisateur.js';
import UtilisateurService from '../services/UtilisateurService.js';

/**
 * App
 * 
 * Classe représentant l'application du jeu Pendu.
 * 
 * @class App
 * @property {Pendu} pendu - Instance du jeu Pendu
 * @property {InterfaceUtilisateur} interfaceUtilisateur - Instance de l'interface utilisateur
 * @method demarrerJeu - Méthode pour démarrer le jeu
 * 
 * @exports App
 * @requires Pendu
 * @requires InterfaceUtilisateur
 * @see Pendu
 * @see InterfaceUtilisateur
 */
class App {
    constructor() {
        // Instance du jeu Pendu et de l'interface utilisateur
        this.pendu = new Pendu();
        this.interfaceUtilisateur = new InterfaceUtilisateur();

    }

    // Méthode pour démarrer le jeu
    demarrerJeu() {
        // Logique pour démarrer le jeu
        this.interfaceUtilisateur.initialiserJeu();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const service = new UtilisateurService();
    service.createUser({pseudo: 'toto', email: 'leo.chris@d.fr', mdp: '1234'});

    const app = new App();
});
export default App;
