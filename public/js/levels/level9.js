
class Level9 extends TokenLevel {
    constructor(game) {
        super(game);
        this.tile1Count = 0;
        this.scoreToFinish = 30;
    }

    create() {
        super.create();

        let smallred = this.game.add.button(240, 1800, '4', null, this, 2, 1, 0);
        smallred.scale.setTo(0.45, 0.45);
    }

    isCompleted() {
        const c = this.counter.get('4-match') + this.counter.get('10-match');
        return c >= this.scoreToFinish;
    }

    updateObjective() {
        const c = this.counter.get('4-match') + this.counter.get('10-match');
        this.objectiveLabel.text = `Match               ${c}/30`;
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

    //                 this.incrementScore(5);
    //             } else {
    //                 this.incrementScore();
    //             }

    //             //ezeket a tile típusokat kell matchelni
    //             if (match[0].tileType == 4 || match[0].tileType == 10) {
    //                 this.tile1Count += match.length;
    //             }


    //             let hasBonusTile = false;
    //             for (let i = 0; i < match.length; i++) {
    //                 //nézzük, hogy van-e bonus tile a matchben, mert akkor +1 pont és +1 move
    //                 if (this.isBonusTile(match[i])) {
    //                     hasBonusTile = true;
    //                 }

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

    //             if (hasBonusTile) {
    //                 this.incrementScore();
    //                 this.incremenentMoves(2);
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