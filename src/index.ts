import TicTacToe from "./core/TicTacToe";
import createTile from "./helpers/createTile";
import "./asset/scss/style.scss";

// Game enviroment
const gameTileID = 'gameElement';
const gameTileDataSet = 'tile';
let withAI = false;
let aiFirst = false;

const gameElement = <HTMLElement>document.querySelector('#game');
let gameTileElement = <NodeListOf<HTMLElement>>document.querySelectorAll(`#${gameTileID}`);

// Main Game UI
const mapSizeElement = <HTMLInputElement>document.querySelector('#mapSize');
const minTileElement = <HTMLInputElement>document.querySelector('#minTile');
const winStreakElement = <HTMLInputElement>document.querySelector('#winStreak');
const withAIElement = <HTMLInputElement>document.querySelector('#withAI');
const aiFirstElement = <HTMLInputElement>document.querySelector('#aiFirst');

// Main UI
const mainUIElement = <HTMLElement>document.querySelector('#ui');
const newGameMenuUIElement = <HTMLElement>document.querySelector('#new');
const resetGameMenuUIElement = <HTMLElement>document.querySelector('#reset');
const currentPlayerDisplay = <HTMLElement>document.querySelector('#currentPlayer');

// Button
const startGameButton = <HTMLButtonElement>document.querySelector('#startGame');
const resetGameButton = <HTMLButtonElement>document.querySelector('#resetGame');

const game = new TicTacToe(gameTileElement, currentPlayerDisplay);

withAIElement.addEventListener('click', () => {
    withAI = withAIElement.checked;
});

aiFirstElement.addEventListener('click', () => {
    aiFirst = aiFirstElement.checked;
});

startGameButton.addEventListener('click', () => {
    // Parse the map, min tile, min streak value.
    const mapSize = parseInt(mapSizeElement.value);
    const minTile = parseInt(minTileElement.value);
    const minStreak = parseInt(winStreakElement.value);

    // Check if the value below 2 or 1
    if (mapSize < 1 || minTile < 2 || minStreak < 1) return alert("Please enter above 1");

    // Check if the rule set by player is logical
    if (mapSize < minTile) return alert("Minimum Tile to win cannot exceed map size");

    // Check if the game setting can trigger the win condition
    const minStreakThreshold = Math.floor(((mapSize * mapSize) / 2) / minTile);
    if (minStreak > minStreakThreshold) return alert("Minimum streak cannot pass threshold");

    // Remove the event ui
    mainUIElement.classList.remove('bg-ui');
    newGameMenuUIElement.classList.add('hidden');
    resetGameMenuUIElement.classList.remove('hidden');

    // Insert the parsed value inside the game API
    game.withAI = withAI;
    game.aiFirst = aiFirst;
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
            const index = parseInt(<string>element.dataset[gameTileDataSet]);

            game.claim(index);
        });
    });
});

resetGameButton.addEventListener('click', () => {
    // Start up the event ui
    mainUIElement.classList.add('bg-ui');
    newGameMenuUIElement.classList.remove('hidden');
    resetGameMenuUIElement.classList.add('hidden');

    // Reset the game tile display
    gameElement.innerHTML = '';

    // Reset the game
    game.reset();
});