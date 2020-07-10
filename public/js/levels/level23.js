
class Level23 extends TokenLevel {
    constructor(game) {
        super(game);
        this.tile1Count = 0;
        this.scoreToFinish = 1;
    }

    updateObjective() {
        this.objectiveLabel.text = 'Make 2 neighbouring bonustiles';
    }

    isCompleted() {
        const c = game.counter.get('neighbouring-bonus-count');
        return c == this.scoreToFinish;
    }

    hasNeighbouringBonusTile(tile) {
        let pos = this.getTilePos(tile);
        let rightNeighbour = game.tileGrid[pos.x + 1][pos.y];
        let bottomNeighbour = game.tileGrid[pos.x][pos.y + 1];

        let c1 = this.isBonusTile(tile);
        let c2 = rightNeighbour && this.isBonusTile(rightNeighbour);
        let c3 = bottomNeighbour && this.isBonusTile(bottomNeighbour);

        return c1 && (c2 || c3);
    }

    //override
    checkMatch() {
        for (let i = 0; i < this.gridSize.w - 1; ++i) {
            for (let j = 0; j < this.gridSize.h - 1; ++j) {
                if (this.hasNeighbouringBonusTile(game.tileGrid[i][j])) {
                    game.counter.increment('neighbouring-bonus-count');
                    return;
                }
            }
        }

        return super.checkMatch();
    }
}