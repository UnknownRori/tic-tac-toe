import Player from "../types/Player";

interface ITicTacToe {
    // User generated rules
    mapSize: number;
    minTile: number;
    minStreak: number

    // Game generated properties
    tile: Array<Player | null>;
    turn: Player;
    isStarted: boolean;
    withAI: boolean;

    start(): void;
    reset(): void;
    claim(): void;
    winChecker(): void;
}

export default ITicTacToe;