import Creature from '../Creature';
import Strategies from '../strategies/Strategies';


import Armor from '../../armor/Armor';
import Weapon from '../../weapons/Weapon';

import DamageTypes from '../../DamageTypes';

class FireSpriteArmor extends Armor {
    getReduction(type) {
        return (type === DamageTypes.MELEE_PHYSICAL ||
            type === DamageTypes.RANGED_PHYSICAL ||
            type === DamageTypes.FIRE) ? Infinity : 0;
    }
}

class FireSpriteAttack extends Weapon {
    getRange() {
        return 1;
    }

    getDamage() {
        return 2;
    }

    getDamageType() {
        return DamageTypes.FIRE;
    }

    onAttack(dungeon, attacker) {
        attacker.die(dungeon);
    }
}

export default class FireSprite extends Creature {
    constructor() {
        super();
        this.setStrategy(new Strategies.CompositeStrategy(
            new Strategies.ChaseStrategy(),
            new Strategies.RandomWalkStrategy(),
            new Strategies.IdleStrategy()
        ));
    }

    getBaseHP() {
        return 2;
    }

    getMeleeWeapon() {
        return new FireSpriteAttack();
    }

    getRangedWeapon() {
        return null;
    }

    getArmor() {
        return new FireSpriteArmor();
    }

    getBaseSpeed() {
        return 250;
    }

    isFlying() {
        return true;
    }
}
