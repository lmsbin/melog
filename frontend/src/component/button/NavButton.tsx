import { memo, ReactNode, useCallback } from 'react';
import { BaseButton } from './BaseButton';

export interface NavButtonProps {
    children?: ReactNode;
    index: number;
    onClick: (index: number) => void;
    isOpen?: boolean;
}

export const NavButton = memo(function NavButton({
    children,
    index,
    isOpen,
    ...props
}: NavButtonProps) {
    const onClick = useCallback(() => {
        props.onClick?.(index);
    }, [index]);

    const className = [];

    if (isOpen) {
        className.push('font-bold');
    }

    return (
        <BaseButton className={className.join(' ')} onClick={onClick}>
            {children}
        </BaseButton>
    );
});
