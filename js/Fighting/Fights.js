class Fight {
    constructor(player, enemy) {
        this.player = player;
        this.enemy = enemy;
        this.round = 1;
    }

    going() {
        while (this.player.health > 0 && this.enemy.health > 0) {
            this.refreshScene();
            console.log(`Round ${round}:`);

            this.enemy.takeDamage(this.player.attack());
            if (!this.enemy.isAlive()) {
                return this.win();
            }

            this.player.damagePlayer(this.enemy.attack());
            if (!this.player.isAlive()) {
                return this.loose();
            }
            
            this.round++;
        }
    }

    refreshScene(){
        document.querySelector("#player_Stats").textContent = `Health: ${this.player.health} - Attack: ${this.player.attack}`; 
        document.querySelector("#ennemy_Stats").textContent = `Health: ${this.enemy.health} - Attack: ${this.enemy.attack}`;
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
