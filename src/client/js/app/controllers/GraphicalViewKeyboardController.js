import Moves from '../entities/creatures/moves/Moves.js';

export default class GraphicalViewKeyboardController {
    constructor(dungeon, sharedData) {
        // TODO: Remove dungeon from parameters
        var dom = document.querySelector('section.game');

        // Arrow key handler
        dom.addEventListener('keydown', function(event) {
            var dungeon = sharedData.getDungeon();
            //var active = document.activeElement;
            var code = event.keyCode;

            var preventDefault = true;
            var character = dungeon.getPlayableCharacter();
            function move(dx, dy) {
                var tile = dungeon.getTile(character);
                var x = tile.getX() + dx;
                var y = tile.getY() + dy;
                var targetTile = dungeon.getTile(x, y);
                var creature = targetTile.getCreature();
                if(creature && creature.isEnemy(character)) {
                    character.setNextMove(new Moves.AttackMove(tile, x, y));
                } else if(character.canOccupy(targetTile)) {
                    character.setNextMove(new Moves.MovementMove(tile, dx, dy));
                }
            }

            switch(code) {
            case 37: move(-1, 0); break;
            case 38: move(0, -1); break;
            case 39: move(1, 0); break;
            case 40: move(0, 1); break;

            case 97:  case 66: move(-1, 1); break;
            case 98:  case 74: move( 0, 1); break;
            case 99:  case 78: move( 1, 1); break;
            case 100: case 72: move(-1, 0); break;
            case 101: case 190: character.setNextMove(new Moves.WaitMove(dungeon.getTile(character))); break;
            case 102: case 76: move( 1, 0); break;
            case 103: case 89: move(-1,-1); break;
            case 104: case 75: move( 0,-1); break;
            case 105: case 85: move( 1,-1); break;
            default:
                preventDefault = false;
                break;
            }

            if(preventDefault) {
                event.preventDefault();
            }

            dungeon.resolveUntilBlocked();
        });

        // TODO: Move this logic into an observer function
        // since we are no longer using cell focus
        /*eslint-env jquery*/
        $(dom).on('focus', '.cell', function() {
            var $cell = $(this);
            var cellPos = $cell.position();
            var scrollTop = cellPos.top + ($cell.height() - $(dom).height()) / 2;
            var scrollLeft = cellPos.left + ($cell.width() - $(dom).width()) / 2;
            $(dom).scrollTop(scrollTop);
            $(dom).scrollLeft(scrollLeft);
        });
    }
}
