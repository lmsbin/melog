import { memo } from 'react';
import { BasePageComponent } from '../../01.shared';

interface ContentComponentProps extends BasePageComponent {}

export const ContentComponent = memo(({ view_type }: ContentComponentProps) => {
	return <div></div>;
});
