class Instruction7 extends Instruction {
    constructor(game) {
        super(game)
    }

    create() {
        this.game.stage.backgroundColor = '#ccecff'

        this.game.add.tileSprite(100, 120, 1200, 1185, "instruction7")

        this.createNavButtons('Instruction6', 'Instruction8')
    }
}