import React, { memo } from 'react';
import { EMPTY_CELL } from '../shared';

export interface GridProps {
    data?: Record<string, any>;
    layout: GridLayout;
    style?: {
        space_x?: number;
        space_y?: number;
    };
}

export interface GridLayout {
    rows: number;
    cols: number;
    cells: GridCell[];
}

export interface GridCell {
    row: number;
    col: number;
    rowSpan?: number;
    colSpan?: number;
    dataKey?: string;
    render?: string | ((data: any) => React.ReactNode);
}

export const Grid = memo(function Grid({ data, layout, style }: GridProps) {
    const grid: (GridCell | EMPTY_CELL)[][] = Array(layout.rows)
        .fill(EMPTY_CELL)
        .map(() => Array(layout.cols).fill(EMPTY_CELL));
    layout.cells.forEach((cell) => {
        const { col, row } = cell;
        grid[row][col] = cell;
    });

    let className = ['w-auto', 'max-w-max', 'table-auto', '!border-separate'];

    if (style?.space_x) {
        className.push(`border-spacing-x-${style.space_x}`);
    }

    if (style?.space_y) {
        className.push(`border-spacing-y-${style.space_y}`);
    }

    return (
        <table className={className.join(' ')}>
            <tbody>
                {grid.map((rowCells, rowIndex) => {
                    return (
                        <tr>
                            {rowCells.map((cell, cellIndex) => {
                                if (cell === EMPTY_CELL) return cell;

                                const { col, row, colSpan, dataKey, render, rowSpan } = cell;

                                const innerContent =
                                    typeof render === 'function'
                                        ? render((data ?? {})[dataKey ?? ''])
                                        : render;

                                return (
                                    <td rowSpan={rowSpan} colSpan={colSpan}>
                                        {React.isValidElement(innerContent) ? (
                                            innerContent
                                        ) : (
                                            <span>{innerContent}</span>
                                        )}
                                    </td>
                                );
                            })}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
});
