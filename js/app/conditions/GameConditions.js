export default class GameConditions {
    /**
     * @class GameConditions
     * @description Abstract base class for a set of game win and loss
     * conditions. Used for determining if a given dungeon represents
     * a win or loss for the player. GameConditions should be stateless.
     */
    constructor() {
    }

    /**
     * @class hasPlayerWon
     * @description Returns true if the PlayableCharacter has won the dungeon
     */
    hasPlayerWon(dungeon) {
        throw new Error('Abstract function not implemented');
    }

    /**
     * @class hasPlayerLost
     * @description Returns true if the PlayableCharacter has lost the dungeon
     */
    hasPlayerLost(dungeon) {
        throw new Error('Abstract function not implemented');
    }
}
