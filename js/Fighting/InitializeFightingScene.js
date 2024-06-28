import Player from '../Models/Player.js';
import Enemy from '../Models/Enemy.js';
import Fight from './Fights.js';

// Créer une classe pour la scène de combat
class InitializeFightingScene {
    constructor(NewPlayer, NewEnemy) {
        if (NewPlayer === undefined || NewEnemy === undefined) throw new Error('You must provide a player and an enemy to start a fight');
        if (!(NewPlayer instanceof Player) || !(NewEnemy instanceof Enemy)) throw new Error('Player and Enemy must be instances of Player and Enemy');

        this.player = NewPlayer;
        this.ennemy = NewEnemy;
        
        var playerStats = document.querySelector("div#player_Stats");
        var ennemyStats = document.querySelector("div#ennemy_Stats");
        
        if (playerStats && ennemyStats) {
            playerStats.innerHTML = "Health: " + this.player.health + " - Attack: " + this.player.attack;
            ennemyStats.innerHTML = "Health: " + this.ennemy.health + " - Attack: " + this.ennemy.attack;

            this.FightInstance = new Fight(this.player, this.ennemy);
            this.fightResult = this.FightInstance.going();
        } else {
            console.error('Player stats or enemy stats element not found.');
        }

    }
}

// Exporter la classe
export default InitializeFightingScene;
