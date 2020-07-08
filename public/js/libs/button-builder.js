class ButtonBuilder {
    constructor(phaser, context) {
        this.phaser = phaser
        this.context = context
    }

    createLevelButton(posX, posY, key, levelName) {
        //game.add.button(100, 560, '1button', actionOnClick4, this, 2, 1, 0);
        this.phaser.add.button(posX, posY, key, function(){
            this.game.state.start(levelName, true, false)
        }, this.context)
    }

    createButton(posX, posY, key, callback) {
        return this.phaser.add.button(posX, posY, key, callback, this.context)
    }
}
