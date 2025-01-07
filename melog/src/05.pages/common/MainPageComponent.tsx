import { memo, ReactElement } from 'react';
import { FooterComponent } from './FooterComponent';
import { ContentComponent } from './ContentComponent';
import { HeaderComponent } from './HeaderComponent';
import { useNavigation } from 'react-router-dom';

interface MainLayout {
	children: ReactElement;
}

export const MainPageComponent = memo(({ children }: any) => {
	const a = useNavigation();

	return (
		<>
			<HeaderComponent />
			<ContentComponent />
			<FooterComponent />
		</>
	);
});
