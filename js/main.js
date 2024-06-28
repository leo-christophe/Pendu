import InitializeFightingScene from './Fighting/InitializeFightingScene.js';
import Player from './Models/Player.js';
import Enemy from './Models/Enemy.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log("Initializing fighting game...");
    var fightingGame = new InitializeFightingScene(new Player(100, 10), new Enemy(100, 1));
});
