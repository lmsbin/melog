import { memo } from 'react';
import { BasePageComponent } from '../../01.shared';

interface HeaderComponentProps extends BasePageComponent {}

export const HeaderComponent = memo(({ view_type }: BasePageComponent) => {
	return <div></div>;
});
