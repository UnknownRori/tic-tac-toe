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
    public aiFirst: boolean = false;
    public gameTileElement: NodeListOf<HTMLElement>;
    public currentPlayerDisplay: HTMLElement;
    private isAITurn: boolean = false;

    private winStreakRecord = {
        X: 0,
        O: 0
    };

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
        this.tile = [];
        this.gameTileElement = gameTileElement;
        this.isStarted = true;
        this.generateTile();
        if (this.withAI && this.aiFirst) {
            this.isAITurn = true;
            this.claim(2);
        }
    }

    /**
     * Reset current game enviroment
     * @return void
     */
    public reset(): void {
        this.isStarted = false;
        this.turn = "X";
        this.mapSize = 3;
        this.minTile = 3;
        this.minStreak = 3;
        this.winStreakRecord = {
            X: 0,
            O: 0
        };
    }

    /**
     * Claim a tile using current player turn
     * @return void
     */
    public claim(index: number): void {
        if (this.tile[index] == null) {
            this.tile[index] = this.turn;
            this.winChecker(index);

            this.isAITurn = !this.isAITurn;

            if (this.turn == "O") {
                this.turn = "X";
            } else {
                this.turn = "O";
            }

            this.currentPlayerDisplay.textContent = this.turn;
            this.gameTileElement.forEach((tile, index) => {
                tile.textContent = this.tile[index];
            });

            if (this.withAI && this.isAITurn) {
                this.claim(4);
            }
        }
    }

    /**
     * Check the all tile for the winner
     * @return void
     */
    public winChecker(index: number): void {
        if (this.isStarted == false) return;

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

        Object.values(streak).forEach((val) => {
            if (val == this.minTile) this.addWinStreak();
        });

        if (this.winStreakRecord[this.turn] == this.minStreak) {
            alert(`Player ${this.turn} WIN!`);
            this.reset();
        }

        if (this.isStarted) {
            if (this.tile.every(element => element !== null)) {
                alert('Draw!');
            }
        }
    }

    // Vertical Checker

    private checkUp(index: number, streak = 0): number {
        if (this.tile[index] == this.turn) {
            const newIndex = this.up(index);
            streak++;
            if (streak == this.minTile) return streak;
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
            if (streak == this.minTile) return streak;
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
            if (streak == this.minTile) return streak;
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
            if (streak == this.minTile) return streak;
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
            if (streak == this.minTile) return streak;
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
            if (streak == this.minTile) return streak;
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
            if (streak == this.minTile) return streak;
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
            if (streak == this.minTile) return streak;
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
        if (!((currentIndex + 1) % this.mapSize)) return false;
        const calc = currentIndex - (this.mapSize - 1);
        if (calc > (this.mapSize * this.mapSize) || calc < 0) return false;
        return calc;
    }

    protected right(currentIndex: number) {
        if (!((currentIndex + 1) % this.mapSize)) return false;
        const calc = currentIndex + 1;
        if (calc > (this.mapSize * this.mapSize) || calc < 0) return false;
        return calc;
    }

    protected bottomRight(currentIndex: number) {
        if (!((currentIndex + 1) % this.mapSize)) return false;
        const calc = currentIndex + (this.mapSize + 1);
        if (calc > (this.mapSize * this.mapSize) || calc < 0) return false;
        console.log(calc);
        return calc;
    }

    protected bottom(currentIndex: number) {
        const calc = currentIndex + this.mapSize;
        if (calc > (this.mapSize * this.mapSize - 1) || calc < 0) return false;
        return calc;
    }

    protected bottomLeft(currentIndex: number) {
        if (!(currentIndex % this.mapSize)) return false;
        const calc = currentIndex + (this.mapSize - 1);
        if ((calc + 1) > (this.mapSize * this.mapSize) || calc < 0) return false;
        return calc;
    }

    protected left(currentIndex: number) {
        if (!(currentIndex % this.mapSize)) return false;
        const calc = currentIndex - 1;
        if (calc > (this.mapSize * this.mapSize) || calc < 0) return false;
        return calc;
    }

    protected upLeft(currentIndex: number) {
        if (!(currentIndex % this.mapSize)) return false;
        const calc = currentIndex - (this.mapSize + 1);
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