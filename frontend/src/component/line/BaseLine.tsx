import { memo } from 'react';

export interface BaseLineProps {
    direction: 'horizontal' | 'vertical';
}

export const BaseLine = memo(function BaseLine({ direction }: BaseLineProps) {
    return (
        <div
            className={
                direction === 'horizontal' ? 'h-px w-full bg-gray-300' : 'h-full w-px bg-gray-300'
            }
        ></div>
    );
});
