import { GameState, GameStateStore } from '../../types/types';

export function MessageDisplayer(gameStateStore: GameStateStore): void {
    gameStateStore.subscribe((gameState: GameState) => {});
}
