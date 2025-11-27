import { BaseComponentProps } from '@/shared';
import { memo, MouseEvent, useCallback } from 'react';

interface ImgProps extends BaseComponentProps {
    src: string;
    onClick?: (e: MouseEvent<HTMLImageElement>) => void;
}

export const HostImg = memo(function HostImg({ className, src, ...props }: ImgProps) {
    const onClick = useCallback(
        (e: MouseEvent<HTMLImageElement>) => {
            props.onClick?.(e);
        },
        [props.onClick],
    );

    return <img className={className} src={src} onClick={onClick} />;
});
