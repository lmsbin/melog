import { memo } from 'react';
import { BasePageComponent } from '../../01.shared';

interface FooterComponentProps extends BasePageComponent {}

export const FooterComponent = memo(({ view_type }: FooterComponentProps) => {
	return <div></div>;
});
