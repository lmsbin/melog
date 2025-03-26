import { memo, MouseEvent, ReactNode, useCallback } from 'react';
import { BaseComponentProps } from '../../type';

export interface ButtonProps extends BaseComponentProps {
	children?: ReactNode;
	onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

export const BaseButton = memo(function BaseButton(props: ButtonProps) {
	const { className, children } = props;

	const onClick = useCallback(
		(e: MouseEvent<HTMLButtonElement>) => {
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
