import Player from '../Models/Player.js';
import Enemy from '../Models/Enemy.js';
import Fight from './Fights.js';

// Create a class for the fighting scene
class InitializeFightingScene {
    constructor(Player, Enemy) {
        if (Player === undefined || Enemy === undefined) throw new Error('You must provide a player and an enemy to start a fight');
        if (!(Player instanceof Player) || !(Enemy instanceof Enemy)) throw new Error('Player and Enemy must be instances of Player and Enemy');

        this.player = Player;
        this.ennemy = Enemy;
        this.Fight = new Fight(this.player, this.ennemy);

        document.querySelector("#player_Stats").textContent = `Health: ${this.player.health} - Attack: ${this.player.attack}`; 
        document.querySelector("#ennemy_Stats").textContent = `Health: ${this.ennemy.health} - Attack: ${this.ennemy.attack}`;
    }
}

// Export the class
export default InitializeFightingScene;
