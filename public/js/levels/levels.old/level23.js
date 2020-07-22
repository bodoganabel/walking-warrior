
class Level23 extends TokenLevel {
    constructor(game) {
        super(game);
        this.tile1Count = 0;
        this.scoreToFinish = 1;
    }

    updateObjective() {
        game.objectiveLabel.text = 'Make 2 neighbouring bonustiles';
    }

    isCompleted() {
        const c = game.counter.get('neighbouring-bonus-count');
        return c >= this.scoreToFinish;
    }
}