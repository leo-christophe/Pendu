class Player {
    constructor(health, attack, spritePath='../../assets/sprites/player.png') {
        // Vérification des paramètres
        if (health === undefined || attack === undefined) throw new Error('You must provide a health and an attack value to create a player')
        if (typeof health !== 'number' || typeof attack !== 'number') throw new Error('Health and attack must be numbers')
        if (health <= 0 || attack <= 0) throw new Error('Health and attack must be greater than 0')

        this.health = health;
        this.attack = attack;

        this.updateScore();

        this.critChance = 0.5;
        this.maxCritMultiplier = 2;

        this.imgSpritePath = spritePath;

        this._score = 0;
    }
    
    get score() {
        return this._score;
    }

    set score(value) {
        if (typeof value !== 'number') throw new Error('Score must be a number');
        if (value < 0) throw new Error('Score must be greater than or equal to 0');

        document.cookie = `combattendu=${value}; ${document.cookie.split('; ').filter(row => !row.startsWith('combattendu=')).join('; ')}`;
        this.updateScore()

        this._score = value;
    }

    get isAlive(){
        return this.health > 0;
    }

    /** UPDATE SCORE
     *  @summary Met à jour le score du joueur avec la valeur stockée dans les cookies
     */
    async updateScore() {
        this.score = parseInt(document.cookie.split('; ').find(row => row.startsWith('combattendu=')).split('=')[1]);
        document.querySelector("p#score").textContent = `Score: ${this.score}`;
    }

    /** DAMAGE PLAYER
     * @summary Permet de retirer des points de vie au joueur
     * 
     * @param {number} damagePoints Nombre de points de vie à retirer
     * @returns {void}
     */
    damagePlayer(damagePoints){
        if (typeof damagePoints !== 'number') throw new Error('Damage points must be a number');
        if (damagePoints <= 0) throw new Error('Damage points must be greater than 0');

        this.health -= damagePoints;
    }

    /** BUFF PLAYER
     *  @summary Permet d'augmenter l'attaque du joueur
     * 
     *  @param {number} buffPoints Nombre de points d'attaque à ajouter
     *  @returns {void}
     */
    buffPlayer(buffPoints){
        if (typeof buffPoints !== 'number') throw new Error('Buff points must be a number');
        if (buffPoints <= 0) throw new Error('Buff points must be greater than 0');

        this.attack += buffPoints;
    }

        /** DEBUFF PLAYER
     *  @summary Permet de diminuer l'attaque du joueur. Si l'attaque diminue à 0 ou moins, elle est remise à 1.
     * 
     *  @param {number} debuffPoints Nombre de points d'attaque à enlever
     *  @returns {void}
     */
    debuffPlayer(debuffPoints){
        if (typeof debuffPoints !== 'number') throw new Error('Debuff points must be a number');
        if (debuffPoints <= 0) throw new Error('Debuff points must be greater than 0');


        this.attack -= debuffPoints;
        if (this.attack <= 0) this.attack = 1;
    }

    /** HEAL PLAYER
     *  @summary Permet de soigner le joueur 
     * 
     *  @param {*} healPoints 
     */
    async healPlayer(healPoints){
        if (typeof healPoints !== 'number') throw new Error('Heal points must be a number');
        if (healPoints <= 0) throw new Error('Heal points must be greater than 0');
        if (healPoints > 100) throw new Error('Heal points must be less than 100');

        if (this.health + healPoints > 100) return this.health = 100;
        if (this.health + healPoints < 0) return this.health = 0;

        this.health += healPoints;
    }

    /** PLAYER MAKE ATTACK
     *  @summary Permet de calculer les dégats causés par le joueur en ajoutant un multiplicateur aléatoire.
     * 
     *  @returns {number} Retourne les dégats causés par le joueur
     */
    playerMakeAttack(){
        if (this.critChance <= 0) this.critChance = 1;
        return this.attack * (Math.random() < this.critChance ? 1.5 : this.maxCritMultiplier);
    }
}

export default Player;