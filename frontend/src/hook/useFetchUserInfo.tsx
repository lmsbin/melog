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
import { userStore } from '@/store';

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

                const results: any = {};
                for (const request of requests) {
                    const result = await request.fn({
                        key: `cache$nickname$${nickName}`,
                        data: { ocid },
                    });

                    results[request.key] = result;
                }

                userStore.setPartial({
                    userInfo: results.userInfo,
                    userStatInfo: results.userStatInfo,
                    userHyperStatInfo: results.userHyperStatInfo,
                    userPropensity: results.userPropensity,
                    userAbility: results.userAbility,
                    userSymbolEquipment: results.userSymbolEquipment,
                    userSetEffect: results.userSetEffect,
                    userCharacterLinkSkill: results.userCharacterLinkSkill,
                    userVMatrix: results.userVMatrix,
                    userHexaMatrix: results.userHexaMatrix,
                    userDojang: results.userDojang,
                    userItemEquipment: results.userItemEquipment,
                });
            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        })();
    }, [ocid, nickName]);

    console.log('return ', fetchResult, loading, error);
    return { fetchResult, loading, error };
};
