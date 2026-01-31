import { Pattern, PatternCounter } from '../types/types';

import { Observable, concat, interval, of } from 'rxjs';
import { delay, take, map } from 'rxjs/operators';

export function emitPatternCounterByInterval(pattern: Pattern, emitInterval: number = 1000): Observable<PatternCounter> {
    const $pattern = interval(emitInterval).pipe(
        take(pattern.length),
        map((index: number) => ({ cellIndex: pattern[index], count: index })),
    );

    const $endSignal = of({ cellIndex: null, count: null }).pipe(delay(emitInterval));

    return concat($pattern, $endSignal);
}
