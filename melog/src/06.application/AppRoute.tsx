import { Route, Routes } from 'react-router-dom';
import { Test } from './Test';
import { memo } from 'react';
import { BaseComponentProps } from '../01.shared';
import { MainPageComponent } from '../05.pages';

interface NavigateProps extends BaseComponentProps {}

export const Navigate = memo(() => {
	return (
		<Routes>
			<Route path='/' element={<MainPageComponent />}></Route>
			<Route path='/a' element={<MainPageComponent />}></Route>
			<Route path='/b' element={<MainPageComponent />}></Route>
			<Route path='/c' element={<MainPageComponent />}></Route>
		</Routes>
	);
});
