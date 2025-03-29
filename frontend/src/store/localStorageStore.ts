export interface StoreItem<T> {
    data: T;
    version: number;
}

class LocalStorageStore {
    private store: { [key: string]: StoreItem<any> };

    constructor() {
        this.store = {};
        this.initStore();
    }

    private initStore() {
        // 초기에 메모리의 store와 localStorage의 store 동기화
    }

    getData<T>(key: string) {
        // 1. 메모리에서 key에 해당하는 값을 먼저 찾는다
        const data = this.store[key];
        // 2. 없다면 로컬스토리지에 접근한다
        if (!data) {
        }
        // 2-1. 값이 존재하면 메모리의 값을 업데이트하고 해당 값을 반환한다.
        // 2-2. 값이 없다면 에러를 던진다.
    }

    setData(key: string, value: any) {
        // 1.
    }
}

export default new LocalStorageStore();
