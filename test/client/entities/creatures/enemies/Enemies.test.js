import { default as Enemies } from '../../../../../src/client/js/app/entities/creatures/enemies/Enemies';
import { default as PlayableCharacter } from '../../../../../src/client/js/app/entities/creatures/PlayableCharacter';
import { default as Moves } from '../../../../../src/client/js/app/entities/creatures/moves/Moves';
import { default as Dungeon } from '../../../../../src/client/js/app/dungeons/Dungeon';
import { default as Tiles } from '../../../../../src/client/js/app/tiles/Tiles';

const expect = require('chai').expect;

describe('Enemies', () => {
    it('should all construct without throwing', () => {
        Object.keys(Enemies).map(constructorName => Enemies[constructorName]).forEach((Enemy) => {
            new Enemy();
        });
    });

    describe('Bigfoot', () => {
        it('should be able to kick the player into a pit', () => {
            const dungeon = new Dungeon(1, 3);
            dungeon.setTile(new Tiles.PitTile(0, 2), 0, 2);
            const player = new PlayableCharacter();
            const bigfoot = new Enemies.Bigfoot();

            dungeon.moveCreature(bigfoot, 0, 0);
            dungeon.moveCreature(player, 0, 1);
            player.setNextMove(new Moves.WaitMove(dungeon.getTile(player)));

            dungeon.resolveSteps(1000); // TODO: Should resolveUntilBlocked handle dead player scenarios without game conditions?
            expect(player.isDead()).to.equal(true);
        });

        it('should not be able to kick the player into a wall', () => {
            const dungeon = new Dungeon(1, 3);
            dungeon.setTile(new Tiles.WallTile(0, 2), 0, 2);
            const player = new PlayableCharacter();
            const bigfoot = new Enemies.Bigfoot();

            dungeon.moveCreature(bigfoot, 0, 0);
            dungeon.moveCreature(player, 0, 1);
            player.setNextMove(new Moves.WaitMove(dungeon.getTile(player)));

            dungeon.resolveUntilBlocked();
            expect(player.isDead()).to.equal(false);
        });
    });

    describe('Witch', () => {
        it('should cast Fireball at enemies', () => {
            const dungeon = new Dungeon(2, 2);
            const player = new PlayableCharacter();
            const witch = new Enemies.Witch();

            dungeon.moveCreature(witch, 0, 0);
            dungeon.moveCreature(player, 1, 1);
            player.setNextMove(new Moves.WaitMove(dungeon.getTile(player)));

            expect(player.getCurrentHP()).to.equal(player.getBaseHP());
            dungeon.resolveUntilBlocked();
            expect(player.getCurrentHP()).not.to.equal(player.getBaseHP());
        });
    });
});
