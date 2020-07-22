
class Level21 extends TokenLevel {
    constructor(game) {
        super(game);
        this.scoreToFinish = 100;
    }

    updateObjective() {
        game.objectiveLabel.text = `Reach 100 points`;
    }
}