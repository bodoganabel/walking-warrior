
class Level19 extends TokenLevel {
    constructor(game) {
        super(game);
        this.scoreToFinish = 80;
    }

    updateObjective() {
        game.objectiveLabel.text = `Reach 80 points`;
    }
}