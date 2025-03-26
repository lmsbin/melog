import {
	ChangeEvent,
	KeyboardEvent,
	MouseEvent,
	useCallback,
	useState,
} from 'react';
import { useNavigate } from 'react-router-dom';

export interface useSearch {}

export const useSearch = () => {
	const navigate = useNavigate();

	const [searchValue, setSearchValue] = useState('');

	const searchMainAction = useCallback(() => {
		const queryString = `?q=${searchValue}`;
		const searchURL = `/search${queryString}`;

		console.log(
			`[ACTION] searchMainAction queryString: ${queryString} searchURL: ${searchURL}`
		);

		navigate(searchURL);
	}, [searchValue]);

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

			if (value !== searchValue) {
				setSearchValue(value);
			}
		},
		[searchValue, setSearchValue]
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
