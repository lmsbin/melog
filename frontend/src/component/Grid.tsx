import React, { memo } from 'react';
import { EMPTY_CELL } from '../type';

export interface GridProps {
    data?: Record<string, any>;
    layout: GridLayout;
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

export const Grid = memo(function Grid({ data, layout }: GridProps) {
    const grid: (GridCell | EMPTY_CELL)[][] = Array(layout.rows)
        .fill(EMPTY_CELL)
        .map(() => Array(layout.cols).fill(EMPTY_CELL));

    layout.cells.forEach((cell) => {
        const { col, row } = cell;
        grid[row][col] = cell;
    });

    return (
        <table className='border-collapse" w-auto max-w-max table-auto'>
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

                                console.log(innerContent);
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
