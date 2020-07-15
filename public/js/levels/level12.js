
class Level12 extends TokenLevel {
    constructor(game) {
        super(game);
        this.scoreToFinish = 500;
    }

    updateObjective() {
        game.objectiveLabel.text = `Reach 500 points`;
    }
}