import { memo, useEffect, useState } from 'react';
import {
    EN_ALIGN_OPTION,
    MelogLocation,
    UserAbility,
    UserCharacterLinkSkill,
    UserCharacterSkill,
    UserDojang,
    UserHexaMatrix,
    UserHyperStatInfo,
    UserInfo,
    UserPropensity,
    UserSetEffect,
    UserStatInfo,
    UserSymbolEquipment,
    UserVMatrix,
} from '../type';
import { useLocation, useParams } from 'react-router-dom';
import getUserInfo from '../api/getUserInfo';
import { CharacterImg } from '../component/img/CharacterImg';
import getOcid from '../api/getOcid';
import { Card, HorizontalLine, Loading, SearchBar, VerticalLine } from '../component';
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
import { WorldLabel } from '../component/label';
import { NicknameLabel } from '../component/label/NicknameLabel';
import CharacterCard from '../component/UserInfoCard';
import CharacterCardWrapper from '../component/UserInfoCard';
import UserStatInfoCardWrapper from '../component/UserStatInfoCard';
import getUserVMatrix from '../api/getUserVMatrix';
import getUserHexaMatrix from '../api/getUserHexaMatrix';
import getUserDojang from '../api/getUserDojang';

export const CharacterPageWrapper = memo(function CharacterPageWrapper() {
    const [ocid, setOcid] = useState<string>('');
    const [userInfo, setUserInfo] = useState<UserInfo>();
    const [userStatInfo, setUserStatInfo] = useState<UserStatInfo>();
    const [userHyperStatInfo, setUserHyperStatInfo] = useState<UserHyperStatInfo>();
    const [userPropensity, setUserPropensity] = useState<UserPropensity>();
    const [userAbility, setUserAbility] = useState<UserAbility>();
    const [userSymbolicEquipment, setUserSymbolEquipment] = useState<UserSymbolEquipment>();
    const [userSetEffect, setUserSetEffect] = useState<UserSetEffect>();
    const [userCharacterSkill, setUserCharacterSkill] = useState<UserCharacterSkill>();
    const [userCharacterLinkSkill, setUserCharacterLinkSkill] = useState<UserCharacterLinkSkill>();
    const [userVMatrix, setUserVMatrix] = useState<UserVMatrix>();
    const [userHexaMatrix, setUserHexaMatrix] = useState<UserHexaMatrix>();
    const [userDojang, setUserDojang] = useState<UserDojang>();

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

                await new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(true);
                    }, 500);
                });

                result.push(
                    await getUserVMatrix({
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
                    await getUserHexaMatrix({
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
                    await getUserDojang({
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
                setUserVMatrix(result[8]);
                setUserHexaMatrix(result[9]);
                setUserDojang(result[10]);
            }
        })();
    }, [nickName, location, ocid]);

    // useEffect(() => {
    //     (async function () {
    //         if (typeof userInfo?.character_level === 'number') {
    //             const result = await getUserCharacterSkill({
    //                 key: `cache$nickname$${nickName}`,
    //                 data: {
    //                     level: userInfo.character_level,
    //                     ocid: ocid,
    //                 },
    //             });

    //             setUserCharacterSkill(result);
    //         }
    //     })();
    // }, [userInfo?.character_level]);

    const isLoading =
        !userInfo ||
        !userStatInfo ||
        !userHyperStatInfo ||
        !userPropensity ||
        !userAbility ||
        !userSymbolicEquipment ||
        !userSetEffect ||
        !userVMatrix ||
        !userHexaMatrix ||
        !userDojang;

    if (isLoading) {
        return <Loading />;
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
            userVMatrix={userVMatrix}
            userHexaMatrix={userHexaMatrix}
            userDojang={userDojang}
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
    // userCharacterSkill: UserCharacterSkill;
    // userCharacterLinkSkill: UserCharacterLinkSkill;
    userVMatrix: UserVMatrix;
    userHexaMatrix: UserHexaMatrix;
    userDojang: UserDojang;
}

const CharacterPage = memo(function CharacterPage({
    userInfo,
    userStatInfo,
    userHyperStatInfo,
    userPropensity,
    userAbility,
    userSymbolicEquipment,
    userSetEffect,
    // userCharacterSkill,
    // userCharacterLinkSkill,
    userVMatrix,
    userHexaMatrix,
    userDojang,
}: CharacterPageProps) {
    return (
        <div className="flex flex-col items-center gap-6">
            <SearchBar />
            <Card width="fit" align={{ horizontal: EN_ALIGN_OPTION.CENTER }}>
                <div className="flex justify-center">
                    <CharacterImg src={userInfo?.character_image as string} />
                </div>
                <div className="flex items-baseline gap-2">
                    <div className="text-xl font-bold">{userInfo?.character_name}</div>
                    <div className="text-sm text-gray-500">{userInfo?.world_name}</div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="text-sm text-gray-500">{userInfo?.character_class}</div>
                    <div className="flex h-3/5">
                        <VerticalLine />
                    </div>
                    <div className="text-sm text-gray-500">Lv.{userInfo?.character_level}</div>
                    <div className="flex h-3/5">
                        <VerticalLine />
                    </div>
                    <div className="text-sm text-gray-500">{userInfo?.character_guild_name}</div>
                </div>
                <div className="flex h-3 w-full items-center">
                    <HorizontalLine />
                </div>
                <div className="flex justify-start">
                    <div></div>
                </div>
            </Card>
        </div>
    );
});
