class ShapeMatcher {
    static LRotations = [
        [//L
            { col: 0, row: 1 },
            { col: 0, row: 2 },
            { col: 1, row: 2 },
            { col: 2, row: 2 }
        ],
        [//L 90-el balra forgatva
            { col: 1, row: 0 },
            { col: 2, row: 0 },
            { col: 2, row: -1 },
            { col: 2, row: -2 }
        ],
        [//L 180-al balra forgatva
            { col: 0, row: -1 },
            { col: 0, row: -2 },
            { col: -1, row: -2 },
            { col: -2, row: -2 }
        ],
        [//L 270-el balra forgatva
            { col: -1, row: 0 },
            { col: -2, row: 0 },
            { col: -2, row: 1 },
            { col: -2, row: 2 }
        ],
    ];

    static TRotations = [
        [
            { col: 1, row: 0 },
            { col: 2, row: 0 },
            { col: 1, row: 1 },
            { col: 1, row: 2 }
        ],
        [
            { col: 1, row: 0 },
            { col: 2, row: 0 },
            { col: 2, row: -1 },
            { col: 2, row: 1 }
        ],
        [
            { col: 0, row: 1 },
            { col: 0, row: 2 },
            { col: -1, row: 2 },
            { col: 1, row: 2 }
        ],
        [
            { col: 0, row: 1 },
            { col: 0, row: -1 },
            { col: 1, row: 0 },
            { col: 2, row: 0 }
        ],
    ];

    static getMatches(tileGrid, width, height) {
        let matchGroups = [];

        for (let i = 0; i < width; ++i) {
            for (let j = 0; j < height; ++j) {
                let matches = ShapeMatcher.matchTs(tileGrid, i, j);
                if (matches.length > 0) {
                    console.warn('T shapeeee', matches);
                    matchGroups.push(matches);
                }
            }
        }

        for (let i = 0; i < width; ++i) {
            for (let j = 0; j < height; ++j) {
                let matches = ShapeMatcher.matchLs(tileGrid, i, j);
                if (matches.length > 0) {
                    console.warn('L shapeeee', matches);
                    matchGroups.push(matches);
                }
            }
        }

        for (let i = 0; i < width; ++i) {
            for (let j = 0; j < height; ++j) {
                let matches = ShapeMatcher.matchTiles(tileGrid, i, j, width, height);
                if (matches.length > 0) {
                    matchGroups.push(matches);
                }
            }
        }

        return matchGroups;
    }


    static matchTiles(tileGrid, col, row, w, h) {
        let tile = tileGrid[col][row];
        let matches = [];

        //horizontal
        let hMatches = [tile];
        if (col <= w - 3) {
            for (let i = col + 1; i < w; ++i) {

                if (this.isMatchingTiles(tile, tileGrid[i][row])) {
                    hMatches.push(tileGrid[i][row]);
                } else {
                    break;
                }
            }
        }

        if (hMatches.length >= 3) {
            hMatches.map(m => {
                // this.removeTile(m);
                m.inMatch = true;
            });
            // console.log(hMatches.map(m => this.getTilePos(m)));
            matches.push(hMatches);
        }

        //vertical
        let vMatches = [tile];
        if (row <= h - 3) {
            for (let i = row + 1; i < h; ++i) {

                if (this.isMatchingTiles(tile, tileGrid[col][i])) {
                    vMatches.push(tileGrid[col][i]);
                } else {
                    break;
                }
            }
        }

        if (vMatches.length >= 3) {
            vMatches.map(m => {
                m.inMatch = true;
            });
            matches.push(vMatches);
        }

        return matches;
    }

    static isMatchingTiles(tile1, tile2) {
        //tiles that are already in a match cannot go in another match + tile with type of 15 (block cell) cannot be matched just moved.
        //Also -1 is equal to null, so we also don't count that 
        if (!tile1 || !tile2 || tile1.inMatch || tile2.inMatch || tile1.tileType == 15 || tile2.tileType == 15 || tile1.tileType == '-1' || tile2.tileType == '-1') {
            return false;
        }

        let c1 = tile1.tileType == tile2.tileType;
        let c2 = tile1.tileType == tile2.tileType + 6;
        let c3 = tile1.tileType == tile2.tileType - 6;

        return c1 || c2 || c3;
    }

    static matchLs(tileGrid, col, row) {
        let rotations = ShapeMatcher.LRotations;

        let tile = tileGrid[col][row];
        let matches = [tile];

        for (let rot of rotations) {
            let conditions = [];
            for (let i = 0; i < rot.length; ++i) {
                try {
                    conditions.push(this.isMatchingTiles(tile, tileGrid[col + rot[i].col][row + rot[i].row]));
                } catch (error) {
                    conditions[0] = false;
                    break;
                }
            }

            if (conditions[0] && conditions[1] && conditions[2] && conditions[3]) {
                for (let i = 0; i < rot.length; ++i) {
                    matches.push(tileGrid[col + rot[i].col][row + rot[i].row]);
                }
            }
        }
        if (matches.length === 5) {
            matches.map(m => {
                m.inMatch = true;
                m.lShape = true;
            });
            console.warn(matches, 'asdasdasd');
            return [matches];
        }

        return [];
    }

    static matchTs(tileGrid, col, row) {
        let rotations = ShapeMatcher.TRotations;

        let tile = tileGrid[col][row];
        let matches = [tile];

        for (let rot of rotations) {
            let conditions = [];
            for (let i = 0; i < rot.length; ++i) {
                try {
                    conditions.push(this.isMatchingTiles(tile, tileGrid[col + rot[i].col][row + rot[i].row]));
                } catch (error) {
                    conditions[0] = false;
                    break;
                }
            }

            if (conditions[0] && conditions[1] && conditions[2] && conditions[3]) {
                for (let i = 0; i < rot.length; ++i) {
                    matches.push(tileGrid[col + rot[i].col][row + rot[i].row]);
                }
            }
        }
        if (matches.length === 5) {
            matches.map(m => {
                m.inMatch = true;
                m.tShape = true;
            });
            return [matches];
        }

        return [];
    }
}