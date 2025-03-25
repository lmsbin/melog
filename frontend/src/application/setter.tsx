import { createContext, memo, ReactNode } from 'react';
import { StoreContainer } from './global';
import { useSearchDataStore } from '../store';

export interface SetterProps {
	children: ReactNode;
}

export const StoreContainerContext = createContext<StoreContainer>(
	{} as StoreContainer
);

export const Setter = memo(function Setter({ children }: SetterProps) {
	const searchDataStore = useSearchDataStore();

	const storeContainer = new StoreContainer(searchDataStore);

	return (
		<StoreContainerContext.Provider value={storeContainer}>
			{children}
		</StoreContainerContext.Provider>
	);
});
