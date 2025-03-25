import { memo } from 'react';
import { Outlet } from 'react-router-dom';

export const MainLayout = memo(function MainLayout() {
	return (
		<div>
			<header>헤더입니다</header>
			<div className='container'>
				<Outlet />
			</div>
		</div>
	);
});
