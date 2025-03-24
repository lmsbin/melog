import { BrowserRouter } from 'react-router-dom';
import { Router } from './router';
import { Setter } from './setter';

function Application() {
	return (
		<Setter>
			<BrowserRouter>
				<Router />
			</BrowserRouter>
		</Setter>
	);
}

export default Application;
