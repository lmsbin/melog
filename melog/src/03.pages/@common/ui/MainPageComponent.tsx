import { memo } from 'react';
import { FooterComponent } from './FooterComponent';
import { ContentComponent } from './ContentComponent';
import { HeaderComponent } from './HeaderComponent';
import { usePageViewType } from '../hooks/usePageViewType';

export const MainPageComponent = memo(() => {
	const { header_view_type, content_view_type, footer_view_type } =
		usePageViewType();

	return (
		<>
			<HeaderComponent view_type={header_view_type} />
			<ContentComponent view_type={content_view_type} />
			<FooterComponent view_type={footer_view_type} />
		</>
	);
});
