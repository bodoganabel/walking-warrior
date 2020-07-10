
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