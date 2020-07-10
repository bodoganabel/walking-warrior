class BaseLevel extends BaseState {
    constructor(game) {
        super(game);
        game.score = 0;
        this.tileOffset = 200;
        this.tileHeight = this.tileWidth = 200;


        //regex: game.tileGrid.*=
        this.gridSize = { w: 6, h: 9 };
        //game.TileGrid
        game.tileGrid = new Array(this.gridSize.w); //Nulling the grid will happen at init()

        //console.log(game.tileGrid[1]);
        this.tiles = [];

        this.tileTypes = LVL.tileTypes;

        this.deleteOn = false;
        this.switchOn = false;

        this.clickedPos = { x: 0, y: 0 };
        this.activeTile1 = this.activeTile2 = null;

        //to init
        game.score = null;
        game.moves = null;

        //from globals
        this.dedicatedTileTypes = null;
        this.scoreToFinish = null;

        this.tileState = null;
        game.counter = new ScoreCounter();

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
        game.gameState = 'waitInput'; //It can be: waitInput

        //force unblock user input
        if (!game.addedDebugKeys) {

            game.addedDebugKeys = true;

            document.addEventListener('keyup', (event) => {
                const keyName = event.key;
                if (keyName == 'f') {
                    game.gameState = 'waitInput';
                    //console.log("Game forced into waitInput state.")
                }

                if (keyName == 'd') {

                    //console.log("Game state: " + game.gameState);
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


        //If you add multiple timed effect, you need to identify which one finishes last in order to continue the program.
        // if more events are awaiting, then each call only decreases this number below, and only at the last call will the function be executed.
        game.EventsWaitingCounter = 0;
        game.timeoutReleaseEventsWaitingCounter = 0;
        game.NextLevelEventsCounter = 0;


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
        let level = this.getLevel();
        this.dedicatedTileTypes = LVL[level].dedicatedTileTypes || [];

        //ha van savedData a mentésből, akkor abból initelünk
        if (typeof savedData == 'undefined') {
            this.tileState = null;
            game.moves = LVL[level].moves;
            game.score = 0;
            console.log("type of saved data is undefined")
        } else {
            this.tileState = savedData.tileState;
            game.moves = savedData.moves;
            game.score = savedData.score;
            this.tile1Count == savedData.tile1Count;
            this.tile2Count == savedData.tile2Count;
            this.tile3Count == savedData.tile3Count;
            console.log("type of saved data is anything but undefined")

        }

        this.ajaxPost('ajax.php', { action: 'beforeLevel' })
            .then((resp) => {

                if (resp.success == true) {
                    this.beforeLevel(resp.data);
                } else {
                    alert('Oops, something went wrong when fetching data from the server.');
                }
            })
            .catch((error) => {
                alert('Oops, something went wrong when fetching data from the server.');
            })
    }

    beforeLevel(data) {
        console.log("before level");
        let gameLevel = parseInt(data.gamelevel);
        //actual level
        let actLevel = parseInt(this.getLevelNumber());

        if (parseInt(data.tester) === 1) {
            return;
        }

        if (gameLevel < actLevel) {
            this.game.state.start('Error', true, false, 'Unfortunately, you have not reached this level yet. Plays some more and come back!');
            return;
        }


    }

    getLevel() {
        return this.constructor.name;
    }

    create() {
        console.log("create");

        super.create();


        musicPlayer.playAudio('game');

        let button = this.game.add.button(10, 1600, 'backbutton', function () {
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

        this.setupTiles();
        this.checkScore();
        console.log("level loaded successful. Saving data...")
        this.saveGameState();
    }

    isCompleted() {
        return game.score >= this.scoreToFinish;
    }

    checkScore() {
        //lépések és pontok ellenőerzése
        console.log("checkin score")
        if (this.isCompleted()) {
            if (this.getLevel() == 'SandBox') {
                this.game.state.start('Menu');
                return;
            }

            game.NextLevelEventsCounter++
            this.game.time.events.add(400, () => {

                game.NextLevelEventsCounter--;

                if (game.NextLevelEventsCounter > 0) {
                    return;
                }
                console.log("Executing next level validation process...\n\n")
                let nextLevel = parseInt(this.getLevel().substring(5)) + 1; //pl.: Level1 --> 1
                this.saveGameState();
                if (nextLevel < 23) {

                    let hastoken = false;
                    this.ajaxPost('ajax.php', { action: 'getToken' }).then(
                        (resp) => {
                            if (resp.success) {
                                hastoken = (resp.data == 1)?true:false;
                                console.log("Finished level. User token: ");
                                console.log(hastoken);
                                console.log(resp.data);
                                console.log(resp);
                                // If level is 2 or below, no token needed to play next level.
                                if (nextLevel < 4) {
                                    this.game.state.start('NextLevel', true, false, nextLevel)

                                }
                                // Remove user's token if level > 3. If no token, send him walk.
                                else if (hastoken) {
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
                                    this.game.state.start('Error', true, false, 'Congratulations! You cleared all levels so far. In order to unlock the next level, please walk 500 steps with the Pedometer app and earn 1 token.');
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

        if (game.moves <= 0) {
            this.game.state.start('Error', true, false, 'You have lost all your moves.');
            return;
        }
    }

    //After pla
    afterSwap() {
        //csere után megnézzük, hogy van-e match a grid-ben
        game.EventsWaitingCounter--
        if (game.EventsWaitingCounter > 0) {
            return
        }

        game.gameState = 'afterSwap'

        game.EventsWaitingCounter++;
        let hasMatch = this.checkMatch('afterSwap')

        //If no match at all
        if (!hasMatch) {
            //ha be van kapcsolva a switch, akkor nem cseréljük vissza a cellákat
            if (this.switchOn) {
                this.switchTiles();
            } else {
                //call swapback
                console.log("Swapping back because no match found.");
                this.swapTiles();
            }
        }
    }

    update() {

        //a felhasználó ilyenkor éppen lenyomta az egyik tile-t, és ráhuzza egy másikra
        if (this.activeTile1 && !this.activeTile2) {
            let mousePos = {
                x: this.game.input.x - this.tileOffset, //el van tolva a tile grid jobbra tileOffsetnyit
                y: this.game.input.y
            };

            let hoverPos = {
                x: Math.floor(mousePos.x / this.tileWidth),
                y: Math.floor(mousePos.y / this.tileHeight)
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
                game.gameState = 'swappingToCheck';
                this.activeTile2 = game.tileGrid[hoverPos.x][hoverPos.y];
                this.swapTiles();
            }
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
                y: (this.activeTile1.y - this.tileHeight / 2) / this.tileHeight
            };
            let tile2Pos = {
                x: (this.activeTile2.x - this.tileWidth / 2) / this.tileWidth,
                y: (this.activeTile2.y - this.tileHeight / 2) / this.tileHeight
            };

            var t1Index = {
                x: ((this.activeTile1.x - this.tileOffset) - this.tileWidth / 2) / this.tileWidth,
                y: (this.activeTile1.y - this.tileHeight / 2) / this.tileHeight
            };
            var t2Index = {
                x: ((this.activeTile2.x - this.tileOffset) - this.tileWidth / 2) / this.tileWidth,
                y: (this.activeTile2.y - this.tileHeight / 2) / this.tileHeight
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
                y: tile2Pos.y * this.tileHeight + (this.tileHeight / 2)
            }, 200, Phaser.Easing.Linear.In, true);
            tween = this.game.add.tween(this.activeTile2);
            tween.to({
                x: tile1Pos.x * this.tileWidth + (this.tileWidth / 2),
                y: tile1Pos.y * this.tileHeight + (this.tileHeight / 2)
            }, 200, Phaser.Easing.Linear.In, true);

            this.activeTile1 = game.tileGrid[t1Index.x][t1Index.y];
            this.activeTile2 = game.tileGrid[t2Index.x][t2Index.y];
            //is this first swap of actual player action?
            if (game.gameState == 'swappingToCheck') {
                game.EventsWaitingCounter++;
                tween.onComplete.add(
                    () => {
                        this.afterSwap()
                    }
                )
            }
            else if (game.gameState == 'afterSwap') {
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

        game.EventsWaitingCounter--;
        if (game.EventsWaitingCounter > 0) {
            return false;
        }
        if (whoCalledMe) {
            console.log("Check called by: " + whoCalledMe);
        }
        //console.log("Game state: " + game.gameState);
        let matchGroups = ShapeMatcher.getMatches(game.tileGrid, this.gridSize.w, this.gridSize.h);
        let gotMatches = (matchGroups.length > 0) ? true : false;

        if (gotMatches) {

            game.gameState = 'noMatch';
            //console.log("Game state: " + game.gameState);
            this.decrementMoves();
            this.removeMatches(matchGroups);
            this.dropTiles();

            return true;
        }
        else {
            //If this function returns false, it means: no mmore matches is going to be found, close this swipe. BUT!! NEWLY CREATED TILES MAY FALL
            return false;
        }
    }


    regenerateTiles(whoCalledMe) {

        game.EventsWaitingCounter--;
        if (game.EventsWaitingCounter > 0) {
            return false;
        }
        //console.log("This counter (game.EventWaitingCounter) should always be 0. Now its value is: " + game.EventsWaitingCounter + "and called by: " + whoCallsMe)
        //console.log("so far so good")
        this.showDebugTile();

        game.gameState = 'checkingScore'
        this.checkScore();

        game.gameState = 'regenerate'
        let events = this.game.time.events
        events.add(300, () => {
            this.fillTiles();
        })
        return true;
    }





    removeMatches(matchGroups) {
        if (matchGroups.length < 1) return;


        game.gameState = 'remove';

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
                        this.addTile(pos.x, pos.y, bonusType);
                    } else {

                    }
                }

                //use a bonus cell in a match - 1 point + 1 move (we increment by 2 because we just decreased by one with the current move)
                if (hasBonusTile) {
                    this.incrementScore();
                    this.incremenentMoves(2);
                }
            }
        }

        //console.log("pos: remove tiles done. Grid:")
        this.showDebugTile();
    }



    fillTiles() {
        //console.log("pos: fill tiles")

        for (let i = 0; i < this.gridSize.w; ++i) {
            for (let j = 0; j < this.gridSize.h; ++j) {
                if (game.tileGrid[i][j].tileType == '-1') {

                    this.addTile(i, j);
                }
            }
        }
        //console.log("pos: after filled tiles")
    }

    dropTiles() {

        game.gameState = 'drop'

        for (let i = this.gridSize.w - 1; i >= 0; i--) {
            for (let j = this.gridSize.h - 1; j >= 0; --j) {

                //Actual tile is zero
                if (game.tileGrid[i][j].tileType == '-1') {
                    //console.log("found zero")
                    //ha a legtetején vagyunk az oszlopnak
                    if (j == 0) {

                        game.EventsWaitingCounter++;
                        this.game.time.events.add(200, () => {
                            this.regenerateTiles("dropTiles")
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
                                    y: this.tileHeight * j + (this.tileHeight / 2)
                                }, 200, Phaser.Easing.Linear.In, true)

                                game.EventsWaitingCounter++;
                                tween.onComplete.add(
                                    () => {
                                        //console.log("try call regenerateTiles")
                                        this.regenerateTiles("dropTiles")
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
        if (!tile) return;

        let pos = this.getTilePos(tile);
        this.tiles.remove(tile);
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

        console.log("Wathcout!!!!!!!!!!!4");
        console.log(this.tileState);
        this.showDebugTile();

        this.tiles = this.game.add.group();
        //console.log("tileState to load map from: ")
        //console.log(this.tileState);
        for (let i = 0; i < this.gridSize.w; ++i) {
            for (let j = 0; j < this.gridSize.h; ++j) {
                //ha van tileStateünk mentésből, akkor abból töltjük fel a gridet
                if (this.tileState == null) {
                    this.addTile(i, j);
                } else {
                    this.addTile(i, j, this.tileState[i][j]);
                }
            }
        }

        let events = this.game.time.events
        events.add(2000, () => {
            game.EventsWaitingCounter++;
            if (!this.checkMatch('setupTiles')) {
                this.tileUp();
            }
        })
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
            ty = j * this.tileHeight + (this.tileHeight / 2);
        }

        let tile = this.tiles.create(tx, ty, tileNumber.toString());

        if (type == 0) {
            let tween = this.game.add.tween(tile);
            tween.to({
                y: j * this.tileHeight + (this.tileHeight / 2)
            }, 100, Phaser.Easing.Linear.In, true)

            /*
            BUGFIX:
            When we deleted matching tiles, we need to create new ones. Codes below runs only when the last regenerated tile is landed to its place
            */
            game.EventsWaitingCounter++;
            tween.onComplete.add(
                () => {
                    this.checkNewMatchesAfterRegeneration('addTile');
                }
            )
        }
        tile.anchor.setTo(0.5, 0.5);
        tile.inputEnabled = true;
        tile.tileType = tileNumber;
        tile.events.onInputDown.add(this.tileDown, this);
        tile.inMatch = false;
        game.tileGrid[i][j] = tile;



        return tile;
    }

    checkNewMatchesAfterRegeneration(whoCallsMe) {

        game.EventsWaitingCounter--;
        if (game.EventsWaitingCounter > 0) {
            return false;
        }
        //console.log("This counter (game.EventWaitingCounter) should always be 0. Now its value is: " + game.EventsWaitingCounter + "and called by: " + whoCallsMe)
        //console.log("seems okay")

        this.updateObjective();

        //check again if there is match. If no more, finish up the player action aka. "the swipe".
        game.EventsWaitingCounter++;
        if (!this.checkMatch('checkNewMatchesAfterRegeneration')) {
            //console.log("All regeneration finished.");
            this.tileUp();
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
        if (game.gameState == 'gotInput') {
            console.log("tile touch timed out");
            this.tileUp();
        }
    }

    tileDown(tile) {

        //Prevent user: free swap by double clicking  
        if (game.gameState != 'waitInput') {
            console.log("click blocked");
            return;
        }

        let events = this.game.time.events
        events.add(500, () => {
            game.timeoutReleaseEventsWaitingCounter++;
            this.timeoutRelease();
        })

        //console.log("Game State: " + game.gameState);
        //console.log("tile: ")
        //console.log(tile)
        //console.log()

        this.clickedPos.x = (tile.x - this.tileOffset - this.tileWidth / 2) / this.tileWidth;
        this.clickedPos.y = (tile.y - this.tileHeight / 2) / this.tileHeight;

        if (tile.tileType == 'potassium') {
            game.gameState = 'deleteRowByPotassium'
            this.deleteRow(tile);
            return;
        }

        if (tile.tileType == 'magnesium') {
            game.gameState = 'deleteColumnByMagnesium'
            this.deleteCol(tile);
            return;
        }

        //tile törlése, -2 move
        if (this.deleteOn) {
            this.deleteTile(tile);
            this.deleteClick();
            return;
        }

        game.gameState = 'gotInput';
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
        game.score += plus;
        this.scoreLabel.text = "Score: " + game.score;
    }

    decrementMoves(minus = 1) {
        game.moves -= minus;
        game.movesLabel.text = game.moves;
    }

    incremenentMoves(plus = 1) {
        game.moves += plus;
        game.movesLabel.text = game.moves;
    }


    createObjective() {
        this.objectiveLabel = this.game.add.text(20, 1800, "", {
            font: "70px Acme",
            fill: "#ff2800"
        });
    }

    updateObjective() {
        this.objectiveLabel.text = `Reach ${this.scoreToFinish} points!`;
    }

    getTilePos(tile) {
        return {
            x: (tile.x - this.tileOffset - this.tileWidth / 2) / this.tileWidth,
            y: (tile.y - this.tileHeight / 2) / this.tileHeight
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
        game.gameState = 'waitInput';
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

    deleteTile(tile) {
        this.removeTile(tile);
        this.addTile(this.getTilePos(tile).x, this.getTilePos(tile).y, 0);


        this.game.time.events.add(650, () => {
            game.EventsWaitingCounter++;
            if (!this.checkMatch('deleteTile')) {
                this.tileUp('delete tile');
            }
        });
    }

    createSwitch() {
        let me = this;
        me.switch = me.game.add.button(10, 600, 'switch', this.switchClick, this, 2, 1, 0);
        me.switch.scale.setTo(0.32, 0.32);
    }

    switchClick() {
        let me = this;
        if (me.switchOn) {
            me.switchOn = false;
            me.switch = me.game.add.button(10, 600, 'switch', this.switchClick, this, 2, 1, 0);
            me.switch.scale.setTo(0.32, 0.32);
        } else {
            me.switchOn = true;
            me.switch = me.game.add.button(10, 600, 'switch-on', this.switchClick, this, 2, 1, 0);
            me.switch.scale.setTo(0.32, 0.32);
        }
    }

    switchTiles() {
        this.switchClick();
        this.decrementMoves(3);
        this.tileUp();
    }

    deleteRow(tile) {
        let pos = this.getTilePos(tile);

        for (let i = 0; i < this.gridSize.w; i++) {
            this.deleteTile(game.tileGrid[i][pos.y]);
        }
        this.decrementMoves(2);
        this.incrementScore(6);
    }

    deleteCol(tile) {
        let pos = this.getTilePos(tile);
        console.log(pos)

        for (let i = 0; i < this.gridSize.h; i++) {
            this.deleteTile(game.tileGrid[pos.x][i]);
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


        this.ajaxPost('ajax.php', {
            action: 'saveGameState',
            data: JSON.stringify(savedData)
        });
    }

}