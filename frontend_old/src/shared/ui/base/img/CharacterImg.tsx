import { memo } from 'react';
import { HostImg } from '../../host';
import { tw, type SupportedScale } from '@/shared';

interface CharacterImgProps {
    src: string;
    scale?: SupportedScale;
}

export const CharacterImg = memo(function CharacterImg({ src, scale = 100 }: CharacterImgProps) {
    const scaleClass = tw.getScaleClass(scale);
    return <HostImg className={`h-full w-full object-contain ${scaleClass}`} src={src} />;
});
