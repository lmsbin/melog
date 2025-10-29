import { memo, PropsWithChildren, useCallback } from 'react';
import { HostButton } from '../../host';
import { buttonVariants, cn } from '@/shared';

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

    const className = cn(
        buttonVariants.base.default,
        isOpen ? buttonVariants.color.nav.active : buttonVariants.color.nav.default,
    );

    return (
        <HostButton className={className} onClick={onClick}>
            {children}
        </HostButton>
    );
});
