import { memo } from 'react';
import { EN_ALIGN_OPTION } from '../type';

export interface CardProps {
    children?: React.ReactNode;
    align?: {
        horizontal?: EN_ALIGN_OPTION;
        vertical?: EN_ALIGN_OPTION;
    };
    width?: 'full' | 'fit';
    height?: 'full' | 'fit';
}

export const Card = memo(function Card({ children, align, ...props }: CardProps) {
    const horizontalAlign = align?.horizontal ? `items-${align.horizontal}` : 'items-start';

    const verticalAlign = align?.vertical ? `justify-${align.vertical}` : 'justify-start';

    const width = props.width ?? 'full';
    const height = props.height ?? 'full';

    return (
        <div
            className={`flex w-${width} min-w-fit flex-wrap rounded-2xl bg-white p-4 shadow-md transition duration-500 hover:shadow-lg ${horizontalAlign} ${verticalAlign} h-${height}`}
        >
            {children}
        </div>
    );
});
