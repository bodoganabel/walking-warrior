
class Levels extends BaseState {

    constructor(game) {
        super(game);
    }

    create() {
        super.create();

        let tBuilder = new TextBuilder(this.game, null);
        let bBuilder = new ButtonBuilder(this.game, this);

        tBuilder.setTextStyle({ font: "110px Acme", fill: "#ffc61e" });
        tBuilder.writeLineToPos(450, 50, "Select Level");
        tBuilder.setTextStyle({ font: "60px Acme", fill: "#ffc61e" });

        bBuilder.createButton(1200, 1750, 'backbutton', function () {
            this.game.state.start("Menu");
        });

        //button grid for selecting level
        let topOffset = 320
        let leftOffset = 120
        game.diyOffset = 290;
        game.dixOffset = 130;

        this.ajaxPost('ajax.php', { action: 'getCompletedLevelsData' }).then(
            (resp) => {
                console.log("Server's response from getCompletedLevelsData:")
                console.log(resp);
                let greenButtons = resp.data.gamelevel - 1;
                if (resp.data.last_saved_state !="" && JSON.parse(resp.data.last_saved_state).unlockNextLevelIfGetToken == 1 && greenButtons == 22) {
                    greenButtons++;
                }
                console.log(greenButtons)

                for (let i = 0; i < 4; i++) {
                    for (let j = 0; j < 6; j++) {
                        let index = (j + i * 6) + 1
                        if (index < 24) {
                            if (index <= greenButtons) {
                                game.add.sprite(i * 280 + game.dixOffset, j * 240 + game.diyOffset, 'done');
                                console.log("HEEEE: " + (i * 280 + leftOffset) +";" +(j * 240 + topOffset));
                            }
                            bBuilder.createLevelButton(i * 280 + leftOffset, j * 240 + topOffset, `${index}button`, `Level${index}`)
                        } else {
                            //24. button
                            bBuilder.createButton(i * 280 + leftOffset, j * 240 + topOffset, 'sandbox', function () {
                                this.game.state.start("SandBox");
                            })
                        }
                    }
                }

            }
        );



    }
}