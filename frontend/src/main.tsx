import { lazy, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

const Application = lazy(() => import('./application/application'));
const TestApplication = lazy(
	() => import('./__test__/application/test_application')
);

(function main() {
	const dev_mode = import.meta.env.MODE;

	const entry = getEntryPoint(dev_mode);

	createRoot(document.getElementById('root')!).render(
		<StrictMode>{entry}</StrictMode>
	);
})();

function getEntryPoint(mode: string) {
	switch (mode) {
		case 'test':
			return <TestApplication />;
		case 'development':
			return <Application />;
	}

	throw new Error(`There is no entry point for mode: '${mode}'`);
}
