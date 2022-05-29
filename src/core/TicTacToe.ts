import ITicTacToe from "../interface/ITicTacToe";
import Player from "../types/Player";

class TicTacToe implements ITicTacToe {
    // User generated rules
    public mapSize: number = 3;
    public minTile: number = 3;
    public minStreak: number = 3;

    public tile: Array<Player | null> = [];
    public turn: Player = "Player 1";
    public isStarted: boolean = false;
    public withAI: boolean = false;

    /**
     * Initialize the tic tac toe game
     * @return void
     */
    public start(): void {
        //
    }

    /**
     * Reset current game enviroment
     * @return void
     */
    public reset(): void {
        //
    }

    /**
     * Claim a tile using current player turn
     * @return void
     */
    public claim(): void {
        //
    }

    /**
     * Check the all tile for the winner
     * @return void
     */
    public winChecker(): void {
        //
    }
}


export default TicTacToe;