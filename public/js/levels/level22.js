
class Level22 extends BaseLevel {
    constructor(game) {
        super(game);
        this.scoreToFinish = 125;
    }

    updateObjective() {
        game.objectiveLabel.text = 'Reach 125 points';
    }
}