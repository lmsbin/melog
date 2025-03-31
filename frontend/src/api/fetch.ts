import localStorageStore from '../store/localStorageStore';
import { EN_FETCH_METHOD } from '../type';

interface Fetch {
    url: string;
    method: EN_FETCH_METHOD;
    param?: any;
    headers?: any;
}

export async function baseFetch({ url, method, param, headers }: Fetch) {
    try {
        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            },
            body: JSON.stringify(param),
        });

        if (!response.ok) {
            throw new Error(`[ERROR] Fetch Error Occured: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (e) {
        throw e;
    }
}

export interface Cache {
    data: any;
    expiration_time: number;
}

export interface FetchParam<T> {
    key: any;
    data?: T;
    options?: FetchOptions;
}

export interface FetchOptions {
    noCache?: boolean;
}

export function fetchWrapper<T, P>(
    func: (param: T) => Promise<any>,
    expiration_time: number = 604_800_000,
) {
    const STORAGE_KEY = func.name;
    const cache = new Map<any, Cache>(Object.entries(localStorageStore.getData(STORAGE_KEY) ?? {}));

    return async (param: FetchParam<T>): Promise<P> => {
        const { key, data, options } = param;
        const cachedData = cache.get(key);

        if (
            !CACHE_EXCEPTION_FUNC.some((x) => x === func.name) &&
            !options?.noCache &&
            isValidCachedData(cachedData)
        ) {
            console.log(`[INFO] cached data is used: ${cachedData.data} from ${func.name}`);
            return cachedData.data;
        }

        const result = await func(data!);
        cache.set(key, {
            data: result,
            expiration_time: Date.now() + expiration_time,
        });
        console.log(`[INFO] fetch executed: ${key} from ${func.name}`);
        return result;
    };
}

function isValidCachedData(cachedData: Cache | undefined): cachedData is Cache {
    if (!cachedData || cachedData.expiration_time < Date.now()) {
        return false;
    }
    return true;
}

const CACHE_EXCEPTION_FUNC: string[] = [];
