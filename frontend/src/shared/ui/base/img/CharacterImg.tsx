import { memo } from 'react';
import { HostImg } from '../../host';

interface CharacterImgProps {
    src: string;
}

export const CharacterImg = memo(function CharacterImg({ src }: CharacterImgProps) {
    return <HostImg className="" src={src} />;
});
