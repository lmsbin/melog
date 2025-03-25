import { memo, useContext, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { StoreContainerContext } from '../application';

export const SearchPage = memo(function SearchPage() {
	const [searchParam] = useSearchParams();
	const { setInputData } = useContext(StoreContainerContext);

	const data = searchParam.get('q');

	useEffect(() => {
		if (data) {
			setInputData(data);
		}
	}, [data]);

	return <div></div>;
});
