import { memo, useCallback } from 'react';
import { BaseComponentProps } from '../base';

interface ImageProps extends BaseComponentProps {
	source?: string;
}

export const Image = memo(({ source, className }: ImageProps) => {
	return <img src={source} className={className} />;
});
