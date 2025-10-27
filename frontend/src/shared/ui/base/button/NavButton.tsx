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

    const className = ['px-4 py-1 rounded-md transition-all duration-200'];

    if (isOpen) {
        className.push('font-semibold text-gray-900 bg-gray-50');
    } else {
        className.push('text-gray-600 hover:text-gray-900 hover:bg-gray-50');
    }

    return (
        <HostButton className={className.join(' ')} onClick={onClick}>
            {children}
        </HostButton>
    );
});
