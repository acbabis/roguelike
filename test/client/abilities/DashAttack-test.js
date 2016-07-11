import { default as Dungeon } from '../../../src/client/js/app/dungeons/Dungeon.js';
import { default as DashAttack } from '../../../src/client/js/app/abilities/DashAttack.js';
import { default as Dagger } from '../../../src/client/js/app/entities/weapons/Dagger.js';
import { default as PlayableCharacter } from '../../../src/client/js/app/entities/creatures/PlayableCharacter.js';
import { default as Ent } from '../../../src/client/js/app/entities/creatures/enemies/Ent.js';

var expect = require('chai').expect;

describe('DashAttack', function() {
    var dungeon;
    var attack;
    var player;
    var weapon;

    beforeEach(function() {
        dungeon = new Dungeon(4, 4);
        attack = new DashAttack();
        player = new PlayableCharacter();
        weapon = new Dagger();
    });

    it('should require the target tile to contain an enemy', function() {
        player.addItem(weapon);
        dungeon.setCreature(player, 0, 0);
        dungeon.resolveUntilBlocked();

        var reason = attack.getReasonIllegal(dungeon, player, dungeon.getTile(3, 3));

        expect(reason).to.be.a('string');
    });

    it('should not allow the player to attack themself', function() {
        player.addItem(weapon);
        dungeon.setCreature(player, 0, 0);
        dungeon.resolveUntilBlocked();

        var reason = attack.getReasonIllegal(dungeon, player, dungeon.getTile(0, 0));

        expect(reason).to.be.a('string');
    });

    it('should now allow the player to attack an adjacent enemy', function() {
        player.addItem(weapon);
        dungeon.setCreature(player, 0, 0);
        dungeon.setCreature(new Ent(), 1, 1);
        dungeon.resolveUntilBlocked();

        var reason = attack.getReasonIllegal(dungeon, player, dungeon.getTile(1, 1));

        expect(reason).to.be.a('string');
    });

    it('should now allow the player to attack without a melee weapon', function() {
        dungeon.setCreature(player, 0, 0);
        dungeon.setCreature(new Ent(), 2, 2);
        dungeon.resolveUntilBlocked();

        var reason = attack.getReasonIllegal(dungeon, player, dungeon.getTile(2, 2));

        expect(reason).to.be.a('string');
    });

    it('should not let the player dash onto enemies', function() {
        player.addItem(weapon);
        dungeon.setCreature(player, 0, 0);
        dungeon.setCreature(new Ent(), 1, 1);
        dungeon.setCreature(new Ent(), 1, 2);
        dungeon.setCreature(new Ent(), 2, 1);
        dungeon.setCreature(new Ent(), 2, 2);
        dungeon.resolveUntilBlocked();

        var reason = attack.getReasonIllegal(dungeon, player, dungeon.getTile(2, 2));

        expect(reason).to.be.a('string');
    });

    /*it('should not let the player dash through enemies', function() {
        player.addItem(weapon);
        dungeon.setCreature(player, 0, 0);
        dungeon.setCreature(new Ent(), 0, 1);
        dungeon.setCreature(new Ent(), 0, 3);
        dungeon.resolveUntilBlocked();

        var reason = attack.getReasonIllegal(dungeon, player, dungeon.getTile(0, 3));

        expect(reason).to.be.a('string');
    });*/

    it('should reposition the player', function() {
        player.addItem(weapon);
        dungeon.setCreature(player, 0, 0);
        dungeon.setCreature(new Ent(), 2, 2);
        dungeon.resolveUntilBlocked();

        attack.use(dungeon, player, dungeon.getTile(2, 2));
        var newLocation = dungeon.getTile(player);

        expect(newLocation.getX()).to.equal(1);
        expect(newLocation.getY()).to.equal(1);
    });

    it('should cause the player to attack', function() {
        player.addItem(weapon);
        dungeon.setCreature(player, 0, 0);
        dungeon.setCreature(new Ent(), 2, 2);
        dungeon.resolveUntilBlocked();

        var reason = attack.getReasonIllegal(dungeon, player, dungeon.getTile(2, 2));

        expect(reason).not.to.be.a('string');
    });

    it('should be considered a movement ability', function() {
        expect(attack.isMovementAbility()).to.equal(true);
    });

    it('should have a description', function() {
        var desc = attack.getDescription();
        expect(desc).to.be.a('string');
        expect(desc).to.have.length.above(0);
    });
});
