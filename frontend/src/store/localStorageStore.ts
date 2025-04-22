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
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);

            if (key) {
                const value = JSON.parse(localStorage.getItem(key) ?? '{}');
                this.store[key] = value;
            }
        }
    }

    getData<T>(key: string) {
        // 1. 메모리에서 key에 해당하는 값을 먼저 찾는다
        const data = this.store[key];

        // 2. 없다면 로컬스토리지에 접근한다
        if (!data) {
            // 2-1. 값이 존재하면 메모리의 값을 업데이트하고 해당 값을 반환한다.
            const storageData = localStorage.getItem(key);
            if (storageData) this.store[key] = JSON.parse(storageData);
            console.log(`[INFO] Access localStorage for ${key}`);
        } else {
            console.log(`[INFO] Memory store used for ${key}`);
        }

        return this.store[key];
    }

    setData(key: string, value: Object) {
        localStorage.setItem(key, JSON.stringify(value));
    }
}

export default new LocalStorageStore();
