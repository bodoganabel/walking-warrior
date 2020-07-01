
class TokenLevel extends BaseLevel {
    constructor(game) {
        super(game);
    }

    create() {
        super.create();
    }

    beforeLevel(data) {
        super.beforeLevel(data);

        if (parseInt(data.tester) === 1) {
            return;
        }


        if (parseInt(data.tokens) < 1) {
            this.game.state.start('Error', true, false, 'You have lost all your tokens. Open the WW Pedometer App and get a token by walking!');
            return;
        }
    }

    createUi() {
        this.game.add.text(10, 400, "0", {
            font: '50px Acme',
            fill: "#ff2800"
        }).text = 'Tokens:';

        this.tokensLabel = this.game.add.text(10, 440, "0", {
            font: '100px Acme',
            fill: "#ff2800"
        });
        this.tokensLabel.text = 1;

        super.createUi();

    }
}