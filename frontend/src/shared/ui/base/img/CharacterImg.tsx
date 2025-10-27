import { memo } from 'react';
import { HostImg } from '../../host';

interface CharacterImgProps {
    src: string;
    scale?: 0 | 50 | 75 | 90 | 95 | 100 | 105 | 110 | 125 | 150 | 200;
}

export const CharacterImg = memo(function CharacterImg({ src, scale = 100 }: CharacterImgProps) {
    const scaleClassMap: Record<number, string> = {
        0: 'scale-0',
        50: 'scale-50',
        75: 'scale-75',
        90: 'scale-90',
        95: 'scale-95',
        100: '',
        105: 'scale-105',
        110: 'scale-110',
        125: 'scale-125',
        150: 'scale-150',
        200: 'scale-200',
    };

    const scaleClass = scaleClassMap[scale];
    return <HostImg className={`h-full w-full object-contain ${scaleClass}`} src={src} />;
});
