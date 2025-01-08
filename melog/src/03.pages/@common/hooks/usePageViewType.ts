import { useLocation } from 'react-router-dom';
import {
	ENUM_CONTENT_VIEW_TYPE,
	ENUM_FOOTER_VIEW_TYPE,
	ENUM_HEADER_VIEW_TYPE,
} from '../../../01.shared';

interface pageViewTypes {
	header_view_type: ENUM_HEADER_VIEW_TYPE;
	content_view_type: ENUM_CONTENT_VIEW_TYPE;
	footer_view_type: ENUM_FOOTER_VIEW_TYPE;
}

export function usePageViewType(): pageViewTypes {
	const { pathname, search, state } = useLocation();

	const header_view_type = getHeaderViewType(pathname);
	const content_view_type = getContentViewType(pathname);
	const footer_view_type = getFooterViewType(pathname);

	return { header_view_type, content_view_type, footer_view_type };
}

function getHeaderViewType(pathname: string): ENUM_HEADER_VIEW_TYPE {
	switch (pathname) {
		case '/':
			return ENUM_HEADER_VIEW_TYPE.MAIN;
		default:
			return ENUM_HEADER_VIEW_TYPE.ERROR;
	}
}

function getContentViewType(pathname: string): ENUM_CONTENT_VIEW_TYPE {
	switch (pathname) {
		case '/':
			return ENUM_CONTENT_VIEW_TYPE.MAIN;
		default:
			return ENUM_CONTENT_VIEW_TYPE.ERROR;
	}
}

function getFooterViewType(pathname: string): ENUM_FOOTER_VIEW_TYPE {
	switch (pathname) {
		case '/':
			return ENUM_FOOTER_VIEW_TYPE.MAIN;
		default:
			return ENUM_FOOTER_VIEW_TYPE.ERROR;
	}
}
