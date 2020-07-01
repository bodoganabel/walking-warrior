class Instruction4 extends Instruction {
    constructor(game) {
        super(game)
    }

    create() {
        this.game.stage.backgroundColor = '#ccecff'

        this.game.add.tileSprite(100, 120, 1200, 1179, "instruction4")

        this.createNavButtons('Instruction3', 'Instruction5')
    }
}