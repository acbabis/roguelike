global.Random = require('random-js');
const JSDOM = require('jsdom').JSDOM;

if (!Array.prototype.includes) {
    Array.prototype.includes = function(searchElement /*, fromIndex*/) {
        'use strict';
        if (this == null) {
            throw new TypeError('Array.prototype.includes called on null or undefined');
        }

        const O = Object(this);
        const len = parseInt(O.length, 10) || 0;
        if (len === 0) {
            return false;
        }
        const n = parseInt(arguments[1], 10) || 0;
        let k;
        if (n >= 0) {
            k = n;
        } else {
            k = len + n;
            if (k < 0) {k = 0;}
        }
        let currentElement;
        while (k < len) {
            currentElement = O[k];
            if (searchElement === currentElement ||
              (searchElement !== searchElement && currentElement !== currentElement)) { // NaN !== NaN
                return true;
            }
            k++;
        }
        return false;
    };
}

const dom = new JSDOM(`
    <html>
    <head>
        <script></script>
    </head>
    <body>
        <header></header>
        <section class='game' tabindex='0'></section>
        <footer></footer>
    </body>
    </html>
`);
const window = global.window = dom.window;
global.document = window.document;
global.localStorage = {};

//import Bootstrapper from '../src/client/js/app/Bootstrapper.js';
import RandomMapDungeonFactory from '../src/client/js/app/dungeons/RandomMapDungeonFactory.js';
import Rogue from '../src/client/js/app/entities/creatures/classes/Rogue.js';

for(let i = 0; i < 10; i++) {
    const prng = Random.engines.mt19937();
    const seed = Math.random().toString().slice(2);
    console.log(`Integration testing with seed: ${seed}`);
    prng.seed(seed);
    new RandomMapDungeonFactory().getRandomMap(prng, new Rogue());
}
