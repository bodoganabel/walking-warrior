
class Level2 extends BaseLevel {
    constructor(game) {
        super(game);
        this.tile1Count = 0;
        this.scoreToFinish = 3;
    }

    // getMatches(col, row) {
    //     let lortMatches = this.getLortMatches(col, row);
    //     let matches = super.getMatches(col, row);

    //     return matches.concat(lortMatches);
    // }

    isCompleted() {
        return this.counter.get('L-shape') + this.counter.get('T-shape') >= this.scoreToFinish;
    }

    updateObjective() {
        const count = this.counter.get('L-shape') + this.counter.get('T-shape');
        this.objectiveLabel.text = `Make 3 L or T shapes. 3/${count}`;
    }

    // removeMatches(matchGroups) {
    //     if (matchGroups.length < 1) return;

    //     let lortTileCount = 0;

    //     for (let group of matchGroups) {

    //         for (let match of group) {
    //             let bonusType = 0;
    //             if (match[0].lShape == true) {
    //                 bonusType = 'magnesium';
    //             } else if (match[0].tShape == true) {
    //                 bonusType = 'potassium';
    //             } else if (match.length >= 4) {
    //                 if (this.isBonusTile(match[0])) {
    //                     bonusType = match[0].tileType;
    //                 } else if (this.isDefaultTile(match[0])) {
    //                     bonusType = match[0].tileType + 6;
    //                 }
    //                 this.incrementScore(2);
    //             } else {
    //                 this.incrementScore();
    //             }

    //             let hasBonusTile = false;
    //             for (let i = 0; i < match.length; i++) {
    //                 if (match[i].tShape == true || match[i].lShape == true) {
    //                     lortTileCount++;
    //                 }

    //                 //nézzük, hogy van-e bonus tile a matchben, mert akkor +1 pont és +1 move
    //                 if (this.isBonusTile(match[i])) {
    //                     hasBonusTile = true;
    //                 }

    //                 let pos = this.getTilePos(match[i]);
    //                 this.removeTile(match[i]);
    //                 let newTile = null;
    //                 if (i == 3) {
    //                     newTile = this.addTile(pos.x, pos.y, bonusType);
    //                 } else {
    //                     newTile = this.addTile(pos.x, pos.y, 0);
    //                 }
    //                 game.tileGrid[pos.x][pos.y] = newTile;
    //             }

    //             if (hasBonusTile) {
    //                 this.incrementScore();
    //                 this.incremenentMoves(2);
    //             }
    //         }
    //     }

    //     this.tile1Count += lortTileCount / 5;
    //     this.updateObjective();

    //     //miutan beraktuk az eltávolítottak helyere az uj tile-okat, megnézzük, hogy lett-e így új match
    //     let me = this;
    //     this.game.time.events.add(500, () => {
    //         me.checkMatch();
    //     });
    // }
}