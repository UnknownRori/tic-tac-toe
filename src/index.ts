import TicTacToe from "./core/TicTacToe";
import "./asset/scss/style.scss";
import createTile from "./helpers/createTile";

// Game enviroment
const gameTileID = 'gameElement';
const gameTileDataSet = 'tile';

const gameElement = <HTMLElement>document.querySelector('#game');
let gameTileElement = document.querySelectorAll(`#${gameTileID}`) as NodeListOf<HTMLElement>;

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

const game = new TicTacToe(gameTileElement);

startGameButton.addEventListener('click', () => {
    // Parse the map, min tile, min streak value.
    const mapSize = parseInt(mapSizeElement.value);
    const minTile = parseInt(minTileElement.value);
    const minStreak = parseInt(winStreakElement.value);

    // Check if the value below 2 or 1
    if (mapSize < 1 || minTile < 2 || minStreak < 1) {
        alert("Please enter above 1");
        return;
    }

    // Remove the event ui
    mainUIElement.classList.remove('bg-ui');
    newGameMenuUIElement.classList.add('hidden');
    resetGameMenuUIElement.classList.remove('hidden');

    // Insert the parsed value inside the game API
    game.mapSize = mapSize;
    game.minTile = minTile;
    game.minStreak = minStreak;

    // Create the tile and put it in variable
    createTile(mapSize, gameElement, gameTileID, gameTileDataSet);
    gameTileElement = document.querySelectorAll(`#${gameTileID}`) as NodeListOf<HTMLElement>;

    // Start the game and init the event listener
    game.start(gameTileElement);
    gameTileElement.forEach((element) => {
        element.addEventListener('click', () => {
            const index = parseInt(<string>element.dataset[gameTileDataSet])

            if (element.innerText == '') {
                element.innerText = game.turn;

                game.claim(index);
            }
        })
    })
});

resetGameButton.addEventListener('click', () => {
    // Start up the event ui
    mainUIElement.classList.add('bg-ui');
    newGameMenuUIElement.classList.remove('hidden');
    resetGameMenuUIElement.classList.add('hidden');
    gameElement.innerHTML = '';

    // Reset the game
    game.reset();
});