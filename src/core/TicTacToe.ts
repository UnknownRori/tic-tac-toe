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
    }

    /**
     * Claim a tile using current player turn
     * @return void
     */
    public claim(index: number): void {
        if (this.tile[index] == null) {
            this.tile[index] = this.turn;
        }

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
    public winChecker(): void {
        //
    }


    private generateTile() {
        // Generate array tile to track changes
        this.tile = Array(this.mapSize * this.mapSize).fill(null);
    }
}


export default TicTacToe;