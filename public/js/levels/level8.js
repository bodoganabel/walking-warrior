
class Level8 extends TokenLevel {
    constructor(game) {
        super(game);
        this.tile1Count = 0;
        this.tile2Count = 0;
        this.tile3Count = 0;
        this.scoreToFinish = 20;
    }

    create() {
        super.create();

        let small1 = this.game.add.button(206, 1800, '1', null, this, 2, 1, 0);
        small1.scale.setTo(0.45, 0.45);
        let small2 = this.game.add.button(435, 1800, '2', null, this, 2, 1, 0);
        small2.scale.setTo(0.45, 0.45);
        let small3 = this.game.add.button(672, 1800, '3', null, this, 2, 1, 0);
        small3.scale.setTo(0.45, 0.45);
    }

    isCompleted() {
        const c1 = game.counter.get('1-match') + game.counter.get('7-match');
        const c2 = game.counter.get('2-match') + game.counter.get('8-match');
        const c3 = game.counter.get('3-match') + game.counter.get('9-match');
        return c1 >= this.scoreToFinish && c2 >= this.scoreToFinish && c3 >= this.scoreToFinish;
    }

    updateObjective() {
        const c1 = game.counter.get('1-match') + game.counter.get('7-match');
        const c2 = game.counter.get('2-match') + game.counter.get('8-match');
        const c3 = game.counter.get('3-match') + game.counter.get('9-match');
        game.objectiveLabel.text = `Match${(c1>9)?"":"  "}        ${c1}/20${(c2>9)?"":"  "}        ${c2}/20${(c1>9)?"":"  "}        ${c3}/20`;
    }

}