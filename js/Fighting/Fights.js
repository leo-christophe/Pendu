class Fight {
    constructor(player, enemy) {
        if (!(player instanceof Character)) throw new Error('Player must be an instance of Character');
        if (!(enemy instanceof Character)) throw new Error('Enemy must be an instance of Character');

        this.player = player;
        this.enemy = enemy;
        this.round = 1;
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
    async going() {
        while (this.player.health > 0 && this.enemy.health > 0) {
            
            this.refreshScene();
            console.log(`Round ${this.round}:`);

            var choice = await this.makeChoice();
            if (choice == 1){
                this.enemy.takeDamage(this.player.attack);
                if (!this.enemy.isAlive) {
                    return this.win();
                }
            }

            if (choice != 2){
                this.player.damagePlayer(this.enemy.attack);
                if (!this.player.isAlive) {
                    return this.loose();
                }
            }
            
            this.round++;
        }
    }

    /** MAKE CHOICE
     *  @summary Méthode permettant au joueur de choisir son action
     * 
     *  @returns 
     */
    async makeChoice(){
        let choice = prompt("Choose your action: \n1. Attack\n2. Defend");
        return choice
    }

    /** REFRESH SCENE
     *  @summary Méthode se déclenchant à chaque début de round pour tout rafraîchir.
     *  
     *  @throws {Error} S'il y a un problème lors du rafraîchissement
     *  @returns {void} Ne retourne rien
     */
    async refreshScene(){
        try{
            document.querySelector("div#player_Stats").textContent = `Health: ${this.player.health} - Attack: ${this.player.attack}`; 
            document.querySelector("div#ennemy_Stats").textContent = `Health: ${this.enemy.health} - Attack: ${this.enemy.attack}`;
            document.querySelector('p#Vies').textContent = this.player.health;
        } catch (e) {
            throw new Error('Problem during the refresh');
        }
    }

    /** WIN
     *  @summary Méthode se déclenchant quand le joueur gagne
     * 
     *  @returns {integer} 1 : le joueur a gagné
     */
    win(){
        console.log("Enemy defeated!");

        return 1;
    }

    /** LOOSE
     *  @summary Méthode se déclenchant quand le joueur perd
     * 
     *  @returns {integer} 0 : le joueur a perdu
     */
    loose(){
        console.log("Player defeated!");

        return 0;
    }
}

export default Fight;