export type CellIndex = number;
export type GridSize = number;

export type PlayerInput = ReadonlyArray<CellIndex>;
export type Pattern = ReadonlyArray<CellIndex>;

export type PatternCounter = {
    cellIndex: CellIndex | null;
    count: number | null;
};

export type GamePhase = 'INIT' | 'SHOW_SEQUENCE' | 'USER_TURN' | 'GAME_OVER';

export type GameMessage = { type: 'GAME_OVER'; message: string } | { type: 'USER_TURN'; message: string } | { type: 'LEVEL_INFO'; message: string };

export type GameStateStore = {
    readonly getState: () => GameState;
    readonly setState: (newState: Partial<GameState>) => void;
    readonly subscribe: (callback: (state: GameState) => void) => void;
};

export type GameState = {
    gridSize: GridSize;
    level: number;
    pattern: Pattern;
    playerInput: PlayerInput;
    gameMessage: GameMessage;
    gamePhase: GamePhase;
};
