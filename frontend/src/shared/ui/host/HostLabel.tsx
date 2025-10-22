import { memo, useMemo } from 'react';

export interface LabelProps {
    text: string;
    imgSrc?: string;
    imgAlt?: string;
    className?: string;
    imgSize?: string;
}

export const HostLabel = memo(function HostLabel({
    text,
    imgSrc,
    imgAlt,
    className = '',
    imgSize = 'w-6 h-6',
}: LabelProps) {
    const containerClasses = useMemo(() => {
        const baseClasses = 'flex max-w-32 items-center justify-center rounded-md border-1';
        return `${baseClasses} ${className}`.trim();
    }, [className]);

    return (
        <div className={containerClasses}>
            {imgSrc && (
                <img
                    src={imgSrc}
                    alt={imgAlt || text}
                    className={`${imgSize} mr-2 object-contain`}
                />
            )}
            <span>{text}</span>
        </div>
    );
});
