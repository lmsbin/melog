import { memo } from 'react';
import { HostImg } from '../../host';

interface CharacterImgProps {
    src: string;
    scale?: 0 | 50 | 75 | 90 | 95 | 100 | 105 | 110 | 125 | 150 | 200;
}

export const CharacterImg = memo(function CharacterImg({ src, scale = 100 }: CharacterImgProps) {
    const scaleClass = scale !== 100 ? `scale-${scale}` : '';
    return <HostImg className={`h-full w-full object-contain ${scaleClass}`} src={src} />;
});
