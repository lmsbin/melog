import { ReactEventHandler } from 'react';
import { BaseComponentProps } from '../base';

interface LabelProps extends BaseComponentProps {
	onClick?: ReactEventHandler<HTMLSpanElement>;
}

export const Label = ({ children, className, onClick }: LabelProps) => {
	return (
		<span className={className} onClick={onClick}>
			{children}
		</span>
	);
};
