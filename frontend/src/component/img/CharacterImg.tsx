import { memo } from 'react';
import { BaseImg } from './BaseImg';

interface CharacterImgProps {
    src: string;
}

export const CharacterImg = memo(function CharacterImg({ src }: CharacterImgProps) {
    return <BaseImg className="" src={src} />;
});
