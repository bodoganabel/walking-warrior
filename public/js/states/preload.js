
class Preload extends BaseState {
    constructor(game) {
        super(game);
    }

    preload() {
        this.game.load.image('1', 'public/assets/tiles/nerve.png');
        this.game.load.image('2', 'public/assets/tiles/neutro.png');
        this.game.load.image('3', 'public/assets/tiles/platelet.png');
        this.game.load.image('4', 'public/assets/tiles/redblood.png');
        this.game.load.image('5', 'public/assets/tiles/stem.png');
        this.game.load.image('6', 'public/assets/tiles/whiteblood.png');

        this.game.load.image('7', 'public/assets/tiles/b_nerve.png');
        this.game.load.image('8', 'public/assets/tiles/b_neutro.png');
        this.game.load.image('9', 'public/assets/tiles/b_platelet.png');
        this.game.load.image('10', 'public/assets/tiles/b_redblood.png');
        this.game.load.image('11', 'public/assets/tiles/b_stem.png');
        this.game.load.image('12', 'public/assets/tiles/b_whiteblood.png');

        this.game.load.image('13', 'public/assets/tiles/magnesium.png');
        this.game.load.image('14', 'public/assets/tiles/potassium.png');
        this.game.load.image('15', 'public/assets/tiles/nomatch.png');
        this.game.load.image('16', 'public/assets/tiles/nomove.png');
        this.game.load.image('magnesium', 'public/assets/tiles/magnesium.png');
        this.game.load.image('potassium', 'public/assets/tiles/potassium.png');

        this.game.load.image('switch', 'public/assets/switch.png');
        this.game.load.image('switch-on', 'public/assets/switch-on.png');
        this.game.load.image('delete', 'public/assets/delete.png');
        this.game.load.image('delete-on', 'public/assets/delete-on.png');

        this.game.load.spritesheet('sandbox', 'public/assets/sandbox.png');
        this.game.load.spritesheet('1button', 'public/assets/1button.png');
        this.game.load.spritesheet('2button', 'public/assets/2button.png');
        this.game.load.spritesheet('3button', 'public/assets/3button.png');
        this.game.load.spritesheet('4button', 'public/assets/4button.png');
        this.game.load.spritesheet('5button', 'public/assets/5button.png');
        this.game.load.spritesheet('6button', 'public/assets/6button.png');
        this.game.load.spritesheet('7button', 'public/assets/7button.png');
        this.game.load.spritesheet('8button', 'public/assets/8button.png');
        this.game.load.spritesheet('9button', 'public/assets/9button.png');
        this.game.load.spritesheet('10button', 'public/assets/10button.png');
        this.game.load.spritesheet('11button', 'public/assets/11button.png');
        this.game.load.spritesheet('12button', 'public/assets/12button.png');
        this.game.load.spritesheet('13button', 'public/assets/13button.png');
        this.game.load.spritesheet('14button', 'public/assets/14button.png');
        this.game.load.spritesheet('15button', 'public/assets/15button.png');
        this.game.load.spritesheet('16button', 'public/assets/16button.png');
        this.game.load.spritesheet('17button', 'public/assets/17button.png');
        this.game.load.spritesheet('18button', 'public/assets/18button.png');
        this.game.load.spritesheet('19button', 'public/assets/19button.png');
        this.game.load.spritesheet('20button', 'public/assets/20button.png');
        this.game.load.spritesheet('21button', 'public/assets/21button.png');
        this.game.load.spritesheet('22button', 'public/assets/22button.png');
        this.game.load.spritesheet('23button', 'public/assets/23button.png');

        this.game.load.image("background", "public/assets/background.jpg");
        this.game.load.spritesheet('playbutton', 'public/assets/startbutton.png');
        this.game.load.spritesheet('infobutton', 'public/assets/infobutton.png');
        this.game.load.spritesheet('selectbutton', 'public/assets/selectbutton.png');
        this.game.load.spritesheet('step', 'public/assets/step.png')
        this.game.load.spritesheet('bug_reporting', 'public/assets/bug_reporting.png')

        this.game.load.spritesheet('instruction1', 'public/assets/instruction1.png', 1200, 1175)
        this.game.load.spritesheet('instruction2', 'public/assets/instruction2.png', 1200, 1175)
        this.game.load.spritesheet('instruction3', 'public/assets/instruction3.png', 1200, 1179)
        this.game.load.spritesheet('instruction4', 'public/assets/instruction4.png', 1200, 1179)
        this.game.load.spritesheet('instruction5', 'public/assets/instruction5.png', 1200, 1184)
        this.game.load.spritesheet('instruction6', 'public/assets/instruction6.png', 1200, 1192)
        this.game.load.spritesheet('instruction7', 'public/assets/instruction7.png', 1200, 1185)
        this.game.load.spritesheet('instruction8', 'public/assets/instruction8.png', 1200, 1175)
        this.game.load.spritesheet('homebutton', 'public/assets/homebutton.png')
        this.game.load.spritesheet('nextbutton', 'public/assets/next.png')
        this.game.load.spritesheet('downloadbutton', 'public/assets/download.png')
        this.game.load.spritesheet('backbutton', 'public/assets/backbutton.png')
        console.log("running");
    }

    create() {
        this.game.state.start('Menu');
    }
}