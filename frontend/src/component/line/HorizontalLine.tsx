import { memo } from 'react';
import { BaseLine } from './BaseLine';

export const HorizontalLine = memo(function HorizontalLine() {
    return <BaseLine direction="horizontal" />;
});
