import { MemoExoticComponent } from 'react';
import {
	ENUM_CONTENT_VIEW_TYPE,
	ENUM_FOOTER_VIEW_TYPE,
	ENUM_HEADER_VIEW_TYPE,
} from '../../../01.shared';
import { content, footer, header } from '../../../02.widgets';

export function resolveComponent(
	view_type:
		| ENUM_HEADER_VIEW_TYPE
		| ENUM_CONTENT_VIEW_TYPE
		| ENUM_FOOTER_VIEW_TYPE
): any {
	const [section, type] = view_type.split('_');

	if (isHeaderViewType(view_type)) {
		return header[type as keyof typeof header];
	} else if (isContentViewType(view_type)) {
		return content[type as keyof typeof content];
	} else if (isFooterViewType(view_type)) {
		return footer[type as keyof typeof footer];
	}
}

function isHeaderViewType(
	view_type:
		| ENUM_HEADER_VIEW_TYPE
		| ENUM_CONTENT_VIEW_TYPE
		| ENUM_FOOTER_VIEW_TYPE
): view_type is ENUM_HEADER_VIEW_TYPE {
	return view_type.includes('Header');
}

function isContentViewType(
	view_type:
		| ENUM_HEADER_VIEW_TYPE
		| ENUM_CONTENT_VIEW_TYPE
		| ENUM_FOOTER_VIEW_TYPE
): view_type is ENUM_HEADER_VIEW_TYPE {
	return view_type.includes('Content');
}

function isFooterViewType(
	view_type:
		| ENUM_HEADER_VIEW_TYPE
		| ENUM_CONTENT_VIEW_TYPE
		| ENUM_FOOTER_VIEW_TYPE
): view_type is ENUM_HEADER_VIEW_TYPE {
	return view_type.includes('Footer');
}
