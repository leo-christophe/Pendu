import Player from '../Models/Player.js';
import Enemy from '../Models/Enemy.js';

class Fight {
    constructor(player, enemy) {
        if (!(player instanceof Player)) throw new Error('Player must be an instance of Character');
        if (!(enemy instanceof Enemy)) throw new Error('Enemy must be an instance of Character');

        this.player = player;
        this.enemy = enemy;
        this.round = 1;
        this.chrono = 0;
    }

    get round() {
        return this._round;
    }

    set round(value) {
        if (typeof value !== 'number') throw new Error('Round must be a number');
        if (value < 1) throw new Error('Round must be greater than or equal to 1');
        document.querySelector("#roundNumber").textContent = `${value}`;
        this._round = value;
    }

    /**
     *  Méthode asynchrone callback permettant de réaliser le combat à tour par tour
     *  @returns 1 si le joueur gagne, 0 si le joueur perd
     */
    async going(timing = 300) {
        while (this.player.health > 0 && this.enemy.health > 0) {
            var e = this.refreshScene();
            console.log(`Round ${this.round}:`);

            this.enemy.takeDamage(this.player.playerMakeAttack());
            await new Promise(resolve => setTimeout(resolve, timing));
            if (!this.enemy.isAlive) {
                this.player.score = this.player.score + 1;
                await this.win();
                break;
            }

            this.player.damagePlayer(this.enemy.attack);
            await new Promise(resolve => setTimeout(resolve, timing));
            if (!this.player.isAlive) {
                await this.loose();
                break;
            }

            this.round++;
            
        }
    }

    /** REFRESH SCENE
     *  @summary Méthode se déclenchant à chaque début de round pour tout rafraîchir.
     *  
     *  @throws {Error} S'il y a un problème lors du rafraîchissement
     *  @returns {void} Ne retourne rien
     */
    async refreshScene() {
        document.querySelector("div#player_Stats").textContent = `Health: ${this.player.health} - Attack: ${this.player.attack}`;
        document.querySelector("div#ennemy_Stats").textContent = `Health: ${this.enemy.health} - Attack: ${this.enemy.attack}`;
        return await new Promise(resolve => setTimeout(resolve, this.timing));
    }

    /** WIN
     *  @summary Méthode se déclenchant quand le joueur gagne
     * 
     *  @returns {integer} 1 : le joueur a gagné
     */
    async win() {
        console.log("Enemy defeated!");

        await new Promise(resolve => setTimeout(resolve, 10000));
        window.location.pathname = "./Pages/game.html";

        return 1;
    }

    /** LOOSE
     *  @summary Méthode se déclenchant quand le joueur perd
     * 
     *  @returns {integer} 0 : le joueur a perdu
     */
    async loose() {
        console.log("Player defeated!");

        await new Promise(resolve => setTimeout(resolve, 10000));
        window.location.pathname = "./Pages/game.html";

        return 0;
    }
}

export default Fight;
