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
    aiFirst: boolean;
    gameTileElement: NodeListOf<HTMLElement>;
    currentPlayerDisplay: HTMLElement;

    start(gameTileElement: NodeListOf<HTMLElement>): void;
    reset(): void;
    claim(index: number): void;
    winChecker(index: number): void;
}

export default ITicTacToe;