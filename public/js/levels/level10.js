
class Level10 extends TokenLevel {
    constructor(game) {
        super(game);
        this.scoreToFinish = 300;
    }

    updateObjective() {
        game.objectiveLabel.text = `Reach 300 points`;
    }
}