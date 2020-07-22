

class Level6 extends TokenLevel { 
    constructor(game) {
        super(game);
        this.tile1Count = 0;
        this.tile2Count = 0;
        this.tile3Count = 0;
        this.scoreToFinish = 20;
    }

    create() {
        super.create();

        let small1 = this.game.add.button(200, 1800, '1', null, this, 2, 1, 0);
        small1.scale.setTo(0.45, 0.45);
        let small2 = this.game.add.button(440, 1800, '4', null, this, 2, 1, 0);
        small2.scale.setTo(0.45, 0.45);
        let small3 = this.game.add.button(680, 1800, '5', null, this, 2, 1, 0);
        small3.scale.setTo(0.45, 0.45);
    }

    isCompleted() {
        const c1 = game.counter.get('1-match') + game.counter.get('7-match');
        const c2 = game.counter.get('4-match') + game.counter.get('10-match');
        const c3 = game.counter.get('5-match') + game.counter.get('11-match');
        return c1 >= this.scoreToFinish && c2 >= this.scoreToFinish && c3 >= this.scoreToFinish;
    }

    updateObjective() {
        const c1 = game.counter.get('1-match') + game.counter.get('7-match');
        const c2 = game.counter.get('4-match') + game.counter.get('10-match');
        const c3 = game.counter.get('5-match') + game.counter.get('11-match');
        game.objectiveLabel.text = `Match${(c1>9)?"":"  "}        ${c1}/20${(c2>9)?"":"  "}        ${c2}/20${(c3>9)?"":"  "}        ${c3}/20`;
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
    //             if (match[0].tileType == 1 || match[0].tileType == 7) {
    //                 this.tile1Count += match.length;
    //             } else if(match[0].tileType == 4 || match[0].tileType == 10) {
    //                 this.tile2Count += match.length;
    //             } else if (match[0].tileType == 5 || match[0].tileType == 11) {
    //                 this.tile3Count += match.length;
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