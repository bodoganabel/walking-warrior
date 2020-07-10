
class Level22 extends TokenLevel {
    constructor(game) {
        super(game);
        this.tile1Count = 0; //five in a row count
        this.scoreToFinish = 2;
    }

    isCompleted() {
        const c = game.counter.get('5-in-a-row');
        return c >= this.scoreToFinish;
    }

    updateObjective() {
        const c = game.counter.get('5-in-a-row');
        this.objectiveLabel.text = `Make 2 5-in-a-row ${c}/2`;
    }

    // removeMatches(matchGroups) {
    //     if (matchGroups.length < 1) return;

    //     for (let group of matchGroups) {

    //         for (let match of group) {
    //             let bonusType = 0;
    //             if (match.length >= 4) {
    //                 if (this.isBonusTile(match[0])) {
    //                     bonusType = match[0].tileType;
    //                 } else if (this.isDefaultTile(match[0])) {
    //                     bonusType = match[0].tileType + 6;
    //                 }

    //                 this.incrementScore(2);
    //             } else {
    //                 this.incrementScore();
    //             }

    //             if (match.length >= 5) {
    //                 this.tile1Count++;
    //             }

    //             for (let i = 0; i < match.length; i++) {
    //                 let pos = this.getTilePos(match[i]);
    //                 this.removeTile(match[i]);
    //                 let newTile = null;
    //                 if (i == 0) {
    //                     newTile = this.addTile(pos.x, pos.y, bonusType);
    //                 } else {
    //                     newTile = this.addTile(pos.x, pos.y, 0);
    //                 }
    //                 game.tileGrid[pos.x][pos.y] = newTile;
    //             }
    //         }
    //     }

    //     this.updateObjective();

    //     //miutan beraktuk az eltávolítottak helyere az uj tile-okat, megnézzük, hogy lett-e így új match
    //     let me = this;
    //     this.game.time.events.add(500, () => {
    //         me.checkMatch();
    //     });
    // }
}