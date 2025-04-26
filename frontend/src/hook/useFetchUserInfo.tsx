import { useEffect, useState } from 'react';
import getUserAbility from '@api/getUserAbility';
import getUserCharacterLinkSkill from '@api/getUserCharacterLinkSkill';
import getUserDojang from '@api/getUserDojang';
import getUserHexaMatrix from '@api/getUserHexaMatrix';
import getUserHyperStatInfo from '@api/getUserHyperStatInfo';
import getUserInfo from '@api/getUserInfo';
import getUserItemEquipment from '@api/getUserItemEquipment';
import getUserPropensity from '@api/getUserPropensity';
import getUserSetEffect from '@api/getUserSetEffect';
import getUserStatInfo from '@api/getUserStatInfo';
import getUserSymbolEquipment from '@api/getUserSymbolEquipment';
import getUserVMatrix from '@api/getUserVMatrix';

export const useFetchUserInfo = (ocid: string, nickName: string) => {
    const [fetchResult, setFetchResult] = useState<{ [key in string]: any }>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<null | Error>(null);
    console.log('useFetchUserInfo', ocid, nickName);

    useEffect(() => {
        if (!ocid || !nickName) return;

        (async function () {
            setLoading(true);
            setError(null);
            try {
                const requests = [
                    { key: 'userInfo', fn: getUserInfo },
                    { key: 'userStatInfo', fn: getUserStatInfo },
                    { key: 'userHyperStatInfo', fn: getUserHyperStatInfo },
                    { key: 'userPropensity', fn: getUserPropensity },
                    { key: 'userAbility', fn: getUserAbility },
                    { key: 'userSymbolEquipment', fn: getUserSymbolEquipment },
                    { key: 'userSetEffect', fn: getUserSetEffect },
                    { key: 'userCharacterLinkSkill', fn: getUserCharacterLinkSkill },
                    { key: 'userVMatrix', fn: getUserVMatrix },
                    { key: 'userHexaMatrix', fn: getUserHexaMatrix },
                    { key: 'userDojang', fn: getUserDojang },
                    { key: 'userItemEquipment', fn: getUserItemEquipment },
                ];

                const results = await Promise.all(
                    requests.map(({ key, fn }) =>
                        fn({
                            key: `cache$nickname$${nickName}`,
                            data: { ocid },
                        }).then((value) => ({ key, value })),
                    ),
                );

                const resultObject = {};
                for (const result of results) {
                    resultObject[result.key] = result.value;
                }

                setFetchResult(resultObject);
            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        })();
    }, [ocid, nickName]);

    return { fetchResult, loading, error };
};
