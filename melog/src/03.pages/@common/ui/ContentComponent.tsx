import { memo } from 'react';
import { BasePageComponent } from '../../../01.shared';
import { resolveComponent } from '../resolver';

interface ContentComponentProps extends BasePageComponent {}

export const ContentComponent = memo(({ view_type }: ContentComponentProps) => {
	const ChildComponent = resolveComponent(view_type);

	return (
		<div>
			<ChildComponent />
		</div>
	);
});
