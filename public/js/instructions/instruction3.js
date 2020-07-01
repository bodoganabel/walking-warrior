class Instruction3 extends Instruction {
    constructor(game) {
        super(game)
    }

    create() {
        this.game.stage.backgroundColor = '#ccecff'

        this.game.add.tileSprite(100, 120, 1200, 1179, "instruction3")

        this.createNavButtons('Instruction2', 'Instruction4')
    }
}