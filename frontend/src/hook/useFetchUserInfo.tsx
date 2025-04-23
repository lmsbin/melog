import { useEffect } from 'react';
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
    useEffect(() => {
        (async function () {
            if (ocid && nickName) {
                const result: any = [];

                result.push(
                    await getUserInfo({
                        key: `cache$nickname$${nickName}`,
                        data: {
                            ocid,
                        },
                    }),
                );

                result.push(
                    await getUserStatInfo({
                        key: `cache$nickname$${nickName}`,
                        data: {
                            ocid,
                        },
                    }),
                );

                result.push(
                    await getUserHyperStatInfo({
                        key: `cache$nickname$${nickName}`,
                        data: {
                            ocid,
                        },
                    }),
                );

                result.push(
                    await getUserPropensity({
                        key: `cache$nickname$${nickName}`,
                        data: {
                            ocid,
                        },
                    }),
                );

                result.push(
                    await getUserAbility({
                        key: `cache$nickname$${nickName}`,
                        data: {
                            ocid,
                        },
                    }),
                );

                result.push(
                    await getUserSymbolEquipment({
                        key: `cache$nickname$${nickName}`,
                        data: {
                            ocid,
                        },
                    }),
                );

                result.push(
                    await getUserSetEffect({
                        key: `cache$nickname$${nickName}`,
                        data: {
                            ocid,
                        },
                    }),
                );

                result.push(
                    await getUserCharacterLinkSkill({
                        key: `cache$nickname$${nickName}`,
                        data: {
                            ocid,
                        },
                    }),
                );

                result.push(
                    await getUserVMatrix({
                        key: `cache$nickname$${nickName}`,
                        data: {
                            ocid,
                        },
                    }),
                );

                result.push(
                    await getUserHexaMatrix({
                        key: `cache$nickname$${nickName}`,
                        data: {
                            ocid,
                        },
                    }),
                );

                result.push(
                    await getUserDojang({
                        key: `cache$nickname$${nickName}`,
                        data: {
                            ocid,
                        },
                    }),
                );

                result.push(
                    await getUserItemEquipment({
                        key: `cache$nickname$${nickName}`,
                        data: {
                            ocid,
                        },
                    }),
                );

                // setUserInfo(result[0]);
                // setUserStatInfo(result[1]);
                // setUserHyperStatInfo(result[2]);
                // setUserPropensity(result[3]);
                // setUserAbility(result[4]);
                // setUserSymbolEquipment(result[5]);
                // setUserSetEffect(result[6]);
                // setUserCharacterLinkSkill(result[7]);
                // setUserVMatrix(result[8]);
                // setUserHexaMatrix(result[9]);
                // setUserDojang(result[10]);
                // setUserItemEquipment(result[11]);
            }
        })();
    }, [ocid, nickName]);
};
