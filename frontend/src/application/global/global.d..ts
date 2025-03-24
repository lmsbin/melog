import { StoreContainer } from './storeContainer';

declare global {
	interface Window {
		storeContainer: StoreContainer;
	}
}
