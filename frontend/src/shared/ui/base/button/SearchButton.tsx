import { memo } from 'react';
import { ButtonProps, HostButton } from '../../host';
import { buttonVariants, cn } from '@/shared';

export type SearchButtonProps = Pick<ButtonProps, 'onClick'>;

export const SearchButton = memo(function SearchButton({ onClick }: SearchButtonProps) {
    return (
        <HostButton
            className={cn(
                'ml-2',
                buttonVariants.base.default,
                buttonVariants.size.md,
                buttonVariants.color.primary,
            )}
            onClick={onClick}
        >
            검색
        </HostButton>
    );
});
