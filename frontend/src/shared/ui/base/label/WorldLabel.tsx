import { memo, useMemo } from 'react';
import { HostLabel } from '../../host';

export interface WorldLabelProps {
    worldName: string;
}

export const WorldLabel = memo(function WorldLabel({ worldName }: WorldLabelProps) {
    const imgLink = useMemo(() => {
        return `img/${worldName}.webp`;
    }, [worldName]);

    return <HostLabel text={worldName} imgSrc={imgLink} imgAlt={worldName} />;
});
