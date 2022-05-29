import ITicTacToe from "../interface/ITicTacToe";
import Player from "../types/Player";

class TicTacToe implements ITicTacToe {
    // User generated rules
    public mapSize = 3;
    public minTile = 3;
    public minStreak = 3;

    public tile: Array<Player | null> = [];
    public turn: Player = "X";
    public isStarted = false;
    public withAI = false;
    public gameTileElement: NodeListOf<HTMLElement>;
    public currentPlayerDisplay: HTMLElement

    private winStreakRecord = {
        X: 0,
        O: 0
    }

    constructor(gameTileElement: NodeListOf<HTMLElement>, currentPlayerDisplay: HTMLElement) {
        this.gameTileElement = gameTileElement;
        this.currentPlayerDisplay = currentPlayerDisplay;

        this.currentPlayerDisplay.textContent = this.turn;
    }

    /**
     * Initialize the tic tac toe game
     * @return void
     */
    public start(gameTileElement: NodeListOf<HTMLElement>): void {
        this.gameTileElement = gameTileElement;
        this.generateTile();
    }

    /**
     * Reset current game enviroment
     * @return void
     */
    public reset(): void {
        this.tile = [];
        this.turn = "X";
        this.mapSize = 3;
        this.minTile = 3;
        this.minStreak = 3;
        this.winStreakRecord = {
            X: 0,
            O: 0
        }
    }

    /**
     * Claim a tile using current player turn
     * @return void
     */
    public claim(index: number): void {
        if (this.tile[index] == null) {
            this.tile[index] = this.turn;
        }

        this.winChecker(index);

        if (this.turn == "O") {
            this.turn = "X";
        } else {
            this.turn = "O";
        }

        this.currentPlayerDisplay.textContent = this.turn;
    }

    /**
     * Check the all tile for the winner
     * @return void
     */
    public winChecker(index: number): void {

        if (this.tile.every(element => element !== null)) {
            alert('Draw!');
        }
    }

    private up(currentIndex: number) {
        const calc = currentIndex - this.mapSize;
        if (calc > this.mapSize || calc < 0) return false;
        return calc;
    }

    private upRight(currentIndex: number) {
        const calc = currentIndex - (this.mapSize - 1);
        if (calc > this.mapSize || calc < 0) return false;
        return calc;
    }

    private right(currentIndex: number) {
        const calc = currentIndex + 1;
        if (calc > this.mapSize || calc < 0) return false;
        return calc;
    }

    private rightBottom(currentIndex: number) {
        const calc = currentIndex + (this.mapSize + 1);
        if (calc > this.mapSize || calc < 0) return false;
        return calc;
    }

    private bottom(currentIndex: number) {
        const calc = currentIndex + this.mapSize;
        if (calc > this.mapSize || calc < 0) return false;
        return calc;
    }

    private leftBottom(currentIndex: number) {
        const calc = currentIndex + (this.mapSize - 1);
        if (calc > this.mapSize || calc < 0) return false;
        return calc;
    }

    private left(currentIndex: number) {
        const calc = currentIndex + 1;
        if (calc > this.mapSize || calc < 0) return false;
        return calc;
    }

    private leftUp(currentIndex: number) {
        const calc = currentIndex + (this.mapSize + 1);
        if (calc > this.mapSize || calc < 0) return false;
        return calc;
    }

    /**
     * Add win streak correspond with current turn
     * @return void
     */
    private addWinStreak(): void {
        this.winStreakRecord[this.turn]++;
    }

    /**
     * Generate array tile to track some changes
     * @return void
     */
    private generateTile(): void {
        this.tile = Array(this.mapSize * this.mapSize).fill(null);
    }
}


export default TicTacToe;