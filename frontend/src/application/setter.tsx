import { createContext, memo, ReactNode, useMemo } from 'react';
import { StoreContainer } from './global';

interface SetterProps {
	children: ReactNode;
}

const StoreContainerContext = createContext<StoreContainer>(
	new StoreContainer()
);

export const Setter = memo(function Setter({ children }: SetterProps) {
	const storeContainer = useMemo(() => new StoreContainer(), []);

	return (
		<StoreContainerContext.Provider value={storeContainer}>
			{children}
		</StoreContainerContext.Provider>
	);
});
