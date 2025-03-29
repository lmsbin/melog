import { memo, useEffect, useState } from 'react';
import { UserInfo } from '../type';
import { useParams } from 'react-router-dom';
import getUserInfo from '../api/getUserInfo';
import { CharacterImg } from '../component/img/CharacterImg';

export const CharacterPageWrapper = memo(function CharacterPageWrapper() {
    const [userInfo, setUserInfo] = useState<UserInfo>({} as UserInfo);
    const { nickName } = useParams();

    useEffect(() => {
        (async function () {
            if (nickName) {
                const result = await getUserInfo({
                    key: nickName,
                    data: {},
                });

                setUserInfo(result);
            }
        })();
    }, [nickName]);

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
            <CharacterImg src={userInfo.character_image} />
        </>
    );
});
