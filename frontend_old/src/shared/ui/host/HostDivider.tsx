import { memo } from 'react';

export interface BaseDividerProps {
    direction: 'horizontal' | 'vertical';
}

export const BaseDivider = memo(function BaseDivider({ direction }: BaseDividerProps) {
    return (
        <div
            className={
                direction === 'horizontal' ? 'h-px w-full bg-gray-300' : 'h-full w-px bg-gray-300'
            }
        ></div>
    );
});
