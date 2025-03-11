import { memo, MouseEvent, ReactNode, useCallback } from 'react';
import { BaseComponentProps } from '../../type';

export interface ButtonProps extends BaseComponentProps {
	children?: ReactNode;
	onClick?: (e: MouseEvent) => void;
}

export const Button = memo(function Button(props: ButtonProps) {
	const { className, children } = props;

	const onClick = useCallback(
		(e: MouseEvent) => {
			e.stopPropagation();
			props.onClick?.(e);
		},
		[props.onClick]
	);

	return (
		<button className={className} onClick={onClick}>
			{children}
		</button>
	);
});
