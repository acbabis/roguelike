import GameEvents from '../events/GameEvents.js';

export default class EventLogView {
    /**
     * @class EventLogView
     * @description Event feed widget
     */
    constructor(sharedData) {
        var scrollPane = this._scrollPane = document.createElement('div');
        scrollPane.classList.add('log-scroll');
        var log = document.createElement('div');
        log.classList.add('log');
        log.setAttribute('aria-live', 'polite');
        log.setAttribute('data-locked-bottom', true);
        scrollPane.appendChild(log);

        function observer(event) {
            if(event && event.getText && !(event instanceof GameEvents.HumanToMoveEvent)
                    && !(event instanceof GameEvents.HumanMovingEvent)) {
                var dungeon = sharedData.getDungeon();
                if(dungeon && (!event.isSeenBy || event.isSeenBy(dungeon, dungeon.getPlayableCharacter()))) {
                    var message = document.createElement('div');
                    message.textContent = /*"<" + event.getTimestamp() + "> " +*/ event.getText(dungeon);
                    log.appendChild(message);
                    checkScroll();
                }
            }
        }

        sharedData.getDungeon().addObserver(observer);

        scrollPane.addEventListener('scroll', function() {
            log.setAttribute('data-locked-bottom', scrollPane.scrollTop + scrollPane.clientHeight === scrollPane.scrollHeight);
        });

        function checkScroll() {
            if(log.getAttribute('data-locked-bottom') === 'true') {
                scrollPane.scrollTop = Number.MAX_VALUE;
            }
        }
    }

    getDom() {
        return this._scrollPane;
    }
}
