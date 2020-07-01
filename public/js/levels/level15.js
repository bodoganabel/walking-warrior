
class Level15 extends TokenLevel {
    constructor(game) {
        super(game);
        this.scoreToFinish = 150;
    }

    updateObjective() {
        this.objectiveLabel.text = `Reach 150 points`;
    }
}