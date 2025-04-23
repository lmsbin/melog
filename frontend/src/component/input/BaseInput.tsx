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
import { BaseComponentProps } from '../../shared';

export interface InputProps extends BaseComponentProps {
    disabled?: boolean;
    type?: HTMLInputTypeAttribute;
    placeholder?: string;
    onClick?: (e: MouseEvent<HTMLInputElement>) => void;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
}

export const BaseInput = memo(
    forwardRef(function BaseInput(props: InputProps, ref: Ref<HTMLInputElement>) {
        const { className, disabled, type, placeholder } = props;

        const onClick = useCallback(
            (e: MouseEvent<HTMLInputElement>) => {
                e.stopPropagation();
                props.onClick?.(e);
            },
            [props.onClick],
        );

        const onChange = useCallback(
            (e: ChangeEvent<HTMLInputElement>) => {
                props.onChange?.(e);
            },
            [props.onChange],
        );

        const onKeyDown = useCallback(
            (e: KeyboardEvent<HTMLInputElement>) => {
                props.onKeyDown?.(e);
            },
            [props.onKeyDown],
        );

        return (
            <input
                ref={ref}
                type={type}
                className={`p-1.5 ${className}`}
                disabled={disabled}
                onClick={onClick}
                onChange={onChange}
                onKeyDown={onKeyDown}
                placeholder={placeholder}
            />
        );
    }),
);
