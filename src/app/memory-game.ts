import template from './memory-game.hbs';
import { Board } from './components/board/board';

export function MemoryGame(appRootNode: HTMLElement) {
    // Render the template
    appRootNode.innerHTML = template();

    // Component instances
    const board = Board();

    function startGame() {
        console.log('Memory Game Started');
    }

    const state = {
        startGame: startGame,
    };

    return Object.assign({}, state);
}
