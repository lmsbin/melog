import { Route, Routes } from 'react-router-dom';
import {
	MainLayout,
	MainPage,
	CharacterPageWrapper,
	SearchPageWrapper,
} from '../page';

export function Router() {
	return (
		<Routes>
			<Route path='/' element={<MainLayout />}>
				<Route index element={<MainPage />} />
				<Route path='search' element={<SearchPageWrapper />} />
				<Route
					path='character/:nickName'
					element={<CharacterPageWrapper />}
				/>
			</Route>
			<Route path='*' element={<div>not found</div>} />
		</Routes>
	);
}
