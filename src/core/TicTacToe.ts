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
        const streak = {
            up: 0,
            bottom: 0,
            left: 0,
            right: 0,
            upRight: 0,
            upLeft: 0,
            bottomRight: 0,
            bottomLeft: 0,
        };

        streak.up = this.checkUp(index);
        streak.bottom = this.checkBottom(index);
        streak.right = this.checkRight(index);
        streak.left = this.checkLeft(index);
        streak.upRight = this.checkUpRight(index);
        streak.upLeft = this.checkUpLeft(index);
        streak.bottomLeft = this.checkBottomLeft(index);
        streak.bottomRight = this.checkBottomRight(index);
        console.log(this.turn, streak);

        if (this.tile.every(element => element !== null)) {
            alert('Draw!');
        }
    }

    // Vertical Checker

    private checkUp(index: number, streak = 0): number {
        if (this.tile[index] == this.turn) {
            const newIndex = this.up(index);
            streak++;
            if (typeof newIndex != 'boolean') {
                return this.checkUp(newIndex, streak);
            }
        }
        return streak;
    }

    private checkBottom(index: number, streak = 0): number {
        if (this.tile[index] == this.turn) {
            const newIndex = this.bottom(index);
            streak++;
            if (typeof newIndex != 'boolean') {
                return this.checkBottom(newIndex, streak);
            }
        }
        return streak;
    }

    // Horizontal Checker

    private checkRight(index: number, streak = 0): number {
        if (this.tile[index] == this.turn) {
            const newIndex = this.right(index);
            streak++;
            if (typeof newIndex != 'boolean') {
                return this.checkRight(newIndex, streak);
            }
        }
        return streak;
    }

    private checkLeft(index: number, streak = 0): number {
        if (this.tile[index] == this.turn) {
            const newIndex = this.left(index);
            streak++;
            if (typeof newIndex != 'boolean') {
                return this.checkLeft(newIndex, streak);
            }
        }
        return streak;
    }

    // Diagonal Checker

    private checkUpRight(index: number, streak = 0): number {
        if (this.tile[index] == this.turn) {
            const newIndex = this.upRight(index);
            streak++;
            if (typeof newIndex != 'boolean') {
                return this.checkUpRight(newIndex, streak);
            }
        }
        return streak;
    }

    private checkUpLeft(index: number, streak = 0): number {
        if (this.tile[index] == this.turn) {
            const newIndex = this.upLeft(index);
            streak++;
            if (typeof newIndex != 'boolean') {
                return this.checkUpLeft(newIndex, streak);
            }
        }
        return streak;
    }

    private checkBottomLeft(index: number, streak = 0): number {
        if (this.tile[index] == this.turn) {
            const newIndex = this.bottomLeft(index);
            streak++;
            if (typeof newIndex != 'boolean') {
                return this.checkBottomLeft(newIndex, streak);
            }
        }
        return streak;
    }

    private checkBottomRight(index: number, streak = 0): number {
        if (this.tile[index] == this.turn) {
            const newIndex = this.bottomRight(index);
            streak++;
            if (typeof newIndex != 'boolean') {
                return this.checkBottomRight(newIndex, streak);
            }
        }
        return streak;
    }

    protected up(currentIndex: number) {
        const calc = currentIndex - this.mapSize;
        if (calc > (this.mapSize * this.mapSize) || calc < 0) return false;
        return calc;
    }

    protected upRight(currentIndex: number) {
        const calc = currentIndex - (this.mapSize - 1);
        if (calc > (this.mapSize * this.mapSize) || calc < 0) return false;
        return calc;
    }

    protected right(currentIndex: number) {
        const calc = currentIndex + 1;
        if (calc > (this.mapSize * this.mapSize) || calc < 0) return false;
        return calc;
    }

    protected bottomRight(currentIndex: number) {
        const calc = currentIndex + (this.mapSize + 1);
        if (calc > (this.mapSize * this.mapSize) || calc < 0) return false;
        return calc;
    }

    protected bottom(currentIndex: number) {
        const calc = currentIndex + this.mapSize;
        if (calc > (this.mapSize * this.mapSize) || calc < 0) return false;
        return calc;
    }

    protected bottomLeft(currentIndex: number) {
        const calc = currentIndex + (this.mapSize - 1);
        if (calc > (this.mapSize * this.mapSize) || calc < 0) return false;
        return calc;
    }

    protected left(currentIndex: number) {
        const calc = currentIndex - 1;
        if (calc > (this.mapSize * this.mapSize) || calc < 0) return false;
        return calc;
    }

    protected upLeft(currentIndex: number) {
        const calc = currentIndex + (this.mapSize - 1);
        if (calc > (this.mapSize * this.mapSize) || calc < 0) return false;
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