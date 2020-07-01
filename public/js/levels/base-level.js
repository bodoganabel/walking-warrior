class BaseLevel extends BaseState {
    constructor(game) {
        super(game);
        this.score = 0;
        this.tileOffset = 200;
        this.tileHeight = this.tileWidth = 200;
        this.tileGrid = [];
        this.tiles = [];
        this.gridSize = { w: 6, h: 9 };
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
    }


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

    update() {
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
            // if (!(hoverPosY > me.tileGrid[0].length - 1 || hoverPosY < 0) && !(hoverPosX > me.tileGrid.length - 1 || hoverPosX < 0)) {
            if (hoverPos.x > this.gridSize.x || hoverPos.x < 0 || hoverPos.y > this.gridSize.y || hoverPos.y < 0) {
                this.tileUp();
                return;
            }

            //megnézzük, hogy a user elhuzta-e az ujjat legalább egy tile szélességre vagy magasságra
            if ((Math.abs(diff.x) == 1 && diff.y == 0) || (Math.abs(diff.y) == 1 && diff.x == 0)) {
                this.activeTile2 = this.tileGrid[hoverPos.x][hoverPos.y];
                this.swapTiles();

                //csere után megnézzük, hogy van-e match a grid-ben
                this.game.time.events.add(650, () => {
                    let gotMatches = this.checkMatch();

                    if (gotMatches) {
                        this.decrementMoves();
                    }
                });
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
                this.tileGrid[t1Index.x][t1Index.y] = this.activeTile2;
                this.tileGrid[t2Index.x][t2Index.y] = this.activeTile1;
            } catch (e) {
                console.warn('Error swapping the tiles...');
            }

            //Actually move them on the screen
            this.game.add.tween(this.activeTile1).to({
                x: tile2Pos.x * this.tileWidth + (this.tileWidth / 2),
                y: tile2Pos.y * this.tileHeight + (this.tileHeight / 2)
            }, 200, Phaser.Easing.Linear.In, true);
            this.game.add.tween(this.activeTile2).to({
                x: tile1Pos.x * this.tileWidth + (this.tileWidth / 2),
                y: tile1Pos.y * this.tileHeight + (this.tileHeight / 2)
            }, 200, Phaser.Easing.Linear.In, true);

            this.activeTile1 = this.tileGrid[t1Index.x][t1Index.y];
            this.activeTile2 = this.tileGrid[t2Index.x][t2Index.y];
        }
    }

    checkMatch() {
        let matchGroups = ShapeMatcher.getMatches(this.tileGrid, this.gridSize.w, this.gridSize.h);

        if (matchGroups.length == 0) {
            //ha be van kapcsolva a switch, akkor nem cseélrjük vissza a cellákat
            if (this.switchOn) {
                this.switchTiles();
            } else {
                this.swapTiles();
            }
        } else {
            this.removeMatches(matchGroups);
        }
        this.tileUp();

        return matchGroups.length > 0;
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
                    let newTile = null;
                    if (i == 3) {
                        newTile = this.addTile(pos.x, pos.y, bonusType);
                    } else {
                        // newTile = this.addTile(pos.x, pos.y, 0);
                    }
                    this.tileGrid[pos.x][pos.y] = newTile;
                }

                //use a bonus cell in a match - 1 point + 1 move (we increment by 2 because we just decreased by one with the current move)
                if (hasBonusTile) {
                    this.incrementScore();
                    this.incremenentMoves(2);
                }
            }
        }

        this.dropTiles();
        this.game.time.events.add(300, () => {
            this.fillTiles();
        })

        this.updateObjective();

        //miutan beraktuk az eltávolítottak helyere az uj tile-okat, megnézzük, hogy lett-e így új match
        let me = this;
        this.game.time.events.add(650, () => {
            me.checkMatch();
        });
    }

    fillTiles() {
        for (let i = 0; i < this.gridSize.w; ++i) {
            for (let j = 0; j < this.gridSize.h; ++j) {
                if (this.tileGrid[i][j] == null) {
                    this.tileGrid[i][j] = this.addTile(i, j);
                }
            }
        }
    }

    dropTiles() {
        for (let i = 0; i < this.gridSize.w; ++i) {
            for (let j = this.gridSize.h - 1; j > 0; --j) {
                if (this.tileGrid[i][j] == null && this.tileGrid[i][j - 1] != null) {
                    let tempTile = this.tileGrid[i][j - 1];
                    this.tileGrid[i][j] = tempTile;
                    this.tileGrid[i][j - 1] = null;

                    this.game.add.tween(tempTile).to({
                        y: this.tileHeight * j + (this.tileHeight / 2)
                    }, 100, Phaser.Easing.Linear.In, true)
                    j = this.tileGrid[i].length;
                }
            }
        }
    }

    getMatches(col, row) {
        let matches = ShapeMatcher.matchAll(this.tileGrid, col, row, this.gridSize.w, this.gridSize.h);
        if (matches.length > 0) {
            console.log(matches);
        }

        return matches;
    }

    // isMatchingTiles(tile1, tile2) {
    //     if (!tile1 || !tile2 || tile1.inMatch || tile2.inMatch) {
    //         return false;
    //     }

    //     let c1 = tile1.tileType == tile2.tileType;
    //     let c2 = tile1.tileType == tile2.tileType + 6;
    //     let c3 = tile1.tileType == tile2.tileType - 6;

    //     return c1 || c2 || c3;
    // }

    removeTile(tile) {
        if (!tile) return;

        let pos = this.getTilePos(tile);
        this.tiles.remove(tile);
        this.tileGrid[pos.x][pos.y] = null;
    }

    setupTiles() {
        this.tiles = this.game.add.group();

        for (let i = 0; i < this.gridSize.w; ++i) {
            this.tileGrid[i] = [];

            for (let j = 0; j < this.gridSize.h; ++j) {
                let tile;
                //ha van tileStateünk mentésből, akkor abból töltjük fel a gridet
                if (this.tileState == null) {
                    tile = this.addTile(i, j);
                } else {
                    tile = this.addTile(i, j, this.tileState[i][j]);
                }
                this.tileGrid[i][j] = tile;
            }
        }

        let me = this;
        this.game.time.events.add(650, () => {
            me.checkMatch();
        })
    }

    addTile(i, j, type = 0) {
        // ha már van ezen a pozíción tile, akkor ne írja felül
        // így meg lehet matchek-nél akadályozni, hogy két match kereszteződésénél 2 új tile legyen berakva
        if (this.tileGrid[i][j] != null) {
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
            this.game.add.tween(tile).to({
                y: j * this.tileHeight + (this.tileHeight / 2)
            }, 200, Phaser.Easing.Linear.In, true)
        }
        // .onComplete.add(function() {
        // 	me.correctTilePosition();
        // })
        tile.anchor.setTo(0.5, 0.5);
        tile.inputEnabled = true;
        tile.tileType = tileNumber;
        tile.events.onInputDown.add(this.tileDown, this);
        // tile.events.onInputUp.add(this.tileUp, this);
        tile.inMatch = false;

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

    tileDown(tile, pointer) {
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

    tileUp() {
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
        let pos = this.getTilePos(tile);
        this.removeTile(tile);
        let newTile = this.addTile(pos.x, pos.y, 0);
        this.tileGrid[pos.x][pos.y] = newTile;


        this.game.time.events.add(650, () => {
            this.checkMatch();
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
    }

    deleteRow(tile) {
        let pos = this.getTilePos(tile);

        for (let i = 0; i < this.gridSize.w; i++) {
            this.deleteTile(this.tileGrid[i][pos.y]);
        }
        this.decrementMoves(2);
        this.incrementScore(6);
    }

    deleteCol(tile) {
        let pos = this.getTilePos(tile);

        for (let i = 0; i < this.gridSize.h; i++) {
            this.deleteTile(this.tileGrid[pos.x][i]);
        }
        this.decrementMoves(2);
        this.incrementScore(9);
    }

    saveGameState() {
        console.log(this.tileGrid);
        let savedData = {};
        let tileState = [];
        for (var i = 0; i < this.gridSize.w; i++) {
            let tileColumn = [];
            for (let j = 0; j < this.gridSize.h; j++) {
                tileColumn[j] = this.tileGrid[i][j].tileType;
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