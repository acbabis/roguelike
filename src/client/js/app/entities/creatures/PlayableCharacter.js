import Creature from './Creature';

import Move from './moves/Move';

import Inventory from './Inventory';

export default class PlayableCharacter extends Creature {
    /**
      * @class PlayableCharacter
      * @description The creature controlled by the player
      */
    constructor() {
        super();
        this._moveQueue = [];
        this._inventory = new Inventory(this.getBackpackSize());
    }

    _updateVisionMap(dungeon) {
        var self = this;
        var visionMap = this._visionMap;
        if(!visionMap) {
            visionMap = this._visionMap = this._visionMap = new Array(dungeon.getWidth()).fill(0).map(()=>new Array(dungeon.getHeight()));
        }
        dungeon.forEachTile(function(tile, x, y) {
            visionMap[x][y] = visionMap[x][y] || self.canSee(dungeon, tile);
        });
    }

    setNextMove(move) {
        if(!(move instanceof Move)) {
            throw new Error(move + ' is not a Move');
        }
        this._moveQueue.push(move);
    }

    hasMoveQueued() {
        return this._moveQueue.length > 0;
    }

    getNextMove() {
        var read = this._moveQueue;
        if(read.length) {
            return read.shift();
        } else {
            throw new Error('PlayableCharacter doesn\'t have move queued');
        }
    }

    getFaction() {
        return 'Player';
    }

    isPlayer() {
        return true;
    }

    canUseItems() {
        return true;
    }

    getBackpackSize() {
        return 3;
    }

    getBaseHP() {
        return 10;
    }

    getBaseMana() {
        return 10;
    }

    getBaseSpeed() {
        return 450;
    }

    toString() {
        return 'PlayableCharacter';
    }
}
