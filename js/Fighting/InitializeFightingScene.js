import Player from '../Models/Player.js';
import Enemy from '../Models/Enemy.js';
import Fight from './Fights.js';

// Create a class for the fighting scene
class InitializeFightingScene {
    constructor(NewPlayer, NewEnemy) {
        if (NewPlayer === undefined || Enemy === undefined) throw new Error('You must provide a player and an enemy to start a fight');
        if (!(NewPlayer instanceof Player) || !(NewEnemy instanceof Enemy)) throw new Error('Player and Enemy must be instances of Player and Enemy');

        this.player = NewPlayer;
        this.ennemy = NewEnemy;

        window.location.pathname = "./Pages/fightGame.html";

        document.querySelector("#player_Stats").textContent = `Health: ${this.player.health} - Attack: ${this.player.attack}`; 
        document.querySelector("#ennemy_Stats").textContent = `Health: ${this.ennemy.health} - Attack: ${this.ennemy.attack}`;

        this.FightInstance = new Fight(this.player, this.ennemy);
        this.fightResult = this.FightInstance.going();
    }
}

// Export the class
export default InitializeFightingScene;