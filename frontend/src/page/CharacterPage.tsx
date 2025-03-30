import { memo, useEffect, useState } from 'react';
import {
    MelogLocation,
    UserAbility,
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

export const CharacterPageWrapper = memo(function CharacterPageWrapper() {
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

    const location: MelogLocation = useLocation();
    const { nickName } = useParams();

    useEffect(() => {}, [location]);

    useEffect(() => {
        (async function () {
            const isFromSearchPage = location?.state?.fromSearchPage;

            if (!isFromSearchPage) {
                await getOcid({
                    key: nickName,
                    data: {
                        nickName: nickName as string,
                    },
                });
            }

            if (nickName) {
                const result: any = await Promise.all([
                    getUserInfo({ key: nickName }),
                    getUserStatInfo({ key: nickName }),
                    getUserHyperStatInfo({ key: nickName }),
                    getUserPropensity({ key: nickName }),
                    getUserAbility({ key: nickName }),
                    getUserSymbolEquipment({ key: nickName }),
                    getUserSetEffect({ key: nickName }),
                    // getUserCharacterSkill({
                    //     key: nickName,
                    //     data: {
                    //         nickName: nickName,
                    //     },
                    // }),
                ]);

                setUserInfo(result[0]);
                setUserStatInfo(result[1]);
                setUserHyperStatInfo(result[2]);
                setUserPropensity(result[3]);
                setUserAbility(result[4]);
                setUserSymbolEquipment(result[5]);
                setUserSetEffect(result[6]);
                // setUserCharacterSkill(result[7]);
            }
        })();
    }, [nickName, location]);

    useEffect(() => {
        (async function () {
            const result = await getUserCharacterSkill({
                key: nickName,
                data: {
                    level: userInfo.character_level,
                },
            });

            setUserCharacterSkill(result);
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
            <SearchBar />
            <CharacterImg src={userInfo.character_image} />
        </>
    );
});
