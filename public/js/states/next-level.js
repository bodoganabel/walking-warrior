
class NextLevel extends BaseState {
    constructor(game) {
        super(game);
        this.nextLevel = null;
    }

    init(nextLevel) {
        this.nextLevel = nextLevel;

        this.ajaxPost('ajax.php', { action: 'updateLevel', level: nextLevel });
    }

    create() {
        super.create();
    
        this.game.add.text(340, 330, 'Congratulations!', {
            font: '90px Acme',
            fill: '#FCB514',
        })


        this.game.add.text(70, 650, `You have completed this level. Let's get to level ${this.nextLevel}!`, {
            font: '55px Acme',
            fill: '#FCB514',
        })
        
        
		let button = this.game.add.button(460, 800, 'playbutton', this.startNextLevel, this, 2, 1, 0);
		button.scale.setTo(0.91, 0.91);
    }

    startNextLevel() {
        this.game.state.start('Level' + this.nextLevel, true, false);
    }
}