import Armor from "../entities/armor/Armor.js";
import Weapon from "../entities/weapons/Weapon.js";

var lib;
export default lib = {
    getItemDom: function(item, index, isTargetting) {
        if(item instanceof Weapon) {
            return lib.getWeaponDom(item, index)
        } else if(item instanceof Armor) {
            return lib.getArmorDom(item, index)
        } else if(item){
            return $(`<li class="slot item" tabindex="0" data-index="${index}" data-item="${item.toString()}" data-is-targetting="${!!isTargetting}">
                <div class="icon"></div>
                <div class="info">
                    <span class="name">${item.getName()}</span>
                    <span class="desc">${item.getFriendlyDescription()}</span>
                </div>
            </li>`)[0];
        } else {
            return $(`<li class="slot empty" tabindex="0" data-index="${index}">
                <div class="icon"></div>
                <div class="info">(Empty slot)</div>
            </li>`)[0];
        }
    },

    getWeaponDom: function(weapon, index) {
        if(weapon) {
            var data = {
                name: weapon.constructor.name,
                damage: weapon.getDamage(),
                range: weapon.getRange()
            }
            return $(`
                <li class="slot item weapon" tabindex="0" data-index="${index}" data-item="${weapon.toString()}">
                    <div class="icon"></div>
                    <div class="info">
                        <div class="name">${data.name}</div>
                        <div class="desc">
                            <span class="damage-icon">Damage: </span> <span class="damage-text">${data.damage}</span>,
                            <span class="range-icon">Range: </span> <span class="range-text">${data.range}</span>
                        </div>
                    </div>
                </li>
            `)[0];
        } else {
            return $(`<li class="slot empty" tabindex="0" data-index="${index}">
                <div class="icon"></div>
                <div class="info">(Empty weapon slot)</div>
            </li>`)[0];
        }
    },

    getArmorDom: function(armor, index) {
        if(armor) {
            var data = {
                name: armor.getName()/*,
                physical: armor.getPhysicalReduction(),
                magical: armor.getMagicalReduction()*/
            }
            return $(`
                <li class="slot item armor" tabindex="0" data-index="${index}" data-item="${armor.toString()}">
                    <div class="icon"></div>
                    <div class="info">
                        <div class="name">${data.name}</div>
                        <!--div class="stats">
                            <span class="physical-dr-text">-${data.physical} physical damage</span>,
                            <span class="magical-dr-text">-${data.magical} magic damage</span>,
                        </div-->
                    </div>
                </li>
            `)[0];
        } else {
            return $(`<li class="slot empty" tabindex="0" data-index="${index}">
                <div class="icon"></div>
                <div class="info">(Empty armor slot)</div>
            </li>`)[0];
        }
    }
}
