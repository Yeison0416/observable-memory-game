import template from './memory-game.hbs';

import { GameState, Pattern, PatternCounter } from './types/types';

import { Board } from './components/board/board';
import { MessageDisplayer } from './components/message/message-displayer';

import { emitPatternCounterByInterval } from './services/emit-pattern-counter-by-interval';
import { getGameStateStore } from './state/game-state-store';
import { pattern } from './domain/pattern';

import { from, scan, switchMap, tap } from 'rxjs';

export function MemoryGame(appRootNode: HTMLElement) {
    const GRID_SIZE = 9;
    const INIT_SIZE_PATTERN = 2;
    const mathRandomFn = Math.random;

    // Render the template
    appRootNode.innerHTML = template();

    // Initialize the game state
    const initState: GameState = {
        gridSize: GRID_SIZE,
        level: 0,
        pattern: [],
        playerInput: [],
        gameMessage: { type: 'LEVEL_INFO', message: 'elements' },
        gamePhase: 'INIT',
    };

    // Create the game state store
    const gameStateStore = getGameStateStore(initState);

    // Component instances
    Board(gameStateStore);
    MessageDisplayer(gameStateStore);

    const showSequence = (gameState: GameState, sizePattern: number) => {
        from(pattern(sizePattern, mathRandomFn, gameState.gridSize))
            .pipe(
                scan((acc: Pattern, curr: number) => [...acc, curr], []),
                switchMap((randomSequence: Pattern) => emitPatternCounterByInterval(randomSequence)),
                tap((patternCounter: PatternCounter) =>
                    gameStateStore.setState({
                        pattern: [...gameStateStore.getState().pattern, patternCounter.cellIndex].filter((i): i is number => i !== null),
                        gameMessage: {
                            type: patternCounter.count === sizePattern - 1 ? 'USER_TURN' : 'LEVEL_INFO',
                            message:
                                patternCounter.count !== null && patternCounter.count === sizePattern - 1
                                    ? 'YOUR TURN'
                                    : `${sizePattern - (patternCounter.count ?? 0)} elements`,
                        },
                        gamePhase: patternCounter.count !== null ? 'SHOW_SEQUENCE' : 'USER_TURN',
                    }),
                ),
            )
            .subscribe();
    };

    function startGame() {
        const gameState = gameStateStore.getState();
        showSequence(gameState, INIT_SIZE_PATTERN);
    }

    const state = {
        startGame: startGame,
    };

    return Object.assign({}, state);
}
