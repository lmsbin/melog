import { memo, ReactEventHandler } from 'react';
import { BaseComponentProps } from '../base';

interface ButtonProps extends BaseComponentProps {
	onClick?: ReactEventHandler<HTMLButtonElement>;
}

export const Button = memo(({ className, children, onClick }: ButtonProps) => {
	return (
		<button className={className} onClick={onClick}>
			{children}
		</button>
	);
});
