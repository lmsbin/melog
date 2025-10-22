import { memo, PropsWithChildren, useCallback } from 'react';
import { HostButton } from '../../host';

export interface NavButtonProps extends PropsWithChildren {
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
        <HostButton className={className.join(' ')} onClick={onClick}>
            {children}
        </HostButton>
    );
});
