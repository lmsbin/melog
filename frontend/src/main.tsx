import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Application } from './application';
import { TestApplication } from './__test__';

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
