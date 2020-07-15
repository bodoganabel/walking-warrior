class BaseLevel extends BaseState {
    constructor(game) {
        super(game);
        this.scoreToFinish = 1111; //If you see this number in game, then actual level doesn't modyfied this value, and that is a bug
    }

    showDebugTile() {
        console.log(" ")
        console.log("tileGrid:")

        for (let j = 0; j < this.gridSize.h; ++j) {
            let line = "";
            for (let i = 0; i < this.gridSize.w; ++i) {
                line += game.tileGrid[i][j].tileType.toString() + " ";
            }
            console.log(line)
        }
        console.log(" ")
    }


    //END Abel bugfix


    //Very first function when changing scene
    init(savedData) {
        console.log("init");

        game.userMadeFirstMove = false;
        this.tileOffset = 200;
        game.tileHeight = this.tileWidth = 200;


        //regex: game.tileGrid.*=
        this.gridSize = { w: 6, h: 9 };
        //game.TileGrid

        //console.log(game.tileGrid[1]);
        game.tiles = [];

        this.tileTypes = LVL.tileTypes;

        this.deleteOn = false;
        this.switchOn = false;

        this.clickedPos = { x: 0, y: 0 };
        this.activeTile1 = this.activeTile2 = null;

        //to init
        game.switchOn = false //switch enabled;

        //from globals
        this.dedicatedTileTypes = null;

        game.tilestate = null;

        /*
            Abel's bugfix
        
            the game needs to have states.
            - waitInput: the only state, where user can interact with tiles.error
            - swap: the game swaps what player clicked to.error
            - remove: in case of match/deletion the game removes the matching/deleted tiles
            - fall: existing tiles will fall into place
            - regenerate: create new tiles, which fall
            */


        //force reset state to waitInput


        //force unblock user input
        if (!game.addedDebugKeys) {

            game.addedDebugKeys = true;

            document.addEventListener('keyup', (event) => {
                const keyName = event.key;
                if (keyName == 'f') {
                    game.subState = 'waitInput';
                    //console.log("Game forced into waitInput state.")
                }

                if (keyName == 'd') {

                    //console.log("Game state: " + game.subState);
                    //console.log("active tile1:")
                    //console.log(this.activeTile1);
                    //console.log("active tile1:")
                    //console.log(this.activeTile2);
                }

                if (keyName == 'g') {
                    this.showDebugTile()
                }

                if (keyName == 'm') {
                    //console.log("game.moves: " + game.moves)
                    game.moves
                }

                if (keyName == 'M') {
                    game.moves += 10
                    //console.log("game.moves increased to: " + game.moves)
                }


            }, false);

        }
        //These globals must reset on every new level.

        game.counter = new ScoreCounter();
        game.moves = null;
        game.score = 0;
        game.tileGrid = new Array(this.gridSize.w); //Nulling the grid will happen at init()
        game.subState = 'setupLevel'; //It describes the actual state of game. It's needeed to identify program state at swiping tiles, swiping back tiles, check matches, removing, regenerating etc...
        game.unlockNextLevelIfGetToken; // Player gets this if cleared actual level, but can't play next level because he need to walk. Initialized below.
        //If you add multiple timed effect, you need to identify which one finishes last in order to continue the program.
        // if more events are awaiting, then each call only decreases this number below, and only at the last call will the function be executed.
        game.EventsWaitingCounter = 0;
        game.timeoutReleaseEventsWaitingCounter = 0;
        game.NextLevelEventsCounter = 0;


        let level = this.getLevel();
        this.dedicatedTileTypes = LVL[level].dedicatedTileTypes || [];

        //ha van savedData a mentésből, akkor abból initelünk
        if (typeof savedData == 'undefined') {
            game.tilestate = null;
            game.moves = LVL[level].moves;
            game.score = 0;
            game.unlockNextLevelIfGetToken = 0;
            console.log("type of saved data is undefined")
        } else {
            game.tilestate = savedData.tileState;
            game.moves = savedData.moves;
            game.score = savedData.score;
            this.tile1Count == savedData.tile1Count;
            this.tile2Count == savedData.tile2Count;
            this.tile3Count == savedData.tile3Count;
            game.unlockNextLevelIfGetToken = savedData.unlockNextLevelIfGetToken;
            ; // Player gets this if cleared actual level, but can't play next level because he need to walk.
            console.log("type of saved data is anything but undefined")

        }

        this.ajaxPost('ajax.php', { action: 'beforeLevel' })
            .then((resp) => {

                if (resp.success) {
                    this.beforeLevel(resp.data);
                } else {
                    alert('Oops, something went wrong when fetching data from the server. Response was false');
                }
            })

        //After init(), create() is called. LEARN MORE: at Phaser 2's documentation (State); https://phaser.io/docs/2.3.0/Phaser.State.html
    }

    beforeLevel(data) {
        console.log("before level");
        let gameLevel = parseInt(data.gamelevel);
        //actual level
        let actLevel = parseInt(this.getLevelNumber());
        game.hastoken = (data.tokens == 1) ? true : false;
        console.log("Got initial token's value: " + data.tokens)

        /*         if (parseInt(data.tester) === 1) {
                    return;
                } */


        //Getting saved "UnlockedNext" value

        try {
            let saveData = JSON.parse(data.last_saved_state);

            console.log("Got unlockNextLevelIfGetToken below: ")
            game.unlockNextLevelIfGetToken = saveData.unlockNextLevelIfGetToken;
            console.log(saveData);
            console.log(saveData.unlockNextLevelIfGetToken);
        }
        catch (e) {
            console.log("Don't have any savedata from server")
        }

        //If player already unlocked this level, but accidentaly started over the previous one, he can still play this level if he went on a walk
        if (game.unlockNextLevelIfGetToken == 1 && (gameLevel == (actLevel - 1) || ((actLevel == 4) && (gameLevel < 4))) && actLevel > 3) {

            game.hastoken = (data.tokens == 1) ? true : false;
            if (game.hastoken) {
                this.ajaxPost('ajax.php', { action: 'removeTokens' }).then(
                    (resp) => {
                        if (resp.success) {
                            this.ajaxPost('ajax.php', { action: 'updateLevel', level: actLevel }).then(
                                (resp) => {
                                    if (resp.success) {
                                        game.hastoken = 0;
                                        game.unlockNextLevelIfGetToken = 0;
                                        this.saveGameState();
                                        console.log("Should have started")
                                        //Display token count: 0
                                        this.tokensLabel.text = '0';
                                        return;
                                        //Continue game;
                                    }
                                    else {
                                        this.game.state.start('Error', true, false, 'Lost connection to server.');
                                    }
                                });
                        }
                        else {
                            this.game.state.start('Error', true, false, 'Cannot connect to server.');
                        }
                    }
                );

            }
            else {
                this.game.state.start('Error', true, false, 'In order to unlock this level, please walk 20 steps with the Pedometer app and earn 1 token.');
            }



        }
        else if (gameLevel < actLevel && actLevel > 3) {
            console.log(game.unlockNextLevelIfGetToken + "\n " + gameLevel + "\n " + actLevel)
            this.game.state.start('Error', true, false, 'Unfortunately, you have not reached this level yet. Plays some more and come back!');
            return;
        }

        // Everything is fine
        {
            this.setupTiles();
        }
    };



    getLevel() {
        return this.constructor.name;
    }

    create() {
        console.log("create");

        super.create();


        musicPlayer.playAudio('game');

        let button = this.game.add.button(10, 1600, 'backbutton', function () {

            if (game.subState != "waitInput") {
                return;
            }

            this.saveGameState();
            this.game.state.start('Menu');
        }, this, 2, 1, 0);
        button.scale.setTo(0.8, 0.8);

        this.createUi();
        this.createObjective();
        this.updateObjective();

        if (LVL[this.getLevel()].hasSwitchButton) {
            this.createSwitch();
        }

        if (LVL[this.getLevel()].hasDeleteButton) {
            this.createDelete();
        }
    }

    isCompleted() {
        console.log('Is completed is called. Score: ' + game.score + ' ; Score to finish: ' + this.scoreToFinish)
        return game.score >= this.scoreToFinish;
    }

    checkScore() {

        //If win
        if (this.isCompleted()) {
            if (this.getLevel() == 'SandBox') {
                this.game.state.start('Menu');
                return;
            }

            this.game.time.events.add(400, () => {

                console.log("Executing next level validation process...\n\n")
                let nextLevel = parseInt(this.getLevel().substring(5)) + 1; //pl.: Level1 --> 1
                this.saveGameState();
                if (nextLevel < 23) {

                    game.hastoken = false;
                    this.ajaxPost('ajax.php', { action: 'getToken' }).then(
                        (resp) => {
                            if (resp.success) {
                                game.hastoken = (resp.data == 1) ? true : false;
                                console.log("Finished level. User token: ");
                                console.log(game.hastoken);
                                console.log(resp.data);
                                console.log(resp);
                                // If level is 2 or below, no token needed to play next level.
                                if (nextLevel < 4) {
                                    this.game.state.start('NextLevel', true, false, nextLevel)

                                }
                                // Remove user's token if level > 3. If no token, send him walk.
                                else if (game.hastoken) {
                                    this.ajaxPost('ajax.php', { action: 'removeTokens' }).then(
                                        (resp) => {
                                            console.log("Server's response from removing tokens:")
                                            console.log(resp);
                                            console.log("Should Starting new game")
                                            this.game.state.start('NextLevel', true, false, nextLevel)
                                        }
                                    );

                                }
                                else {
                                    game.unlockNextLevelIfGetToken = 1;
                                    this.saveGameState();
                                    this.game.state.start('Error', true, false, 'Congratulations!\n You cleared all levels so far.\n In order to unlock the next level, please walk 20 steps with the Pedometer app and earn 1 token.');
                                }
                            }
                            else {
                                alert("Cannot connect to server!")
                            }
                        }
                    );
                } else {
                    this.game.state.start('Menu');
                }
            });
            return;
        }

        //If lose
        else if (game.moves <= 0) {
            this.game.state.start('Error', true, false, 'You have lost all your moves.');
            return;
        }

        //Continue game
        else {
            this.updateObjective();
            game.checkedScore = true;
            this.endSubState('checkScore: to continue game')
        }
    }

    update() {

        if (game.subState == 'subStateEnded') //Controlling game states
        {

            if (game.endSetup) {
                game.endSetup = false;
                game.subState = 'checkAfterRegenerate'
                console.log("checkAfterInitialSpawn. Initial grid: ");
                this.showDebugTile()
                this.checkMatch('checkAfterInitialSpawn');
                console.log("grid after first check:")
                this.showDebugTile();
            }

            if (game.afterSwap) {
                game.afterSwap = false;
                game.subState = 'firstCheck';
                console.log("firstCheck");
                this.checkMatch('firstCheck');
            }

            //
            if (game.removedMatches) {
                game.removedMatches = false;
                //Call Drop event
                game.subState = 'drop'
                console.log("drop");
                this.dropTiles();
                console.log('After drop: ')
                this.showDebugTile();
            }

            if (game.checkAfterDrop) {
                game.checkAfterDrop = false;
                game.subState = 'checkAfterDrop'
                console.log("checkAfterDrop");
                this.checkMatch('checkAfterDrop');
                console.log('After check after drop: ')
                this.showDebugTile();
            }

            if (game.regenerate) {
                game.regenerate = false
                game.subState = 'regenerate'
                console.log("regenerate now");
                this.regenerateTiles();
                console.log('initialized regenerate (created new tiles which now falling down) on this grid: ')
                this.showDebugTile()
            }

            if (game.checkAfterRegenerate) {
                game.checkAfterRegenerate = false;

                console.log("grid after finished regenerate: ")
                this.showDebugTile();

                game.subState = 'checkAfterRegenerate'
                console.log("checkAfterRegenerate");
                this.checkMatch('checkAfterRegenerate');
            }

            if (game.noAnyOtherMatch) {
                game.noAnyOtherMatch = false;
                game.subState = 'checkScore'
                console.log("checkScore");
                this.checkScore(); //call checkscore then release tile
            }

            if (game.checkedScore) {
                game.checkedScore = false;
                console.log("End of Swipe");
                this.tileUp('End of Swipe');
            }
        }



        //a felhasználó ilyenkor éppen lenyomta az egyik tile-t, és ráhuzza egy másikra
        if (this.activeTile1 && !this.activeTile2) {
            let mousePos = {
                x: this.game.input.x - this.tileOffset, //el van tolva a tile grid jobbra tileOffsetnyit
                y: this.game.input.y
            };

            let hoverPos = {
                x: Math.floor(mousePos.x / this.tileWidth),
                y: Math.floor(mousePos.y / game.tileHeight)
            };

            let diff = {
                x: hoverPos.x - this.clickedPos.x,
                y: hoverPos.y - this.clickedPos.y
            }

            //ellenőrzés, hogy a griden belül vagyunk-e még
            if (hoverPos.x > this.gridSize.x || hoverPos.x < 0 || hoverPos.y > this.gridSize.y || hoverPos.y < 0) {
                this.tileUp();
                return;
            }

            //megnézzük, hogy a user elhuzta-e az ujjat legalább egy tile szélességre vagy magasságra
            if ((Math.abs(diff.x) == 1 && diff.y == 0) || (Math.abs(diff.y) == 1 && diff.x == 0)) {

                //If this is the user's first move, signal it with this flag
                if (game.userMadeFirstMove == false) {
                    game.userMadeFirstMove = true;
                }
                game.subState = 'swappingToCheck';
                this.activeTile2 = game.tileGrid[hoverPos.x][hoverPos.y];
                this.swapTiles();
            }
        }

    }

    endSubState(whoCalledMe) {

        if (game.EventsWaitingCounter > 0) { game.EventsWaitingCounter-- }
        if (game.EventsWaitingCounter == 0) {
            game.subState = "subStateEnded";
            console.log("State ended: " + whoCalledMe);
        }
    }

    swapTiles() {

        if (this.activeTile1 && this.activeTile2) {
            //nomove tile check
            if (this.activeTile1.tileType == 14 || this.activeTile2.tileType == 14) {
                this.tileUp();
                return;
            }

            let tile1Pos = {
                x: (this.activeTile1.x - this.tileWidth / 2) / this.tileWidth,
                y: (this.activeTile1.y - game.tileHeight / 2) / game.tileHeight
            };
            let tile2Pos = {
                x: (this.activeTile2.x - this.tileWidth / 2) / this.tileWidth,
                y: (this.activeTile2.y - game.tileHeight / 2) / game.tileHeight
            };

            var t1Index = {
                x: ((this.activeTile1.x - this.tileOffset) - this.tileWidth / 2) / this.tileWidth,
                y: (this.activeTile1.y - game.tileHeight / 2) / game.tileHeight
            };
            var t2Index = {
                x: ((this.activeTile2.x - this.tileOffset) - this.tileWidth / 2) / this.tileWidth,
                y: (this.activeTile2.y - game.tileHeight / 2) / game.tileHeight
            };

            //Swap them in our "theoretical" grid
            try {
                game.tileGrid[t1Index.x][t1Index.y] = this.activeTile2;
                game.tileGrid[t2Index.x][t2Index.y] = this.activeTile1;

            } catch (e) {
                console.warn('Error swapping the tiles...');
            }

            //Actually move them on the screen
            let tween;
            tween = this.game.add.tween(this.activeTile1);
            tween.to({
                x: tile2Pos.x * this.tileWidth + (this.tileWidth / 2),
                y: tile2Pos.y * game.tileHeight + (game.tileHeight / 2)
            }, 200, Phaser.Easing.Linear.In, true);
            tween = this.game.add.tween(this.activeTile2);
            tween.to({
                x: tile1Pos.x * this.tileWidth + (this.tileWidth / 2),
                y: tile1Pos.y * game.tileHeight + (game.tileHeight / 2)
            }, 200, Phaser.Easing.Linear.In, true);

            this.activeTile1 = game.tileGrid[t1Index.x][t1Index.y];
            this.activeTile2 = game.tileGrid[t2Index.x][t2Index.y];
            //is this first swap of actual player action?
            if (game.subState == 'swappingToCheck') {
                game.EventsWaitingCounter++;
                tween.onComplete.add(
                    () => {
                        game.afterSwap = true;
                        this.endSubState('swapTiles');
                    }
                )
            }
            else if (game.subState == 'noMatchesAtAll') {
                //Finish up player action after second swap(swapback)
                tween.onComplete.add(
                    () => {
                        this.tileUp('swapTiles: after swapping back')
                    }
                )
            }

        }
        else {
            console.log("ERROR no active tiles!");
            //this.tileUp('after swap-> swap tiles');
        }
    }

    checkMatch(whoCalledMe) {

        console.log("checking by: " + whoCalledMe);

        let matchGroups = ShapeMatcher.getMatches(game.tileGrid, this.gridSize.w, this.gridSize.h);
        let gotMatches = (matchGroups.length > 0) ? true : false;

        if (gotMatches) {

            //if player accidentally force switches matching tiles... 
            if (game.switchOn) {
                this.switchClick(true);
            }

            console.log("check got matches")
            this.decrementMoves();
            game.subState = 'remove'
            console.log('remove: ')
            console.log(matchGroups)
            this.removeMatches(matchGroups);
        }
        else {

            console.log("Check: no matches. Game state: " + game.subState)

            //it means: no mmore matches is going to be found, close this swipe.
            if (game.subState == 'firstCheck') {

                //if swap click enabled, do not swap back
                if (game.switchOn) {
                    this.decrementMoves(3);
                    this.switchClick(true);
                    game.noAnyOtherMatch = true;
                    this.endSubState('checkMatch: after regenerate.')
                }
                else {
                    game.subState = 'noMatchesAtAll';
                    this.swapTiles('noMatchesAtAll');
                }

            }
            else if (game.subState == 'checkAfterDrop') {
                game.regenerate = true;
                this.endSubState('checkMatch: after drop.')
            }
            else if (game.subState == 'checkAfterRegenerate') {
                game.noAnyOtherMatch = true;
                this.endSubState('checkMatch: after regenerate.')
            }
        }
    }


    regenerateTiles() {

        let events = this.game.time.events
        events.add(300, () => {
            for (let i = 0; i < this.gridSize.w; ++i) {
                for (let j = 0; j < this.gridSize.h; ++j) {
                    if (game.tileGrid[i][j].tileType == '-1') {
                        this.addTile(i, j);
                    }
                }
            }
        })
    }

    removeMatches(matchGroups) {

        for (let group of matchGroups) {

            for (let match of group) {
                let bonusType = 0;
                if (match[0].lShape == true) {
                    bonusType = 'magnesium';
                    game.counter.increment('L-shape');
                    this.incrementScore(15);
                } else if (match[0].tShape == true) {
                    bonusType = 'potassium';
                    game.counter.increment('T-shape');
                    this.incrementScore(15);
                } else if (match.length >= 4) {
                    if (this.isBonusTile(match[0])) {
                        bonusType = match[0].tileType;
                    } else if (this.isDefaultTile(match[0])) {
                        bonusType = match[0].tileType + 6;
                    }
                    game.counter.increment('bonus-count');

                    //create a bonus cell - 5 point
                    this.incrementScore(5);
                } else {
                    //3-cell match - 1 point
                    this.incrementScore();
                }


                if (match.length >= 5 && !match[0].tShape && !match[0].lShape) {
                    game.counter.increment('5-in-a-row');
                }

                game.counter.increment(match[0].tileType + '-match', match.length);

                let hasBonusTile = false;
                for (let i = 0; i < match.length; i++) {

                    //nézzük, hogy van-e bonus tile a matchben, mert akkor +1 pont és +1 move
                    if (this.isBonusTile(match[i])) {
                        hasBonusTile = true;
                    }

                    let pos = this.getTilePos(match[i]);
                    this.removeTile(match[i]);
                    if (i == 3) {
                        game.subState = 'hasBonus'
                        this.addTile(pos.x, pos.y, bonusType);
                        //use a bonus cell in a match - 1 point + 1 move (we increment by 2 because we just decreased by one with the current move)
                        this.incrementScore();
                        this.incremenentMoves(2);
                    }
                }
            }
        }

        game.subState = 'removedMatches';
        game.removedMatches = true;
        this.endSubState('removeMatches: after removed matches.');

        //console.log("pos: remove tiles done. Grid:")
        this.showDebugTile();
    }

    dropTiles() {

        game.subState = 'drop'

        for (let i = this.gridSize.w - 1; i >= 0; i--) {
            for (let j = this.gridSize.h - 1; j >= 0; --j) {

                //Actual tile is empty
                if (game.tileGrid[i][j].tileType == '-1') {
                    //console.log("found zero")
                    //ha a legtetején vagyunk az oszlopnak
                    if (j == 0) {

                        game.EventsWaitingCounter++;
                        this.game.time.events.add(200, () => {
                            game.checkAfterDrop = true;
                            this.endSubState('dropTiles')
                        })
                    }
                    else {
                        for (let k = j - 1; k >= 0; k--) {
                            if (game.tileGrid[i][k].tileType != '-1') {
                                let tempTile = game.tileGrid[i][k];
                                game.tileGrid[i][k] = game.tileGrid[i][j];
                                game.tileGrid[i][j] = tempTile;

                                let tween;
                                tween = this.game.add.tween(tempTile)
                                tween.to({
                                    y: game.tileHeight * j + (game.tileHeight / 2)
                                }, 200, Phaser.Easing.Linear.In, true)

                                game.EventsWaitingCounter++;
                                tween.onComplete.add(
                                    () => {
                                        game.checkAfterDrop = true;
                                        this.endSubState('dropTiles');
                                    }
                                )

                                break
                            }
                        }
                    }

                }

                //j = game.tileGrid[i].length;
            }
        }
    }



    getMatches(col, row) {
        let matches = ShapeMatcher.matchAll(game.tileGrid, col, row, this.gridSize.w, this.gridSize.h);
        if (matches.length > 0) {
            //console.log(matches);
        }

        return matches;
    }

    removeTile(tile) {

        let pos = this.getTilePos(tile);
        console.log("tile and pos:")
        console.log(tile)
        console.log(pos);
        game.tiles.remove(tile);
        game.tileGrid[pos.x][pos.y].tileType = '-1';
    }

    setupTiles() {

        //Null out tileGrid
        for (let i = 0; i < this.gridSize.w; i++) {
            game.tileGrid[i] = new Array(this.gridSize.h);
            for (let j = 0; j < this.gridSize.h; j++) {
                game.tileGrid[i][j] = { tileType: '-1' };
            }
        }

        console.log("Tile States at 'setupTiles()': ");
        console.log(game.tilestate);
        this.showDebugTile();

        game.tiles = this.game.add.group();
        //console.log("tileState to load map from: ")
        //console.log(game.tilestate);
        game.subState = 'setupTileCreation'
        for (let i = 0; i < this.gridSize.w; ++i) {
            for (let j = 0; j < this.gridSize.h; ++j) {
                //ha van tileStateünk mentésből, akkor abból töltjük fel a gridet
                if (game.tilestate == null) {
                    this.addTile(i, j);
                } else {
                    this.addTile(i, j, game.tilestate[i][j]);
                }
            }
        }
        game.endSetup = true;
        this.endSubState('setupTiles');
    }

    addTile(i, j, type = 0) {
        // ha már van ezen a pozíción tile, akkor ne írja felül
        // így meg lehet matchek-nél akadályozni, hogy két match kereszteződésénél 2 új tile legyen berakva
        if (game.tileGrid[i][j].tileType != '-1') {
            return;
        }


        let tileNumber = type;
        let tx = ((i * this.tileWidth) + this.tileWidth / 2) + this.tileOffset;
        let ty = null;

        if (type == 0) { //random
            tileNumber = this.randomizeTile();
            ty = 0;
        } else {
            ty = j * game.tileHeight + (game.tileHeight / 2);
        }

        let tile = game.tiles.create(tx, ty, tileNumber.toString());
        tile.anchor.setTo(0.5, 0.5);
        tile.inputEnabled = true;
        tile.tileType = tileNumber;
        tile.events.onInputDown.add(this.tileDown, this);
        tile.inMatch = false;
        game.tileGrid[i][j] = tile;

        if (game.subState == "regenerate" && type == 0) {
            let tween = this.game.add.tween(tile);
            tween.to({
                y: j * game.tileHeight + (game.tileHeight / 2)
            }, 100, Phaser.Easing.Linear.In, true)

            game.EventsWaitingCounter++;
            tween.onComplete.add(
                () => {
                    game.checkAfterRegenerate = true;
                    this.endSubState('added tile after regenerate');
                }
            )
        }
        else if (game.subState == 'setupTileCreation' || game.subState == 'hasBonus') {
            console.log("added tile fast");
            tile.y = j * game.tileHeight + (game.tileHeight / 2);
        }
    }


    randomizeTile() {
        let tileTypePool = this.tileTypes;

        if (Math.random() < 0.3) {
            tileTypePool = this.tileTypes.concat(this.dedicatedTileTypes);

        }
        let rnd = Math.floor(Math.random() * tileTypePool.length);

        return tileTypePool[rnd];
    }

    timeoutRelease() {
        game.timeoutReleaseEventsWaitingCounter--;
        if (game.timeoutReleaseEventsWaitingCounter > 0) {
            return;
        }
        if (game.subState == 'gotInput') {
            console.log("tile touch timed out");
            this.tileUp();
        }
    }

    tileDown(tile) {

        //Prevent user: free swap by double clicking  
        if (game.subState != 'waitInput') {
            console.log("click blocked");
            return;
        }

        let events = this.game.time.events
        events.add(500, () => {
            game.timeoutReleaseEventsWaitingCounter++;
            this.timeoutRelease();
        })

        //console.log("Game State: " + game.subState);
        //console.log("tile: ")
        //console.log(tile)
        //console.log()

        this.clickedPos.x = (tile.x - this.tileOffset - this.tileWidth / 2) / this.tileWidth;
        this.clickedPos.y = (tile.y - game.tileHeight / 2) / game.tileHeight;

        if (tile.tileType == 'potassium') {
            console.log("Potassium delete! (row)")
            game.subState = 'deleteRowByPotassium'
            this.deleteRow(tile);
            game.removedMatches = true;
            this.endSubState();
            return;
        }

        if (tile.tileType == 'magnesium') {
            game.subState = 'deleteColumnByMagnesium'
            console.log("Magnesium delete! (column)")
            this.deleteCol(tile);
            game.removedMatches = true;
            this.endSubState();
            return
        }

        //tile törlése, -2 move
        if (this.deleteOn) {
            this.deleteClick();
            this.decrementMoves(2);
            this.removeTile(tile);
            game.removedMatches = true;
            this.endSubState();
            return;
        }

        game.subState = 'gotInput';
        this.activeTile1 = tile;


    }

    createUi() {
        //moves
        this.game.add.text(10, 80, "0", {
            font: '50px Acme',
            fill: "#ff2800"
        }).text = 'Moves:';

        game.movesLabel = this.game.add.text(10, 120, "0", {
            font: '100px Acme',
            fill: "#ff2800"
        });
        game.movesLabel.text = game.moves;

        //level
        this.game.add.text(10, 240, "0", {
            font: '50px Acme',
            fill: "#ff2800"
        }).text = "Level:";

        this.game.add.text(10, 280, "0", {
            font: '100px Acme',
            fill: "#ff2800"
        }).text = this.getLevelNumber();

        //score
        this.scoreLabel = this.game.add.text(920, 1780, "0", {
            font: '100px Acme',
            fill: '#ff2800'
        });
        this.scoreLabel.anchor.setTo(0, 0);
        this.scoreLabel.align = 'center';
        this.scoreLabel.text = "Score: " + game.score;

    }

    getLevelNumber() {
        return this.getLevel().substring(5);
    }

    incrementScore(plus = 1) {
        //Only give score if player started acting on level
        if (game.userMadeFirstMove) {
            game.score += plus;
            this.scoreLabel.text = "Score: " + game.score;
        }
    }

    decrementMoves(minus = 1) {
        //Only give score if player started acting on level
        if (game.userMadeFirstMove) {
            game.moves -= minus;
            game.movesLabel.text = game.moves;
        }
    }

    incremenentMoves(plus = 1) {
        //Only give score if player started acting on level
        if (game.userMadeFirstMove) {
            game.moves += plus;
            game.movesLabel.text = game.moves;
        }
    }


    createObjective() {
        game.objectiveLabel = this.game.add.text(20, 1800, "", {
            font: "70px Acme",
            fill: "#ff2800"
        });
    }

    updateObjective() {
        game.objectiveLabel.text = `Reach ${this.scoreToFinish} points!`;
    }

    getTilePos(tile) {
        return {
            x: (tile.x - this.tileOffset - this.tileWidth / 2) / this.tileWidth,
            y: (tile.y - game.tileHeight / 2) / game.tileHeight
        }
    }

    isDefaultTile(tile) {
        return tile.tileType >= 1 && tile.tileType <= 6;
    }

    isBonusTile(tile) {
        return tile.tileType >= 7 && tile.tileType <= 12;
    }

    //Release all tiles, waiting for new user input.
    tileUp(whoCalledMe) {
        if (whoCalledMe) {
            console.log("tileUp called by: " + whoCalledMe);
        }
        game.subState = 'waitInput';
        this.activeTile1 = this.activeTile2 = null;
    }

    gameOver() {
        this.game.state.start('GameOver');
    }

    createDelete() {
        let me = this;
        me.delete = me.game.add.button(10, 800, 'delete', this.deleteClick, this, 2, 1, 0);
        me.delete.scale.setTo(0.12, 0.12);
    }

    deleteClick() {

        if (game.subState != "waitInput") {
            return;
        }

        let me = this;
        if (me.deleteOn) {
            me.deleteOn = false;
            me.delete = me.game.add.button(10, 800, 'delete', this.deleteClick, this, 2, 1, 0);
            me.delete.scale.setTo(0.12, 0.12);
        } else {
            me.deleteOn = true;
            me.delete = me.game.add.button(10, 800, 'delete-on', this.deleteClick, this, 2, 1, 0);
            me.delete.scale.setTo(0.192, 0.192);
        }
    }

    createSwitch() {
        let me = this;
        me.switch = me.game.add.button(10, 600, 'switch', this.switchClick, this, 2, 1, 0);
        me.switch.scale.setTo(0.32, 0.32);
    }

    switchClick(forceSwitch) {

        if (game.subState == "waitInput" || forceSwitch) {



            let me = this;
            if (game.switchOn) {
                game.switchOn = false;
                me.switch = me.game.add.button(10, 600, 'switch', this.switchClick, this, 2, 1, 0);
                me.switch.scale.setTo(0.32, 0.32);
            } else {
                game.switchOn = true;
                me.switch = me.game.add.button(10, 600, 'switch-on', this.switchClick, this, 2, 1, 0);
                me.switch.scale.setTo(0.32, 0.32);
            }
        }
        else {
            return;
        }
    }

    deleteRow(tile) {
        let pos = this.getTilePos(tile);

        for (let i = 0; i < this.gridSize.w; i++) {
            this.removeTile(game.tileGrid[i][pos.y]);
            console.log("Removed tile from row: " + game.tileGrid[i][pos.y] + "; x: " + game.tileGrid[i] + "; y: " + [pos.y])
        }
        this.decrementMoves(2);
        this.incrementScore(6);
    }

    deleteCol(tile) {
        let pos = this.getTilePos(tile);
        console.log(pos)

        for (let i = 0; i < this.gridSize.h; i++) {
            this.removeTile(game.tileGrid[pos.x][i]);
        }
        this.decrementMoves(2);
        this.incrementScore(9);
    }

    saveGameState() {
        //console.log(game.tileGrid);
        let savedData = {};
        let tileState = [];
        for (var i = 0; i < this.gridSize.w; i++) {
            let tileColumn = [];
            for (let j = 0; j < this.gridSize.h; j++) {
                tileColumn[j] = game.tileGrid[i][j].tileType;
            }
            tileState[i] = tileColumn;
        }
        savedData['tileState'] = tileState;
        savedData['level'] = this.getLevel();
        savedData['score'] = game.score;
        savedData['moves'] = game.moves;
        savedData['tile1Count'] = this.tile1Count;
        savedData['tile2Count'] = this.tile2Count;
        savedData['tile3Count'] = this.tile3Count;
        savedData['unlockNextLevelIfGetToken'] = game.unlockNextLevelIfGetToken;


        this.ajaxPost('ajax.php', {
            action: 'saveGameState',
            data: JSON.stringify(savedData)
        }).then((resp) => {
            if (resp.success) {
                console.log("\n\n Game saved \n\n");
            }
            else {
                console.log("\n\n Game saving failure \n\n");

            }
        }
        );
    }

}