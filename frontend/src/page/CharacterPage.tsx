import { memo, useEffect, useState } from 'react';
import { MelogLocation, UserInfo } from '../type';
import { useLocation, useParams } from 'react-router-dom';
import getUserInfo from '../api/getUserInfo';
import { CharacterImg } from '../component/img/CharacterImg';
import getOcid from '../api/getOcid';
import { SearchBar } from '../component';

export const CharacterPageWrapper = memo(function CharacterPageWrapper() {
    const [userInfo, setUserInfo] = useState<UserInfo>({} as UserInfo);
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
                const result = await getUserInfo({
                    key: nickName,
                });

                setUserInfo(result);
            }
        })();
    }, [nickName, location]);

    if (!userInfo) {
        return <div>404</div>;
    }

    return <CharacterPage userInfo={userInfo} />;
});

interface CharacterPageProps {
    userInfo: UserInfo;
}
const CharacterPage = memo(function CharacterPage({ userInfo }: CharacterPageProps) {
    return (
        <>
            {JSON.stringify(userInfo)}
            <SearchBar />
            <CharacterImg src={userInfo.character_image} />
        </>
    );
});
