import { memo } from 'react';
import { Grid, GridLayout } from './Grid';

export const Card = memo(function Card() {
    const data = { name: '아델', level: 250 };
    const layout = {
        rows: 3,
        cols: 3,
        cells: [
            { row: 0, col: 0, rowSpan: 1, dataKey: 'name' },
            { row: 0, col: 1, rowSpan: 1, dataKey: 'name' },
            { row: 0, col: 2, rowSpan: 1, dataKey: 'name' },
            { row: 2, col: 0, rowSpan: 1, dataKey: 'name' },
            { row: 2, col: 1, rowSpan: 1, dataKey: 'name' },
            { row: 2, col: 2, rowSpan: 1, dataKey: 'name' },
        ],
    } as GridLayout;

    return (
        <div className="flex min-h-60 w-full min-w-sm flex-col justify-center rounded-2xl bg-white p-4 shadow-md transition duration-500 hover:shadow-lg">
            <Grid data={data} layout={layout} />
        </div>
    );
});
