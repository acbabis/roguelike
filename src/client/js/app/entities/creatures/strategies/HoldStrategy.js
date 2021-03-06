import Strategy from './Strategy';
import Creature from '../Creature';
import Dungeon from '../../../dungeons/Dungeon';

import Moves from '../moves/Moves';

/**
 * @class HoldStrategy
 * @description Causes monster to wait for player to approach
 */
export default class HoldStrategy extends Strategy {
    getNextMove(dungeon, creature) {
        if(!(dungeon instanceof Dungeon)) {
            throw new Error('First parameter must be a Dungeon');
        } else if(!(creature instanceof Creature)) {
            throw new Error('Second parameter must be a Creature');
        }

        var enemies = creature.getVisibleEnemies(dungeon);

        if(enemies.length > 0) {
            return new Moves.WaitMove(dungeon.getTile(creature));
        } else {
            return null;
        }
    }
}
