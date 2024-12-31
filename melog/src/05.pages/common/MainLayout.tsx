import { ReactElement } from 'react';
import { Button } from '../../01.shared/common/ui';

interface MainLayout {
	children: ReactElement;
}

export function MainLayout({ children }: any) {
	return (
		<div>
			MainLayout
			{children}
		</div>
	);
}
