import { memo } from 'react';
import { EN_ALIGN_OPTION } from '@/shared';

export interface CardProps {
    children?: React.ReactNode;
    align?: {
        horizontal?: EN_ALIGN_OPTION;
        vertical?: EN_ALIGN_OPTION;
    };
    width?: 'full' | 'fit' | string;
    height?: 'full' | 'fit' | string;
    label?: string;
}

export const Card = memo(function Card({ children, align, ...props }: CardProps) {
    const horizontalAlign = align?.horizontal ? `justify-${align.horizontal}` : 'justify-start';

    const verticalAlign = align?.vertical ? `items-${align.vertical}` : 'items-start';

    const width = props.width ?? 'full';
    const height = props.height ?? 'full';

    return (
        <div
            className={`flex w-${width} min-w-fit flex-wrap rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-300 hover:border-gray-200 hover:shadow-md ${horizontalAlign} ${verticalAlign} h-${height} max-h-${height} gap-2`}
        >
            {props.label && (
                <div className="mb-1 flex w-full !items-start !justify-start self-start">
                    <span className="text-base font-semibold text-gray-800">{props.label}</span>
                </div>
            )}
            {children}
        </div>
    );
});
