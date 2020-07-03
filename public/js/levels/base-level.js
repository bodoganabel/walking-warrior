class BaseLevel extends BaseState {
    constructor(game) {
        super(game);
        this.score = 0;
        this.tileOffset = 200;
        this.tileHeight = this.tileWidth = 200;


        //regex: game.tileGrid.*=
        this.gridSize = { w: 6, h: 9 };
        game.tileGrid = new Array(this.gridSize.w);
        for (let i = 0; i < this.gridSize.w; i++) {
            game.tileGrid[i] = new Array(this.gridSize.h);
            for (let j = 0; j < this.gridSize.h; j++) {
                game.tileGrid[i][j] = { tileType: '-1' };
            }
        }

        console.log(game.tileGrid[1]);
        this.tiles = [];

        this.tileTypes = LVL.tileTypes;

        this.deleteOn = false;
        this.switchOn = false;

        this.clickedPos = { x: 0, y: 0 };
        this.activeTile1 = this.activeTile2 = null;

        //to init
        this.score = null;
        this.moves = null;

        //from globals
        this.dedicatedTileTypes = null;
        this.scoreToFinish = null;

        this.tileState = null;
        this.counter = new ScoreCounter();

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
                    console.log("Game forced into waitInput state.")
                }

                if (keyName == 'd') {

                    console.log("Game state: " + game.gameState);
                    console.log("active tile1:")
                    console.log(this.activeTile1);
                    console.log("active tile1:")
                    console.log(this.activeTile2);
                }

                if (keyName == 'g') {
                    this.showDebugTile()
                }

            }, false);

        }

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

    init(savedData) {
        let level = this.getLevel();
        this.dedicatedTileTypes = LVL[level].dedicatedTileTypes || [];

        //ha van savedData a mentésből, akkor abból initelünk
        if (typeof savedData == 'undefined') {
            this.tileState = null;
            this.moves = LVL[level].moves;
            this.score = 0;
        } else {
            this.tileState = savedData.tileState;
            this.moves = savedData.moves;
            this.score = savedData.score;
            this.tile1Count == savedData.tile1Count;
            this.tile2Count == savedData.tile2Count;
            this.tile3Count == savedData.tile3Count;
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
    }

    isCompleted() {
        return this.score >= this.scoreToFinish;
    }

    checkScore() {
        //lépések és pontok ellenőerzése
        if (this.isCompleted()) {
            if (this.getLevel() == 'SandBox') {
                this.game.state.start('Menu');
                return;
            }

            this.game.time.events.add(400, () => {
                let nextLevel = parseInt(this.getLevel().substring(5)) + 1; //pl.: Level1 --> 1
                this.saveGameState();
                if (nextLevel < 23) {
                    this.game.state.start('NextLevel', true, false, nextLevel);
                } else {
                    this.game.state.start('Menu');
                }
            });
            return;
        }

        if (this.moves <= 0) {
            this.ajaxPost('ajax.php', { action: 'removeTokens' });
            this.game.state.start('Error', true, false, 'You have lost all your tokens. Open the WW Pedometer App and get a token by walking!');
            return;
        }
    }

    afterSwap() {
        //csere után megnézzük, hogy van-e match a grid-ben
        let hasMatch = this.checkMatch()

        //If no match at all
        if (!hasMatch) {
            //ha be van kapcsolva a switch, akkor nem cseréljük vissza a cellákat
            if (this.switchOn) {
                this.switchTiles();
            } else {
                //call swapback
                console.log("Swapping back because no match found.");
                this.swapTiles(() => { this.tileUp() });
            }
        }
    }

    update() {

        this.checkScore()

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
                this.activeTile2 = game.tileGrid[hoverPos.x][hoverPos.y];
                this.swapTiles(() => { this.afterSwap() });
            }
        }

    }

    swapTiles(callback) {
        console.log("swapping tiles")
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
            if (callback) {
                tween.onComplete.add(callback)
            }

        }
    }

    checkMatch() {
        game.gameState = 'check';
        console.log("Game state: " + game.gameState);
        let matchGroups = ShapeMatcher.getMatches(game.tileGrid, this.gridSize.w, this.gridSize.h);
        let gotMatches = (matchGroups.length > 0) ? true : false;

        if (gotMatches) {

            game.gameState = 'remove';
            console.log("Game state: " + game.gameState);
            this.decrementMoves();
            this.removeMatches(matchGroups);
            console.log("pos: checkmatch after remove")
            this.dropTiles();

            return true;
        }
        else {
            //If this function returns false, it means: no mmore matches is going to be found, close this swipe. BUT!! NEWLY CREATED TILES MAY FALL
            return false;
        }
    }


    regenerateTiles() {
        let events = this.game.time.events
        console.log("pos: previously added regenerate function now executes")
        events.add(300, () => {
            this.fillTiles();
        })
    }





    removeMatches(matchGroups) {
        if (matchGroups.length < 1) return;

        for (let group of matchGroups) {

            for (let match of group) {
                let bonusType = 0;
                if (match[0].lShape == true) {
                    bonusType = 'magnesium';
                    this.counter.increment('L-shape');
                    this.incrementScore(15);
                } else if (match[0].tShape == true) {
                    bonusType = 'potassium';
                    this.counter.increment('T-shape');
                    this.incrementScore(15);
                } else if (match.length >= 4) {
                    if (this.isBonusTile(match[0])) {
                        bonusType = match[0].tileType;
                    } else if (this.isDefaultTile(match[0])) {
                        bonusType = match[0].tileType + 6;
                    }
                    this.counter.increment('bonus-count');

                    //create a bonus cell - 5 point
                    this.incrementScore(5);
                } else {
                    //3-cell match - 1 point
                    this.incrementScore();
                }


                if (match.length >= 5 && !match[0].tShape && !match[0].lShape) {
                    this.counter.increment('5-in-a-row');
                }

                this.counter.increment(match[0].tileType + '-match', match.length);

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
        console.log("pos: over removefor")
    }



    fillTiles() {
        console.log("pos: fill tiles")
        let lastRegeneratedTile = {};
        let dbg_count = 0;

        console.log(game.tileGrid)
        this.showDebugTile();
        for (let i = 0; i < this.gridSize.w; ++i) {
            for (let j = 0; j < this.gridSize.h; ++j) {
                console.log(" ")
                console.log(game.tileGrid[i][j].tileType)
                console.log(game.tileGrid[i][j].tileType.toString())
                if (game.tileGrid[i][j].tileType.toString() == '-1') {
                    console.log("true");
                    console.log(game.tileGrid[i][j].tileType.toString())
                    console.log("i: "+i+", j: "+j)
                    lastRegeneratedTile = { i: i, j: j };
                    dbg_count++;
                }
            }
        }
        console.log("number of regenerating tiles: ")
        console.log(dbg_count)

        for (let i = 0; i < this.gridSize.w; ++i) {
            for (let j = 0; j < this.gridSize.h; ++j) {
                if (game.tileGrid[i][j].tileType == '-1') {

                    //is this the last tile to regenerate
                    if (lastRegeneratedTile.i == i && lastRegeneratedTile.j == j) {
                        this.addTile(i, j, 0, true);
                        console.log("i should see this ony once")
                    }
                    else {
                        this.addTile(i, j);
                    }
                }
            }
        }
        console.log("pos: after filled tiles")
    }

    dropTiles() {

        let lastDropper = undefined;

        //find out who is the last tile to give only him callback.
        for (let i = 0; i < this.gridSize.w; ++i) {
            for (let j = this.gridSize.h - 1; j > 0; --j) {
                if (game.tileGrid[i][j].tileType == '-1' && game.tileGrid[i][j - 1].tileType != '-1') {
                    lastDropper = { i: i, j: j }
                }
            }
        }

        console.log("got last dropper:")
        console.log(lastDropper)




        for (let i = 0; i < this.gridSize.w; ++i) {
            for (let j = this.gridSize.h - 1; j > 0; --j) {
                if (game.tileGrid[i][j].tileType == '-1' && game.tileGrid[i][j - 1].tileType != '-1') {


                    let tempTile = game.tileGrid[i][j - 1].tileType;
                    game.tileGrid[i][j].tileType = tempTile;
                    game.tileGrid[i][j - 1].tileType = '-1';

                    let tween;
                    tween = this.game.add.tween(tempTile)
                    tween.to({
                        y: this.tileHeight * j + (this.tileHeight / 2)
                    }, 100, Phaser.Easing.Linear.In, true)

                    //if this is the last dropping tile, add code to run after last drop.
                    console.log({ i: i, j: j })

                    if (lastDropper.i == i && lastDropper.j == j) {
                        console.log("last dropper found.")
                        tween.onComplete.add(
                            () => {

                                game.gameState = 'regenerate';
                                console.log("Game state: " + game.gameState);
                                this.regenerateTiles();

                                console.log("pos: delayed event added at checkmatch")
                            }

                        )
                    }


                    j = game.tileGrid[i].length;

                }
            }
        }
    }



    getMatches(col, row) {
        let matches = ShapeMatcher.matchAll(game.tileGrid, col, row, this.gridSize.w, this.gridSize.h);
        if (matches.length > 0) {
            console.log(matches);
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
        this.tiles = this.game.add.group();
        for (let i = 0; i < this.gridSize.w; ++i) {
            for (let j = 0; j < this.gridSize.h; ++j) {
                console.log(`i: ${i} i: ${j} `)
                //ha van tileStateünk mentésből, akkor abból töltjük fel a gridet
                if (this.tileState == null) {
                    this.addTile(i, j);
                } else {
                    this.addTile(i, j, this.tileState[i][j]);
                }
            }
        }

        let me = this;
        this.game.time.events.add(650, () => {
            me.checkMatch();
        })
    }

    addTile(i, j, type = 0, isLastRegeneratedTile = false) {
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
            }, 1000, Phaser.Easing.Linear.In, true)

            /*
            BUGFIX:
            When we deleted matching tiles, we need to create new ones. Codes below runs only when the last regenerated tile is landed to its place
            */
            if (isLastRegeneratedTile)
                tween.onComplete.add(
                    () => {
                        this.updateObjective();
                        //check again if there is match. If no more, finish up the swipe.
                        if (!this.checkMatch()) {
                            console.log("All regeneration finished.");
                            this.tileUp();
                        }
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

    randomizeTile() {
        let tileTypePool = this.tileTypes;

        if (Math.random() < 0.3) {
            tileTypePool = this.tileTypes.concat(this.dedicatedTileTypes);

        }
        let rnd = Math.floor(Math.random() * tileTypePool.length);

        return tileTypePool[rnd];
    }

    tileDown(tile) {

        //Prevent user: free swap by double clicking  
        if (game.gameState != 'waitInput') {
            console.log("click blocked");
            return;
        }

        game.gameState = 'gotInput';
        console.log("Game State: " + game.gameState);
        console.log("tile: ")
        console.log(tile)
        console.log()

        if (tile.tileType == 'potassium') {
            this.deleteRow(tile);
            return;
        }

        if (tile.tileType == 'magnesium') {
            this.deleteCol(tile);
            return;
        }

        //tile törlése, -2 move
        if (this.deleteOn) {
            this.deleteTile(tile);
            this.deleteClick();
            return;
        }

        this.activeTile1 = tile;



        this.clickedPos.x = (tile.x - this.tileOffset - this.tileWidth / 2) / this.tileWidth;
        this.clickedPos.y = (tile.y - this.tileHeight / 2) / this.tileHeight;
    }

    createUi() {
        //moves
        this.game.add.text(10, 80, "0", {
            font: '50px Acme',
            fill: "#ff2800"
        }).text = 'Moves:';

        this.movesLabel = this.game.add.text(10, 120, "0", {
            font: '100px Acme',
            fill: "#ff2800"
        });
        this.movesLabel.text = this.moves;

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
        this.scoreLabel.text = "Score: " + this.score;

    }

    getLevelNumber() {
        return this.getLevel().substring(5);
    }

    incrementScore(plus = 1) {
        this.score += plus;
        this.scoreLabel.text = "Score: " + this.score;
    }

    decrementMoves(minus = 1) {
        this.moves -= minus;
        this.movesLabel.text = this.moves;
    }

    incremenentMoves(plus = 1) {
        this.moves += plus;
        this.movesLabel.text = this.moves;
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
    tileUp() {

        game.gameState = 'waitInput';
        console.log("Simple switch done: has no match. Game state: " + game.gameState);
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
        this.addTile(pos.x, pos.y, 0);


        this.game.time.events.add(650, () => {
            if (!this.checkMatch()) {
                this.tileUp();
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

        for (let i = 0; i < this.gridSize.h; i++) {
            this.deleteTile(game.tileGrid[pos.x][i]);
        }
        this.decrementMoves(2);
        this.incrementScore(9);
    }

    saveGameState() {
        console.log(game.tileGrid);
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
        savedData['score'] = this.score;
        savedData['moves'] = this.moves;
        savedData['tile1Count'] = this.tile1Count;
        savedData['tile2Count'] = this.tile2Count;
        savedData['tile3Count'] = this.tile3Count;


        this.ajaxPost('ajax.php', {
            action: 'saveGameState',
            data: JSON.stringify(savedData)
        });
    }

}