class Instruction extends Phaser.State {
    constructor(game) {
        super(game)
        this.game = game
        this.bBuilder = new ButtonBuilder(this.game, null)
    }

    createNavButtons(backButtonState, nextButtonState) {
        this.bBuilder.createButton(50, 1750, 'backbutton', function() {
            this.game.state.start(backButtonState)
        })

        this.bBuilder.createButton(550, 1750, 'nextbutton', function() {
            this.game.state.start(nextButtonState)
        })

        this.bBuilder.createButton(1180, 1750, 'homebutton', function() {
            this.game.state.start("Menu")
        })
    }
}