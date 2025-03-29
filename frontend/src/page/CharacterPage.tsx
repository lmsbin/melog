import { memo, useEffect, useState } from 'react';
import {
    MelogLocation,
    UserAbility,
    UserHyperStatInfo,
    UserInfo,
    UserPropensity,
    UserStatInfo,
    UserSymbolicEquipment,
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
import getUserSymbolicEquipment from '../api/getUserSymbolicEquipment';

export const CharacterPageWrapper = memo(function CharacterPageWrapper() {
    const [userInfo, setUserInfo] = useState<UserInfo>({} as UserInfo);
    const [userStatInfo, setUserStatInfo] = useState<UserStatInfo>({} as UserStatInfo);
    const [userHyperStatInfo, setUserHyperStatInfo] = useState<UserHyperStatInfo>(
        {} as UserHyperStatInfo,
    );
    const [userPropensity, setUserPropensity] = useState<UserPropensity>({} as UserPropensity);
    const [userAbility, setUserAbility] = useState<UserAbility>({} as UserAbility);
    const [userSymbolicEquipment, setUserSymbolicEquipment] = useState<UserSymbolicEquipment>(
        {} as UserSymbolicEquipment,
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
                const result = await Promise.all([
                    getUserInfo({ key: nickName }),
                    getUserStatInfo({ key: nickName }),
                    getUserHyperStatInfo({ key: nickName }),
                    getUserPropensity({ key: nickName }),
                    getUserAbility({ key: nickName }),
                    getUserSymbolicEquipment({ key: nickName }),
                ]);

                setUserInfo(result[0]);
                setUserStatInfo(result[1]);
                setUserHyperStatInfo(result[2]);
                setUserPropensity(result[3]);
                setUserAbility(result[4]);
                setUserSymbolicEquipment(result[5]);
            }
        })();
    }, [nickName, location]);

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
        />
    );
});

interface CharacterPageProps {
    userInfo: UserInfo;
    userStatInfo: UserStatInfo;
    userHyperStatInfo: UserHyperStatInfo;
    userPropensity: UserPropensity;
    userAbility: UserAbility;
    userSymbolicEquipment: UserSymbolicEquipment;
}
const CharacterPage = memo(function CharacterPage({
    userInfo,
    userStatInfo,
    userHyperStatInfo,
    userPropensity,
    userAbility,
    userSymbolicEquipment,
}: CharacterPageProps) {
    return (
        <>
            <div>{JSON.stringify(userInfo)}</div>
            <div>{JSON.stringify(userStatInfo)}</div>
            <div>{JSON.stringify(userHyperStatInfo)}</div>
            <div>{JSON.stringify(userPropensity)}</div>
            <div>{JSON.stringify(userAbility)}</div>
            <div>{JSON.stringify(userSymbolicEquipment)}</div>
            <SearchBar />
            <CharacterImg src={userInfo.character_image} />
        </>
    );
});
