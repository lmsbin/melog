import { memo, ReactEventHandler } from 'react';
import { BaseComponentProps } from '../base';

interface InputProps extends BaseComponentProps {
	onClick?: ReactEventHandler<HTMLInputElement>;
	onChange?: ReactEventHandler<HTMLInputElement>;
	onBlur?: ReactEventHandler<HTMLInputElement>;
	onFocus?: ReactEventHandler<HTMLInputElement>;
}

export const Input = memo(
	({ className, onClick, onChange, onBlur, onFocus }: InputProps) => {
		return (
			<input
				className={className}
				onClick={onClick}
				onChange={onChange}
				onBlur={onBlur}
				onFocus={onFocus}
			/>
		);
	}
);
