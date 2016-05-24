import { default as Creature } from "./Creature.js";
import { default as PlayableCharacter } from "./PlayableCharacter.js";
import { default as ChaseStrategy } from "./strategies/ChaseStrategy.js";

import { default as Armor } from "../armor/Armor.js";
import { default as Weapon } from "../weapons/Weapon.js";

class Bark extends Armor {
    getPhysicalReduction() {
        return 2;
    }

    getMagicalReduction() {
        return 1;
    }
}

class EntAttack extends Weapon {
    getRange() {
        return 1;
    }

    getDamage() {
        return 10;
    }
}

export default class Ent extends Creature {
    /**
     * @class Ent
     * @description Slow melee enemy. Chases the player
     */
    constructor(dungeon) {
        super(dungeon);
        this.setStrategy(new ChaseStrategy(this));
    }

    getMeleeWeapon() {
        return new EntAttack(this.getDungeon());
    }

    getRangedWeapon() {
        return null;
    }

    getArmor() {
        return new Bark(this.getDungeon());
    }

    getSpeed() {
        return 800;
    }

    getBaseHP() {
        return 10;
    }
}
