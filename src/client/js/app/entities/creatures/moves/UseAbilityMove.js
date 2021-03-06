import Move from './Move';

import GameEvents from '../../../events/GameEvents';

/**
 * The move a Creature makes when they use an ability
 */
export default class UseAbilityMove extends Move {
    constructor(actorTile, index, x, y) { // TODO: Consider passing target tile
        super(actorTile);
        if(!Number.isInteger(+index) || !Number.isInteger(+x) || !Number.isInteger(+y)) {
            throw new Error('Parameters must be integers: ' + arguments);
        }
        this._index = +index;
        this._x = +x;
        this._y = +y;
    }

    /**
     * Gets the index of the ability to be used
     * @returns {number} - A non-negative integer. The position of the ability in the Creature's list
     */
    getIndex() {
        return this._index;
    }

    /**
     * Gets the x value of the ability target position, if any
     * @returns {number | null}
     */
    getX() {
        return this._x;
    }

    /**
     * Gets the y value of the ability target position, if any
     * @returns {number | null}
     */
    getY() {
        return this._y;
    }

    /**
     * @override
     */
    getReasonIllegal(dungeon, creature) {
        const ability = creature.getAbilities()[this.getIndex()];
        const tile = dungeon.getTile(this.getX(), this.getY());
        return ability.getReasonIllegal(dungeon, creature, tile);
    }

    /**
     * @override
     */
    getCostMultiplier() {
        return 1;
    }

    /**
     * @override
     */
    execute(dungeon, creature) {
        const x = this.getX();
        const y = this.getY();
        const tile = dungeon.getTile(x, y);
        const reason = this.getReasonIllegal(dungeon, creature, tile);
        if(reason) {
            throw new Error(reason);
        }
        const index = this._index;
        const ability = creature.getAbilities()[index];
        let previouslySeenTiles;
        if(creature.getFaction() === 'Player' && ability.isMovementAbility()) {
            previouslySeenTiles = creature.getVisibleTiles(dungeon);
        }
        if(ability.isTargetted()) {
            ability.use(dungeon, creature, tile);
            dungeon.fireEvent(new GameEvents.AbilityEvent(dungeon, creature, ability, tile));
        } else {
            ability.use(dungeon, creature);
            dungeon.fireEvent(new GameEvents.AbilityEvent(dungeon, creature, ability));
        }
        if(creature.getFaction() === 'Player' && ability.isMovementAbility()) {
            dungeon.fireEvent(new GameEvents.VisibilityChangeEvent(
                dungeon, creature, previouslySeenTiles, creature.getVisibleTiles(dungeon)
            ));
        }
    }

    /**
     * @override
     */
    isSeenBy(dungeon, observer) {
        return observer.canSee(dungeon, dungeon.getTile(this.getActorX(), this.getActorY()));
    }
}
