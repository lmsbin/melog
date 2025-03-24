import { ChangeEvent, KeyboardEvent, memo, useCallback, useState } from 'react';
import { BaseButton, BaseInput } from '../../common';

interface FetchUnit {
	method: 'GET' | 'POST';
}

const FetchUnit = memo(function FetchUnit({ method }: FetchUnit) {
	const [url, setUrl] = useState<string>('');
	const [postJson, setPostJson] = useState<string>('');

	const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		const new_value = e.target.value;

		if (new_value !== url) {
			setUrl(new_value);
		}
	}, []);

	const onClick = useCallback(async () => {
		const BASE_URL = window.location.href;
		const payload =
			typeof postJson !== 'string' ? JSON.stringify(postJson) : postJson;

		try {
			const response = await fetch(`${BASE_URL}${url}`, {
				method,
				body: payload,
			});
			console.log(response);
		} catch (e) {
			console.log(e);
		}
	}, [method, url]);

	const onKeyDown = useCallback(
		(e: KeyboardEvent<HTMLInputElement>) => {
			if (e.key === 'Enter') {
				onClick();
			}
		},
		[onClick]
	);

	const onChangePostInput = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			const new_value = e.target.value;

			if (new_value !== postJson) {
				setPostJson(new_value);
			}
		},
		[]
	);

	return (
		<div>
			<BaseInput
				onChange={onChange}
				onKeyDown={onKeyDown}
				placeholder='lms/getcharacter'
			/>
			<BaseButton onClick={onClick}>{method}</BaseButton>
			{method === 'POST' && (
				<BaseInput
					onChange={onChangePostInput}
					onKeyDown={onKeyDown}
					placeholder='json or object'
				/>
			)}
		</div>
	);
});

export const GetFetchUnit = memo(function GetFetchUnit() {
	return <FetchUnit method='GET' />;
});

export const PostFetchUnit = memo(function GetFetchUnit() {
	return <FetchUnit method='POST' />;
});
