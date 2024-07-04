/**
 * Classe représentant un ennemi.
 */
class Enemy {
    /**
     * Crée une instance d'ennemi.
     * @param {number} health - La santé de l'ennemi.
     * @param {number} attack - L'attaque de l'ennemi.
     * @param {string} sprite - Le sprite de l'ennemi.
     */
    constructor(health, attack, sprite="../../assets/sprites/enemy.png") {
        this.health = health;
        this.attack = attack;
        this.sprite = sprite;
    }

    /**
     * Getter for the health property.
     * @returns {number} The health of the enemy.
     */
    get health() {
        return this._health;
    }

    /**
     * Setter for the health property.
     * @param {number} value - The new health value.
     */
    set health(value) {
        if (typeof value !== 'number') throw new Error('Health must be a number');
        if (value < 0) throw new Error('Health must be greater than or equal to 0');
        this._health = value;
    }

    /**
     * Getter for the attack property.
     * @returns {number} The attack of the enemy.
     */
    get attack() {
        return this._attack;
    }

    /**
     * Setter for the attack property.
     * @param {number} value - The new attack value.
     */
    set attack(value) {
        if (typeof value !== 'number') throw new Error('Attack must be a number');
        if (value < 0) throw new Error('Attack must be greater than or equal to 0');
        this._attack = value;
    }

    /**
     * Getter for the sprite property.
     * @returns {string} The sprite of the enemy.
     */
    get sprite() {
        return this._sprite;
    }

    /**
     * Setter for the sprite property.
     * @param {string} value - The new sprite value.
     */
    set sprite(value) {
        if (typeof value !== 'string') throw new Error('Sprite must be a string');
        this._sprite = value;
    }

    /**
     * Property indicating whether the enemy is alive or not.
     * @returns {boolean} True if the enemy is alive, false otherwise.
     */
    get isAlive() {
        return this.health > 0;
    }

    /**
     * Méthode pour effectuer une attaque.
     * 
     * @returns {number} Nombre de points d'attaques affligés
     */
    attack(weakness=0) {
        if (typeof weakness !== 'number') throw new Error('Weakness must be a number');
        if (weakness < 0) throw new Error('Weakness must be greater than or equal to 0');
        
        return this.attack - weakness;
    }

    /**
     * Méthode pour infliger des dégâts à l'ennemi.
     * @param {number} damage - Les dégâts infligés.
     */
    async takeDamage(damage) {
        if (damage <= 0) throw new Error('Damage points must be greater than 0');
        if (typeof damage !== 'number') throw new Error('Damage points must be a number');

        if (this.health -= damage <= 0) {
            this.health = 0;
        } else {
            this.health -= damage;
        }
    }
}

export default Enemy;