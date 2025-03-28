import { memo, ReactNode, useCallback } from 'react';
import { BaseButton } from './BaseButton';

export interface NavButtonProps {
    children?: ReactNode;
    index: number;
    onClick: (index: number) => void;
}

export const NavButton = memo(function NavButton({ children, index, ...props }: NavButtonProps) {
    const onClick = useCallback(() => {
        props.onClick?.(index);
    }, [index]);

    return (
        <BaseButton className="" onClick={onClick}>
            {children}
        </BaseButton>
    );
});
