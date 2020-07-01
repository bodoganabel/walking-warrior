
class Boot extends BaseState {
    constructor(game) {
        super(game);
    }

    create() {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.add.text(300, 300, '', {font: '50px Acme'});

        this.game.state.start('Preload');
    }
}