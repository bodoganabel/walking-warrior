let WW = {
    gameConfig: {
        // width: window.innerWidth * window.devicePixelRatio,
        // height: window.innerHeight * window.devicePixelRatio,
        width: 1400,
        height: 1920,
        type: Phaser.CANVAS,
        scene: [],
    },
    gameVersion: 'v6.4', //Levels switched based on request.
    updateDate: 'Aug. 03., 2020',
    bugReportUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSeXguVIXKymvRkL_8kNKdFCKV_8kbb5VOpl_4re4dnuwtmtMw/viewform',
}

//1, 18, 13, 16, 8, 14, 6, 5, 19,  9, 21,  4, 20, 17, 15,  2,  7, 22, 23, 11, 10,  3, 12.
//1, 2 ,  3,  4, 5,  6, 7, 8,  9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23.

let LVL = {
    tileTypes: [1, 2, 3, 4, 5, 6],


    Level1: {
        scoreToFinish: 20,
        moves: 50
    },
    Level2: { //18
        moves: 40,
    },
    Level3: { //13
        dedicatedTileTypes: [15],
        moves: 20,
        hasSwitchButton: true,
        hasDeleteButton: true
    },
    Level4: { //16
        dedicatedTileTypes: [15],
        moves: 30,
        hasSwitchButton: true,
        hasDeleteButton: true
    },
    Level5: { //8
        moves: 30,
        hasSwitchButton: true
    },
    Level6: { //14
        moves: 30,
        hasSwitchButton: true
    },
    Level7: { //6
        moves: 35,
        hasSwitchButton: true,
        hasDeleteButton: true
    },
    Level8: { //5
        moves: 50
    },
    Level9: { //19
        moves: 40,
        hasSwitchButton: true,
        hasDeleteButton: true
    },
    Level10: { //9
        moves: 40,
        hasSwitchButton: true
    },
    Level11: { //21
        moves: 40
    },
    Level12: { //4
        dedicatedTileTypes: [15],
        moves: 50,
        hasSwitchButton: true,
        hasDeleteButton: true
    },
    Level13: { //20
        dedicatedTileTypes: [15],
        moves: 40,
        hasDeleteButton: true,
        hasSwitchButton: true
    },
    Level14: { //17
        dedicatedTileTypes: [15],
        moves: 50,
        hasDeleteButton: true,
        hasSwitchButton: true
    },
    Level15: { //15
        moves: 35,
        hasSwitchButton: true,
    },
    Level16: { //2
        moves: 50,
        hasDeleteButton: true,

    },
    Level17: { //7
        moves: 40,
        hasSwitchButton: true,
        hasDeleteButton: true
    },
    Level18: { //22
        moves: 30
    },
    Level19: { //23
        moves: 30,
        hasSwitchButton: true
    },
    Level20: { //11
        dedicatedTileTypes: [15],
        moves: 30,
        hasSwitchButton: true,
        hasDeleteButton: true
    },
    Level21: { //10
        moves: 50
    },
    Level22: { //3
        dedicatedTileTypes: [15],
        moves: 30,
        hasSwitchButton: true,
        hasDeleteButton: true
    },
    Level23: { //12
        dedicatedTileTypes: [15],
        moves: 40,
        hasSwitchButton: true,
        hasDeleteButton: true
    },
    SandBox: { //sb
        hasDeleteButton: true,
        hasSwitchButton: true,
        moves: 999
    }


}

let musicPlayer = new MusicPlayer();
musicPlayer.addAudio('main', 'public/assets/title.mp3');
musicPlayer.addAudio('game', 'public/assets/game.mp3');
