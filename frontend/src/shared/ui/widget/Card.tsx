import { memo } from 'react';
import { EN_ALIGN_OPTION, tw } from '@/shared';
import { cardVariants, cn } from '../variants';

export interface CardProps {
    children?: React.ReactNode;
    align?: {
        horizontal?: EN_ALIGN_OPTION;
        vertical?: EN_ALIGN_OPTION;
    };
    width?: 'full' | 'fit' | string;
    height?: 'full' | 'fit' | string;
    label?: string;
    size?: keyof typeof cardVariants.size;
    color?: keyof typeof cardVariants.color;
}

export const Card = memo(function Card({ children, align, ...props }: CardProps) {
    const horizontalAlign = align?.horizontal
        ? tw.getJustifyClass(align.horizontal)
        : 'justify-start';

    const verticalAlign = align?.vertical ? tw.getItemsClass(align.vertical) : 'items-start';

    const width = props.width ?? 'full';
    const height = props.height ?? 'full';
    const size = props.size ?? 'default';
    const color = props.color ?? 'default';

    // Variant 기반 클래스 조합
    const containerClasses = cn(
        'flex',
        tw.getWidthClass(width),
        tw.getHeightClass(height),
        tw.getMaxHeightClass(height),
        cardVariants.base.container,
        cardVariants.color[color],
        cardVariants.size[size],
        cardVariants.base.hover,
        horizontalAlign,
        verticalAlign,
    );

    return (
        <div className={containerClasses}>
            {props.label && (
                <div className={cardVariants.base.label}>
                    <span className={cardVariants.base.labelText}>{props.label}</span>
                </div>
            )}
            {children}
        </div>
    );
});
