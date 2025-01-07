import { memo, ReactElement, useEffect } from 'react';
import { FooterComponent } from './FooterComponent';
import { ContentComponent } from './ContentComponent';
import { HeaderComponent } from './HeaderComponent';
import { useNavigation } from 'react-router-dom';
import { usePageModel } from '../hooks/usePageModel';

interface MainLayout {
	children: ReactElement;
}

export const MainPageComponent = memo(({ children }: any) => {
	const { page_model } = usePageModel();

	useEffect(() => {
		console.log(page_model);
	}, [page_model]);

	return (
		<>
			<HeaderComponent />
			<ContentComponent />
			<FooterComponent />
		</>
	);
});
