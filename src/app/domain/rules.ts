import { GameState } from '../types/types';

const GRID_SIZE = 9;

export function initialGameState(): GameState {
    return {
        gridSize: GRID_SIZE,
        level: 0,
        pattern: [],
        playerInput: [],
        gameMessage: { type: 'LEVEL_INFO', message: 'elements' },
        gamePhase: 'INIT',
    };
}

export function getNextGameState(gameState: GameState, cellIndex: number | null, count: number | null, sizePattern: number): Partial<GameState> {
    return {
        pattern: [...gameState.pattern, cellIndex].filter((i): i is number => i !== null),
        gameMessage: {
            type: count === sizePattern - 1 ? 'USER_TURN' : 'LEVEL_INFO',
            message: count !== null && count === sizePattern - 1 ? 'YOUR TURN' : `${sizePattern - (count ?? 0)} elements`,
        },
        gamePhase: count !== null ? 'SHOW_SEQUENCE' : 'USER_TURN',
    };
}
