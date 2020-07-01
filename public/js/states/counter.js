
class Counter extends BaseState {
	constructor(game) {
		super(game);
	}

	create() {
		this.game.stage.backgroundColor = '#006bb4';

		let text = 'If you need to collect tokens to continue the game or you just simply have the';
		text += ' mood for a short walk, then you are in the right place!';
		text += ' In order to register your steps, you will have to open the Walking Warrior Pedometer Android application!';
		text += '\n•Simply open the Android application.';
		text += '\n•Log in to your Walking Warrior account if you have not done it yet.';
		text += '\n•Start walking and the app will register your steps.';
		text += '\n•When you are done, close the application completely to have the app store your steps.';
		text += '\n•Get back in the browser and refresh the page. You will have received 1 token for every 20 steps.';

		let textBuilder = new TextBuilder(this.game, text);
			textBuilder.setTextStyle({
				font: '60px Acme',
				fill: '#FCB514',
			});
		textBuilder.writeText();

		let bBuilder = new ButtonBuilder(this.game, this);
			bBuilder.createButton(1200, 1750, 'backbutton', function () {
			this.game.state.start("Menu");
		})

		bBuilder.createButton(500, 1750, 'nextbutton', function() {
			this.game.state.start("Install");
		})

	}
}