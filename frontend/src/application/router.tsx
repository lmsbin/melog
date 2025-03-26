import { Route, Routes } from 'react-router-dom';
import { MainLayout } from '../page';
import { MainPage } from '../page/MainPage';
import { SearchPageWrapper } from '../page/SearchPage';

export function Router() {
	return (
		<Routes>
			<Route path='/' element={<MainLayout />}>
				<Route index element={<MainPage />} />
				<Route path='search' element={<SearchPageWrapper />} />
			</Route>
			<Route path='*' element={<div>not found</div>} />
		</Routes>
	);
}
