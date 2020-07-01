
class BaseState extends Phaser.State {
    constructor(game) {
        super(game);
    }

    create() {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.add.tileSprite(0, 0, WW.gameConfig.width, WW.gameConfig.height, "background")
    }

    ajaxPost(url, data) {
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: 'POST',
                headers: {
                    // 'Content-Type': 'application/json'
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: this.toQueryString(data),
                credentials: 'same-origin'
            })
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(error => reject(error));
        })
    }

    toQueryString(obj) {
        return Object.keys(obj)
        .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(obj[k])}`)
        .join('&');
    }
}