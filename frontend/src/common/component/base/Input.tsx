import {
	ChangeEvent,
	forwardRef,
	HTMLInputTypeAttribute,
	KeyboardEvent,
	memo,
	MouseEvent,
	Ref,
	useCallback,
} from 'react';

export type InputProps = {
	className?: string;
	disabled?: boolean;
	type?: HTMLInputTypeAttribute;
	onClick?: (e: MouseEvent) => void;
	onChange?: (e: ChangeEvent) => void;
	onKeyDown?: (e: KeyboardEvent) => void;
};

export const Input = memo(
	forwardRef(function Input(props: InputProps, ref: Ref<HTMLInputElement>) {
		const { className, disabled, type } = props;

		const onClick = useCallback(
			(e: MouseEvent) => {
				e.stopPropagation();
				props.onClick?.(e);
			},
			[props.onClick]
		);

		const onChange = useCallback(
			(e: ChangeEvent) => {
				props.onChange?.(e);
			},
			[props.onChange]
		);

		const onKeyDown = useCallback(
			(e: KeyboardEvent) => {
				props.onKeyDown?.(e);
			},
			[props.onKeyDown]
		);

		return (
			<input
				ref={ref}
				type={type}
				className={className}
				disabled={disabled}
				onClick={onClick}
				onChange={onChange}
				onKeyDown={onKeyDown}
			/>
		);
	})
);
