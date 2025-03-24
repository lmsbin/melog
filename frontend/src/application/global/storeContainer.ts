import { useSearchDataStore } from '../../common/store';

export class StoreContainer {
	private searchDataStore = useSearchDataStore();

	get searchData() {
		return this.searchDataStore.searchData.inputData;
	}
}
