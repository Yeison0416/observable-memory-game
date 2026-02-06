import template from './memory-game.hbs';

import { GameState } from './types/types';

import { Board } from './components/board/board';
import { MessageDisplayer } from './components/message/message-displayer';

import { getPatternSequence } from './services/emit-pattern-counter-by-interval';

import { getGameStateStore } from './state/game-state-store';

import { getNextGameState, initialGameState } from './domain/rules';

export function MemoryGame(appRootNode: HTMLElement) {
    const INIT_SIZE_PATTERN = 2;

    // Render the template
    appRootNode.innerHTML = template();

    // Create the game state store
    const gameStateStore = getGameStateStore(initialGameState());

    // Component instances
    Board(gameStateStore);
    MessageDisplayer(gameStateStore);

    function startGame() {
        getPatternSequence(gameStateStore.getState(), INIT_SIZE_PATTERN).subscribe(({ cellIndex, count }) => {
            const nextGameState = getNextGameState(gameStateStore.getState(), cellIndex, count, INIT_SIZE_PATTERN);
            gameStateStore.setState(nextGameState);
        });
    }

    const state = {
        startGame: startGame,
    };

    return Object.assign({}, state);
}
