import { SearchDataStore } from '../../common';

export class StoreContainer {
	private searchDataStore: SearchDataStore;

	constructor(searchDataStore: SearchDataStore) {
		this.searchDataStore = searchDataStore;
	}

	get searchData() {
		return this.searchDataStore.searchData.inputData;
	}

	setInputData = (inputValue: string) => {
		const { searchData, setSearchData } = this.searchDataStore;

		if (searchData.inputData === inputValue) return;

		console.log(`[INFO] StoreContainer >> setInputData ${inputValue}`);
		setSearchData('inputData', inputValue);
	};
}
