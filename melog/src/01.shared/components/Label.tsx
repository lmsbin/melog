import { ReactEventHandler } from 'react';
import { BaseComponentProps } from '../base';

interface LabelProps extends BaseComponentProps {
	onClick?: ReactEventHandler<HTMLSpanElement>;
}

export function Label({ children, className, onClick }: LabelProps) {
	return (
		<span className={className} onClick={onClick}>
			{children}
		</span>
	);
}
