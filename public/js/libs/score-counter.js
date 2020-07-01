class ScoreCounter {
    constructor() {
        this.map = [];
    }

    increment(key, inc = 1) {
        if (!this.map[key]) {
            this.map[key] = inc;
        } else {
            this.map[key] += inc;
        }
        console.log(this);
    }

    get(key) {
        if (!this.map[key]) {
            return 0;
        } else {
            return this.map[key];
        }
    }
}