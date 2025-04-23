import { memo } from 'react';
import { UserSymbolEquipment } from '../../shared';
import { BaseImg } from '../img';
import { Grid, GridCell } from '../Grid';

export type Symbol = UserSymbolEquipment['symbol'][number];

export const Symbol = memo(function Symbol({
    symbol_description,
    symbol_dex,
    symbol_drop_rate,
    symbol_exp_rate,
    symbol_force,
    symbol_growth_count,
    symbol_hp,
    symbol_icon,
    symbol_int,
    symbol_level,
    symbol_luk,
    symbol_meso_rate,
    symbol_name,
    symbol_require_growth_count,
    symbol_str,
}: Symbol) {
    const symbolName = symbol_name.split(':')[1].trim();

    const mainStat = Math.max(
        Number(symbol_dex),
        Number(symbol_luk),
        Number(symbol_int),
        Number(symbol_str),
    );

    const symbolData = [
        { col: 0, row: 0, render: 'ARC' },
        { col: 1, row: 0, render: symbol_force },
        { col: 0, row: 1, render: '주스탯' },
        { col: 1, row: 1, render: mainStat },
    ] as GridCell[];

    const gridProps = {
        layout: { cols: 2, rows: 2, cells: symbolData },
        style: { space_x: 2 },
    };

    return (
        <div className="flex flex-col gap-1">
            <div className="flex w-50 gap-2" key={symbol_name}>
                <div className="relative flex flex-col items-center justify-center rounded-lg bg-sky-100 p-1">
                    <div>
                        <BaseImg src={symbol_icon} className="h-11 w-11" />
                    </div>
                    <div className="absolute -top-1.5 -left-1.5 rounded-md bg-gray-700 px-1 text-sm font-bold text-white">
                        {symbol_level}
                    </div>
                </div>
                <div>
                    <Grid {...gridProps} />
                </div>
            </div>
            <div>
                <div className="w-full rounded-md bg-gray-200 px-3 py-0.5 text-center text-sm">
                    {symbolName}
                </div>
            </div>
        </div>
    );
});
