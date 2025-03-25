import { memo, useContext, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { StoreContainerContext } from '../application';
import getOcid from '../util/fetch/getOcid';

export const SearchPage = memo(function SearchPage() {
	const [searchParam] = useSearchParams();
	const { searchData, setInputData } = useContext(StoreContainerContext);

	const data = searchParam.get('q');

	useEffect(() => {
		if (data) {
			setInputData(data);
		}
	}, [data]);

	useEffect(() => {
		getOcid({
			key: searchData,
			data: {
				nickName: searchData,
			},
		});
	}, [searchData]);

	return <div></div>;
});
