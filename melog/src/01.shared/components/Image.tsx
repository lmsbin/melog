import { BaseComponentProps } from '../base';

interface ImageProps extends BaseComponentProps {
	source?: string;
}

export function Image({ source, className }: ImageProps) {
	return <img src={source} className={className} />;
}
