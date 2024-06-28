class Fight {
    constructor(player, enemy) {
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

    async makeChoice(){
        let choice = prompt("Choose your action: \n1. Attack\n2. Defend");
        return choice
    }

    refreshScene(){
        document.querySelector("div#player_Stats").textContent = `Health: ${this.player.health} - Attack: ${this.player.attack}`; 
        document.querySelector("div#ennemy_Stats").textContent = `Health: ${this.enemy.health} - Attack: ${this.enemy.attack}`;
    }

    win(){
        console.log("Enemy defeated!");

        return 1;
    }

    loose(){
        console.log("Player defeated!");

        return 0;
    }
}

export default Fight;