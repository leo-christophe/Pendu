import Player from '../Models/Player.js';
import Enemy from '../Models/Enemy.js';
import Fight from './Fights.js';

var globalPlayer = new Player(100, 10);
var globalEnemy = new Enemy(100, 1);

// Créer une classe pour la scène de combat
class InitializeFightingScene {
    constructor(NewPlayer, NewEnemy) {
        if (NewPlayer === undefined || NewEnemy === undefined) throw new Error('You must provide a player and an enemy to start a fight');
        if (!(NewPlayer instanceof Player) || !(NewEnemy instanceof Enemy)) throw new Error('Player and Enemy must be instances of Player and Enemy');

        this.player = NewPlayer;
        this.ennemy = NewEnemy;

        globalPlayer = this.player;
        globalEnemy = this.ennemy;
        
        console.log("Constructor executed. Player and Enemy set.");


        console.log("DOM fully loaded and parsed.");

        var playerStats = document.querySelector("div#player_Stats");
        var ennemyStats = document.querySelector("div#ennemy_Stats");
        
        console.log(playerStats, ennemyStats)
        if (playerStats && ennemyStats) {
            console.log("Player stats and enemy stats elements found.");

            console.log("Health: " + this.player.health + " - Attack: " + this.player.attack);

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
