import { Board as board } from '../../types/types';
import { CellIndex, CellsToHighlight } from '../../types/types';

import { fromEvent } from 'rxjs';

export function Board(cellsToHighlight: CellsToHighlight = []): board {
    // Component Attributes
    const clickedCellIndex: CellIndex[] = [];

    const boardContainer = document.querySelector('[data="board-container"]')! as HTMLElement;

    fromEvent(boardContainer, 'click').subscribe((event) => {
        const clickedCell = (event.target as HTMLElement).closest('[data-cell="cell"]') as HTMLElement;

        if (!clickedCell) return;

        const cellIndex: CellIndex = Number(clickedCell.getAttribute('data-index'));

        clickedCellIndex.push(cellIndex);
    });

    return {};
}
