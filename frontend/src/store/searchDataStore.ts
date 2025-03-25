import { create } from 'zustand';
import { SearchData } from '../type';

export interface SearchDataStore {
	searchData: SearchData;
	setSearchData: (
		key: keyof SearchData,
		value: SearchData[keyof SearchData]
	) => void;
}

export const useSearchDataStore = create<SearchDataStore>()((set) => ({
	searchData: { inputData: '' },
	setSearchData: (key, value) =>
		set((state) => ({ searchData: { ...state.searchData, [key]: value } })),
}));
