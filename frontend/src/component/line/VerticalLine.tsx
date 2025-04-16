import { memo } from 'react';
import { BaseLine } from './BaseLine';

export const VerticalLine = memo(function VerticalLine() {
    return <BaseLine direction="vertical" />;
});
