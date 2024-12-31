import { Route, Routes } from 'react-router-dom';
import { Test } from './Test';

export function AppRoutes() {
	return (
		<Routes>
			<Route path='/' element={<Test />}></Route>
		</Routes>
	);
}
