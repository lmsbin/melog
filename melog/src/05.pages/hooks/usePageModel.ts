import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ENUM_PAGE_MODEL_TYPE } from '../../01.shared';

interface usePageModel {
	initialValue?: string;
}

export function usePageModel() {
	const { pathname, search, state } = useLocation();

	const page_model = getModel(pathname);

	return { page_model };
}

function getModel(pathname: string): ENUM_PAGE_MODEL_TYPE {
	switch (pathname) {
		case '/':
			return ENUM_PAGE_MODEL_TYPE.MAIN;
		default:
			return ENUM_PAGE_MODEL_TYPE.ERROR;
	}
}
