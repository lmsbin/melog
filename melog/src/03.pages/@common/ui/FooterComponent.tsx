import { memo } from 'react';
import { BasePageComponent } from '../../../01.shared';
import { resolveComponent } from '../resolver';

interface FooterComponentProps extends BasePageComponent {}

export const FooterComponent = memo(({ view_type }: FooterComponentProps) => {
	const ChildComponent = resolveComponent(view_type);

	return (
		<div>
			<ChildComponent />
		</div>
	);
});
