class Instruction5 extends Instruction {
    constructor(game) {
        super(game)
    }

    create() {
        this.game.stage.backgroundColor = '#ccecff'

        this.game.add.tileSprite(100, 120, 1200, 1184, "instruction5")

        this.createNavButtons('Instruction4', 'Instruction6')
    }
}