import { ReactEventHandler } from 'react';
import { BaseComponentProps } from '../base';

interface ButtonProps extends BaseComponentProps {
	onClick?: ReactEventHandler<HTMLButtonElement>;
}

export function Button({ className, children, onClick }: ButtonProps) {
	return (
		<button className={className} onClick={onClick}>
			{children}
		</button>
	);
}
