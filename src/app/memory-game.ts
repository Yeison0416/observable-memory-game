import template from './memory-game.hbs';

export function MemoryGame(appRootNode: HTMLElement) {
    appRootNode.innerHTML = template();

    function startGame() {
        console.log('Memory Game Started');
    }

    const state = {
        startGame: startGame,
    };

    return Object.assign({}, state);
}
