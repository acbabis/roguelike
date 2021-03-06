import Weapon from './Weapon';
import DamageTypes from '../DamageTypes';

var AMOUNT = 2;

export default class Stick extends Weapon {
    getDamage() {
        return AMOUNT;
    }

    getRange() {
        return 1;
    }

    getDamageType() {
        return DamageTypes.MELEE_PHYSICAL;
    }

    getFriendlyDescription() {
        return `Does ${AMOUNT} damage to adjacent enemy`;
    }
}
