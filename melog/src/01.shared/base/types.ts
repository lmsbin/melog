import { ReactElement } from 'react';

export interface BaseComponentProps {
	className?: string;
	children?: ReactElement;
}

export interface BasePageComponent {
	view_type: string;
}
