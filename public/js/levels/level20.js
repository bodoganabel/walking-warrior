
class Level20 extends TokenLevel {
    constructor(game) {
        super(game);
        this.scoreToFinish = 5;
        this.tile1Count = 0;
    }

    // getMatches(col, row) {
    //     let lortMatches = this.getLortMatches(col, row);
    //     let matches = super.getMatches(col, row);

    //     return matches.concat(lortMatches);
    // }

    isCompleted() {
        const c = game.counter.get('L-shape') + game.counter.get('T-shape');
        return c >= this.scoreToFinish;
    }

    updateObjective() {
        const c = game.counter.get('L-shape') + game.counter.get('T-shape');
        game.objectiveLabel.text = `Make 5 L or T shapes. 5/${c}`;
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
    //             }

    //             for (let i = 0; i < match.length; i++) {
    //                 if (match[i].tShape == true || match[i].lShape == true) {
    //                     lortTileCount++;
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