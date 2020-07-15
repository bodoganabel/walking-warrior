
class Level5 extends TokenLevel {
    constructor(game) {
        super(game);
        this.scoreToFinish = 20;
        this.tile1Count = 0;
        this.tile2Count = 0;
    }

    create() {
        super.create();

        let matchIcon1 = this.game.add.button(250, 1800, '5', null, this, 2, 1, 0);
        matchIcon1.scale.setTo(0.45, 0.45);
        let matchIcon2 = this.game.add.button(580, 1800, '6', null, this, 2, 1, 0);
        matchIcon2.scale.setTo(0.45, 0.45);
    }

    isCompleted() {
        const c1 = game.counter.get('5-match') + game.counter.get('11-match');
        const c2 = game.counter.get('6-match') + game.counter.get('12-match');
        return c1 >= this.scoreToFinish && c2 >= this.scoreToFinish;
    }

    updateObjective() {
        const c1 = game.counter.get('5-match') + game.counter.get('11-match');
        const c2 = game.counter.get('6-match') + game.counter.get('12-match');
        game.objectiveLabel.text = `Match                ${c1}/20                  ${c2}/20`;
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

    //             //fehér és vörös vérsejteket kell matchelni (de abba beleszemit azoknak a bonus tilejuk is)
    //             if (match[0].tileType == 5 || match[0].tileType == 11) {
    //                 this.tile1Count += match.length;
    //             } else if(match[0].tileType == 6 || match[0].tileType == 12) {
    //                 this.tile2Count += match.length;
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