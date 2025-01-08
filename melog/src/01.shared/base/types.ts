import { ReactElement } from 'react';
import {
	ENUM_CONTENT_VIEW_TYPE,
	ENUM_FOOTER_VIEW_TYPE,
	ENUM_HEADER_VIEW_TYPE,
} from '../variables';

export interface BaseComponentProps {
	className?: string;
	children?: ReactElement;
}

export interface BasePageComponent {
	view_type:
		| ENUM_HEADER_VIEW_TYPE
		| ENUM_CONTENT_VIEW_TYPE
		| ENUM_FOOTER_VIEW_TYPE;
}
