
class Menu extends BaseState {
    constructor(game) {
        super(game);
    }

    create() {
        super.create();

        //musicPlayer.playAudio('main');
        if (game.menuMusic == null) {
            game.menuMusic = new Phaser.Sound(game, 'mainMusic', 1, true);
        }
        if (game.levelMusic!= null && game.levelMusic.isPlaying) {
            game.levelMusic.stop();
        }
        if (game.menuMusic!= null && game.menuMusic.isPlaying) {
            game.menuMusic.stop();
        }
        game.menuMusic.play();

        let tBuilder = new TextBuilder(this.game, null);

        //szövegek
        tBuilder.setTextStyle({ font: "180px Acme", fill: "#ffc61e", align: "center" });
        tBuilder.writeLineToPos(50, 50, "Walking Warrior");

        tBuilder.setTextStyle({ font: "70px Acme", fill: "#ffc61e" });
        tBuilder.writeLineToPos(40, 1820, WW.gameVersion);
        tBuilder.writeLineToPos(1000, 1820, WW.updateDate);

        //Gombok felvétele
        let button = this.game.add.button(80, 400, 'playbutton', () => { this.startGame() }, this, 2, 1, 0);
        button.scale.setTo(1.2, 1.2);

        let infobutton = this.game.add.button(700, 400, 'infobutton', function () {
            this.game.state.start("Instruction1");
        }, this, 2, 1, 0);
        infobutton.scale.setTo(1.2, 1.2);

        let selectbutton = this.game.add.button(70, 1100, 'selectbutton', function () {
            this.game.state.start("Levels");
        }, this, 2, 1, 0);
        selectbutton.scale.setTo(1.2, 1.2);


        let stepbutton = this.game.add.button(900, 1200, 'step', function () {
            this.game.state.start("Counter");
        }, this, 2, 1, 0)
        stepbutton.scale.setTo(0.6, 0.6);

        let reportbutton = this.game.add.button(280, 1820, 'bug_reporting', function () {
            window.open(WW.bugReportUrl, '_blank');
        }, this, 2, 1, 0)
    }

    startGame() {
        this.ajaxPost('ajax.php', { action: 'getSavedGameState' })
            .then(data => {
                try {
                    let save = JSON.parse(data.data);
                    this.game.state.start(save.level, true, false, save);
                    console.log("got data from server: ")
                    console.log(data)
                } catch (e) {
                    console.log('did not got data from server, starting lv 1')
                    this.game.state.start('Level1', true, false);
                }
            })
            .catch(error => {
                alert(error);
            })
    }
}
