import { Route, Routes } from 'react-router-dom';
import { Test } from './Test';
import { memo } from 'react';
import { BaseComponentProps } from '../01.shared';
import { MainPageComponent } from '../03.pages';

interface NavigateProps extends BaseComponentProps {}

export const Navigate = memo(() => {
	return (
		<Routes>
			<Route path='/' element={<MainPageComponent />}></Route>
		</Routes>
	);
});
