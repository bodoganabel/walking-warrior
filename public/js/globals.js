let WW = {
    gameConfig: {
        // width: window.innerWidth * window.devicePixelRatio,
        // height: window.innerHeight * window.devicePixelRatio,
        width: 1400,
        height: 1920,
        type: Phaser.CANVAS,
        scene: [],
    },
    gameVersion: 'v6.0',
    updateDate: 'Jul. 10., 2020',
    bugReportUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSeXguVIXKymvRkL_8kNKdFCKV_8kbb5VOpl_4re4dnuwtmtMw/viewform',
}

let LVL = {
    tileTypes: [1, 2, 3, 4, 5, 6],
    Level1: {
        scoreToFinish: 20,
        moves: 50
    },
    Level2: {
        moves: 50
    },
    Level3: {
        dedicatedTileTypes: [15],
        moves: 50,
        hasDeleteButton: true,
        hasSwitchButton: true
    },
    Level4: {
        moves: 50
    },
    Level5: {
        moves: 50
    },
    Level6: {
        dedicatedTileTypes: [15],
        moves: 50,
        hasDeleteButton: true,
        hasSwitchButton: true
    },
    Level7: {
        moves: 30,
        hasSwitchButton: true
    },
    Level8: {
        moves: 30,
        hasSwitchButton: true
    },
    Level9: {
        moves: 30,
        hasSwitchButton: true
    },
    Level10: {
        moves: 40,
        hasSwitchButton: true,
        hasDeleteButton: true
    },
    Level11: {
        moves: 50
    },
    Level12: {
        dedicatedTileTypes: [15],
        moves: 50,
        hasSwitchButton: true,
        hasDeleteButton: true
    },
    Level13: {
        dedicatedTileTypes: [15],
        moves: 50,
        hasSwitchButton: true,
        hasDeleteButton: true
    },
    Level14: {
        moves: 40,
        hasSwitchButton: true,
        hasDeleteButton: true
    },
    Level15: {
        moves: 35,
        hasSwitchButton: true,
    },
    Level16: {
        moves: 40,
    },
    Level17: {
        moves: 35,
        hasSwitchButton: true,
        hasDeleteButton: true
    },
    Level18: {
        moves: 30
    },
    Level19: {
        moves: 30
    },
    Level20: {
        moves: 40
    },
    Level21: {
        dedicatedTileTypes: [15],
        moves: 40,
        hasSwitchButton: true
    },
    Level22: {
        dedicatedTileTypes: [15],
        moves: 30,
        hasSwitchButton: true,
        hasDeleteButton: true
    },
    Level23: {
        dedicatedTileTypes: [15],
        moves: 40,
        hasSwitchButton: true,
        hasDeleteButton: true
    },
    SandBox: {
        hasDeleteButton: true,
        hasSwitchButton: true,
        moves: 999
    }
}

let musicPlayer = new MusicPlayer();
musicPlayer.addAudio('main', 'public/assets/title.mp3');
musicPlayer.addAudio('game', 'public/assets/game.mp3');
