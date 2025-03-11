import { memo } from 'react';
import { GetFetchUnit, PostFetchUnit } from '../fetch/fetch';

const TestApplication = memo(function TestApplication() {
	return (
		<>
			<div>테스트베드</div>
			<GetFetchUnit />
			<PostFetchUnit />
		</>
	);
});

export default TestApplication;
