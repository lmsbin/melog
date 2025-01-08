import { memo } from 'react';
import { BasePageComponent, ENUM_HEADER_VIEW_TYPE } from '../../../01.shared';
import { resolveComponent } from '../resolver';

interface HeaderComponentProps extends BasePageComponent {}

export const HeaderComponent = memo(({ view_type }: HeaderComponentProps) => {
	const ChildComponent = resolveComponent(view_type);

	return (
		<div>
			<ChildComponent />
		</div>
	);
});
