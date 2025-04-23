import { memo, MouseEvent, useCallback } from 'react';
import { BaseComponentProps } from '../../shared';

interface ImgProps extends BaseComponentProps {
    src: string;
    onClick?: (e: MouseEvent<HTMLImageElement>) => void;
}

export const BaseImg = memo(function BaseImg({ className, src, ...props }: ImgProps) {
    const onClick = useCallback(
        (e: MouseEvent<HTMLImageElement>) => {
            props.onClick?.(e);
        },
        [props.onClick],
    );

    return <img className={className} src={src} onClick={onClick} />;
});
