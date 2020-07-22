
class Level23 extends TokenLevel {
    constructor(game) {
        super(game);
        this.scoreToFinish = 150;
    }

    updateObjective() {
        game.objectiveLabel.text = `Reach 150 points`;
    }
}