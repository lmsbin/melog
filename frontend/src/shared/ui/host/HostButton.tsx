import { BaseComponentProps } from '@/shared';
import { memo, MouseEvent, PropsWithChildren, useCallback } from 'react';

export interface ButtonProps extends BaseComponentProps, PropsWithChildren {
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

export const HostButton = memo(function BaseButton(props: ButtonProps) {
    const { className, children } = props;

    const onClick = useCallback(
        (e: MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();
            props.onClick?.(e);
        },
        [props.onClick],
    );

    return (
        <button className={`cursor-pointer ${className} `} onClick={onClick}>
            {children}
        </button>
    );
});
