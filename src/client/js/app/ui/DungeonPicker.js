import LightweightDungeonSerializer from '../dungeons/LightweightDungeonSerializer.js';

var dialogPolyfill = require('../../../../../node_modules/dialog-polyfill/dialog-polyfill.js');
require('../../../../../node_modules/dialog-polyfill/dialog-polyfill.css');

const promiseHandlers = {};

const angular = require('angular');

angular.module('dungeon-picker', [])
.component('dungeonInfo', {
    bindings: {
        data: '='
    },
    controller: function() {
    },
    templateUrl: 'dungeon-info.html'
})
.controller('dungeon-picker', ['$scope', 'promiseHandlers', function($scope, promiseHandlers) {
    const { resolve, reject } = promiseHandlers;

    fetch(new Request('/dungeons', {
        headers: new Headers({
            method: 'GET',
            'Content-Type': 'application/json'
        })
    })).then(r=>r.json()).then(function(dungeons) {
        $scope.dungeons = dungeons;
        $scope.dungeonJSON = JSON.stringify(dungeons, null, 4);
        $scope.$apply();
    })

    $scope.setSelectedDungeon = function(index) {
        $scope.selectedIndex = index;
    };

    $scope.submit = function() {
        const index = $scope.selectedIndex;
        const struct = $scope.dungeons[index].data;
        const dungeon = LightweightDungeonSerializer.deserialize(struct);
        resolve(dungeon);
    };
}]).constant('promiseHandlers', promiseHandlers).run(['$templateCache', function($templateCache) {
    $templateCache.put('dungeon-info.html',
        `<div class="dungeon-info">
            Dimensions: {{$ctrl.data.width}} x {{$ctrl.data.height}}
        </div>`);
    $templateCache.put('dungeon-picker.html',
        `<form method="dialog" class="gitrecht" ng-controller="dungeon-picker" ng-submit="submit()">
            <h2>Select a Dungeon</h2>
            <button ng-repeat="dungeon in dungeons" ng-click="setSelectedDungeon($index)">
                <dungeon-info data="dungeon"></dungeon-info>
            </button>
        </form>`);
}]);

export default class DungeonPicker {
    constructor() {
        this._promise = new Promise((resolve, reject) => {
            var $dialog = $(`
                <dialog class='dungeon-picker'>
                    <ng-include src="'dungeon-picker.html'"></ng-include>
                </dialog>`).appendTo('body');

            const dialog = $dialog[0];

            if(!dialog.open) {
                dialogPolyfill.registerDialog(dialog);
            }

            promiseHandlers.resolve = resolve;
            promiseHandlers.reject = reject;

            angular.bootstrap(dialog, ['dungeon-picker']);

            dialog.showModal();
        });
    }

    getDungeon() {
        return this._promise;
    }
}
