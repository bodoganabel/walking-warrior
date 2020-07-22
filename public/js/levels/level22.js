
class Level22 extends BaseLevel {
    constructor(game) {
        super(game);
        this.scoreToFinish = 400;
    }

    updateObjective() {
        game.objectiveLabel.text = 'Reach 400 points';
    }
}