import { memo, useMemo } from 'react';
import { BaseImg } from '../img';

export interface WorldLabelProps {
    worldName: string;
}

export const WorldLabel = memo(function WorldLabel({ worldName }: WorldLabelProps) {
    const imgLink = useMemo(() => {
        return `img/${worldName}.webp`;
    }, [worldName]);

    return (
        <div className="flex max-w-32 items-center justify-center rounded-md border-1">
            <BaseImg src={imgLink} />
            <span>{worldName}</span>
        </div>
    );
});
