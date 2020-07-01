
class Error extends BaseState {
    constructor(game) {
        super(game);
        this.message = null;
    }

    //game.state.start(stateName, clearGameWorld, clearCahce, message) -ből jön, a TokenLevel.js-ből
    init(message) {
        this.message = message;
    }

    create() {
        super.create();

        let textBuilder = new TextBuilder(this.game, this.message);
        textBuilder.writeText();

        this.game.add.button(1200, 1750, 'backbutton', function(){
            this.game.state.start('Menu');
        })
    }

}
