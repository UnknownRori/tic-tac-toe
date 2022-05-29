import TicTacToe from "./core/TicTacToe";
import "./asset/scss/style.scss";

const game = new TicTacToe();

// Main Game UI
const mapSizeElement = <HTMLInputElement>document.querySelector('#mapSize');
const minTileElement = <HTMLInputElement>document.querySelector('#minTile');
const winStreakElement = <HTMLInputElement>document.querySelector('#winStreak');

// Main UI
const mainUIElement = <HTMLElement>document.querySelector('#ui');
const newGameMenuUIElement = <HTMLElement>document.querySelector('#new');
const resetGameMenuUIElement = <HTMLElement>document.querySelector('#reset');

// Button
const startGameButton = <HTMLButtonElement>document.querySelector('#startGame');
const resetGameButton = <HTMLButtonElement>document.querySelector('#resetGame');

startGameButton.addEventListener('click', () => {
    const mapSize = parseInt(mapSizeElement.value);
    const minTile = parseInt(minTileElement.value);
    const minStreak = parseInt(winStreakElement.value);

    if (mapSize < 1 || minTile < 2 || minStreak < 1) {
        alert("Please enter above 1");
        return;
    }

    mainUIElement.classList.remove('bg-ui');
    newGameMenuUIElement.classList.add('hidden');
    resetGameMenuUIElement.classList.remove('hidden');

    game.mapSize = mapSize;
    game.minTile = minTile;
    game.minStreak = minStreak;

    game.start();
});

resetGameButton.addEventListener('click', () => {
    mainUIElement.classList.add('bg-ui');
    newGameMenuUIElement.classList.remove('hidden');
    resetGameMenuUIElement.classList.add('hidden');

    game.reset();
});
