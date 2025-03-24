import { Route, Routes } from 'react-router-dom';
import { MainLayout } from '../common/page';
import { MainPage } from '../common/page/MainPage';

export function Router() {
	return (
		<Routes>
			<Route path='/' element={<MainLayout />}>
				<Route index element={<MainPage />} />
			</Route>
			<Route path='*' element={<div>not found</div>} />
		</Routes>
	);
}
