import { ChangeEvent, KeyboardEvent, MouseEvent, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export interface useSearch {
	searchData: string;
	setInputData: (inputValue: string) => void;
}

export const useSearch = ({ searchData, setInputData }: useSearch) => {
	const navigate = useNavigate();

	const searchMainAction = useCallback(() => {
		const queryString = `?q=${searchData}`;
		const searchURL = `/search${queryString}`;

		console.log(
			`[ACTION] searchMainAction queryString: ${queryString} searchURL: ${searchURL}`
		);

		navigate(searchURL);
	}, [searchData]);

	const onKeyDown = useCallback(
		(e: KeyboardEvent<HTMLInputElement>) => {
			if (e.key === 'Enter') {
				searchMainAction();
			}
		},
		[searchMainAction]
	);

	const onChange = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			const value = e.target.value;

			if (value !== searchData) {
				setInputData(value);
			}
		},
		[searchData, setInputData]
	);

	const onClick = useCallback(
		(e: MouseEvent<HTMLButtonElement>) => {
			searchMainAction();
		},
		[searchMainAction]
	);

	return {
		onKeyDown,
		onClick,
		onChange,
	};
};
