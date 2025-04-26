import { useEffect, useState } from 'react';

export function useFetch<P, T>(fetchFn: (param: P) => Promise<T>, param: P) {
    const [loading, setLoading] = useState<boolean>(false);
    const [result, setResult] = useState<T>();
    const [error, setError] = useState<null | Error>(null);

    console.log('useFetch', param);
    useEffect(() => {
        (async function useFetchFunction() {
            setLoading(true);
            try {
                const fetchResult = await fetchFn(param);
                setResult(fetchResult);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    return { result, loading, error };
}
