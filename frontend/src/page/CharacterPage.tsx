import { memo, useEffect, useState } from 'react';
import {
    MelogLocation,
    UserAbility,
    UserCharacterLinkSkill,
    UserCharacterSkill,
    UserHyperStatInfo,
    UserInfo,
    UserPropensity,
    UserSetEffect,
    UserStatInfo,
    UserSymbolEquipment,
} from '../type';
import { useLocation, useParams } from 'react-router-dom';
import getUserInfo from '../api/getUserInfo';
import { CharacterImg } from '../component/img/CharacterImg';
import getOcid from '../api/getOcid';
import { SearchBar } from '../component';
import getUserStatInfo from '../api/getUserStatInfo';
import getUserHyperStatInfo from '../api/getUserHyperStatInfo';
import getUserPropensity from '../api/getUserPropensity';
import getUserAbility from '../api/getUserAbility';
import getUserSymbolicEquipment from '../api/getUserSymbolEquipment';
import getUserSetEffect from '../api/getUserSetEffect';
import getUserCharacterSkill from '../api/getUserCharacterSkill';
import getUserSymbolEquipment from '../api/getUserSymbolEquipment';
import getUserCharacterLinkSkill, {
    GetUserCharacterLinkSkillResponse,
} from '../api/getUserCharacterLinkSkill';

export const CharacterPageWrapper = memo(function CharacterPageWrapper() {
    const [ocid, setOcid] = useState<string>('');
    const [userInfo, setUserInfo] = useState<UserInfo>({} as UserInfo);
    const [userStatInfo, setUserStatInfo] = useState<UserStatInfo>({} as UserStatInfo);
    const [userHyperStatInfo, setUserHyperStatInfo] = useState<UserHyperStatInfo>(
        {} as UserHyperStatInfo,
    );
    const [userPropensity, setUserPropensity] = useState<UserPropensity>({} as UserPropensity);
    const [userAbility, setUserAbility] = useState<UserAbility>({} as UserAbility);
    const [userSymbolicEquipment, setUserSymbolEquipment] = useState<UserSymbolEquipment>(
        {} as UserSymbolEquipment,
    );
    const [userSetEffect, setUserSetEffect] = useState<UserSetEffect>({} as UserSetEffect);
    const [userCharacterSkill, setUserCharacterSkill] = useState<UserCharacterSkill>(
        {} as UserCharacterSkill,
    );
    const [userCharacterLinkSkill, setUserCharacterLinkSkill] = useState<UserCharacterLinkSkill>(
        {} as UserCharacterLinkSkill,
    );

    const location: MelogLocation = useLocation();
    const { nickName } = useParams();

    useEffect(() => {
        (async function () {
            const result = await getOcid({
                key: `cache$nickname$${nickName}`,
                data: {
                    nickName: nickName as string,
                },
            });

            setOcid(result.ocid);
        })();
    }, [location]);

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

                await new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(true);
                    }, 500);
                });

                result.push(
                    await getUserStatInfo({
                        key: `cache$nickname$${nickName}`,
                        data: {
                            ocid,
                        },
                    }),
                );

                await new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(true);
                    }, 500);
                });

                result.push(
                    await getUserHyperStatInfo({
                        key: `cache$nickname$${nickName}`,
                        data: {
                            ocid,
                        },
                    }),
                );

                await new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(true);
                    }, 500);
                });

                result.push(
                    await getUserPropensity({
                        key: `cache$nickname$${nickName}`,
                        data: {
                            ocid,
                        },
                    }),
                );

                await new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(true);
                    }, 500);
                });

                result.push(
                    await getUserAbility({
                        key: `cache$nickname$${nickName}`,
                        data: {
                            ocid,
                        },
                    }),
                );

                await new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(true);
                    }, 500);
                });

                result.push(
                    await getUserSymbolEquipment({
                        key: `cache$nickname$${nickName}`,
                        data: {
                            ocid,
                        },
                    }),
                );

                await new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(true);
                    }, 500);
                });

                result.push(
                    await getUserSetEffect({
                        key: `cache$nickname$${nickName}`,
                        data: {
                            ocid,
                        },
                    }),
                );

                await new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(true);
                    }, 500);
                });

                result.push(
                    await getUserCharacterLinkSkill({
                        key: `cache$nickname$${nickName}`,
                        data: {
                            ocid,
                        },
                    }),
                );

                setUserInfo(result[0]);
                setUserStatInfo(result[1]);
                setUserHyperStatInfo(result[2]);
                setUserPropensity(result[3]);
                setUserAbility(result[4]);
                setUserSymbolEquipment(result[5]);
                setUserSetEffect(result[6]);
                setUserCharacterLinkSkill(result[7]);
            }
        })();
    }, [nickName, location, ocid]);

    useEffect(() => {
        (async function () {
            if (typeof userInfo?.character_level === 'number') {
                const result = await getUserCharacterSkill({
                    key: `cache$nickname$${nickName}`,
                    data: {
                        level: userInfo.character_level,
                        ocid: ocid,
                    },
                });

                setUserCharacterSkill(result);
            }
        })();
    }, [userInfo.character_level]);

    if (!userInfo) {
        return <div>404</div>;
    }

    return (
        <CharacterPage
            userInfo={userInfo}
            userStatInfo={userStatInfo}
            userHyperStatInfo={userHyperStatInfo}
            userPropensity={userPropensity}
            userAbility={userAbility}
            userSymbolicEquipment={userSymbolicEquipment}
            userSetEffect={userSetEffect}
            userCharacterSkill={userCharacterSkill}
            userCharacterLinkSkill={userCharacterLinkSkill}
        />
    );
});

interface CharacterPageProps {
    userInfo: UserInfo;
    userStatInfo: UserStatInfo;
    userHyperStatInfo: UserHyperStatInfo;
    userPropensity: UserPropensity;
    userAbility: UserAbility;
    userSymbolicEquipment: UserSymbolEquipment;
    userSetEffect: UserSetEffect;
    userCharacterSkill: UserCharacterSkill;
    userCharacterLinkSkill: UserCharacterLinkSkill;
}
const CharacterPage = memo(function CharacterPage({
    userInfo,
    userStatInfo,
    userHyperStatInfo,
    userPropensity,
    userAbility,
    userSymbolicEquipment,
    userSetEffect,
    userCharacterSkill,
    userCharacterLinkSkill,
}: CharacterPageProps) {
    return (
        <>
            <div>{JSON.stringify(userInfo)}</div>
            <div>{JSON.stringify(userStatInfo)}</div>
            <div>{JSON.stringify(userHyperStatInfo)}</div>
            <div>{JSON.stringify(userPropensity)}</div>
            <div>{JSON.stringify(userAbility)}</div>
            <div>{JSON.stringify(userSymbolicEquipment)}</div>
            <div>{JSON.stringify(userSetEffect)}</div>
            <div>{JSON.stringify(userCharacterSkill)}</div>
            <div>{JSON.stringify(userCharacterLinkSkill)}</div>
            <SearchBar />
            <CharacterImg src={userInfo.character_image} />
        </>
    );
});
