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
    UserItemEquipment,
    UserPropensity,
    UserSetEffect,
    UserStatInfo,
    UserSymbolEquipment,
    UserVMatrix,
} from '../shared';
import { useLocation, useParams } from 'react-router-dom';
import getUserInfo from '../api/getUserInfo';
import { CharacterImg } from '../component/img/CharacterImg';
import getOcid from '../api/getOcid';
import {
    Card,
    HorizontalLine,
    Loading,
    PropensityChart,
    SearchBar,
    Symbol,
    VerticalLine,
} from '../component';
import { useFetch, useFetchUserInfo } from '../hook';

export const CharacterPageWrapper = memo(function CharacterPageWrapper() {
    // const location: MelogLocation = useLocation();
    const { nickName } = useParams();

    const {
        loading: ocidLoading,
        error: ocidError,
        result: getOcidResult,
    } = useFetch<Parameters<typeof getOcid>[0], Awaited<ReturnType<typeof getOcid>>>(getOcid, {
        key: `cache$nickname$${nickName}`,
        data: {
            nickName: nickName,
        },
    });

    const {
        fetchResult,
        error: userInfoError,
        loading: userInfoLoading,
    } = useFetchUserInfo(getOcidResult?.ocid, nickName);

    if (ocidLoading || userInfoLoading) {
        return <Loading />;
    }

    if (ocidError || userInfoError) {
        return <div>{ocidError?.message + ' ' + userInfoError?.message}</div>;
    }

    return (
        <CharacterPage
            userInfo={fetchResult.userInfo}
            userStatInfo={fetchResult.userStatInfo}
            userHyperStatInfo={fetchResult.userHyperStatInfo}
            userPropensity={fetchResult.userPropensity}
            userAbility={fetchResult.userAbility}
            userSymbolicEquipment={fetchResult.userSymbolEquipment}
            userSetEffect={fetchResult.userSetEffect}
            userVMatrix={fetchResult.userVMatrix}
            userHexaMatrix={fetchResult.userHexaMatrix}
            userDojang={fetchResult.userDojang}
            userItemEquipment={fetchResult.userItemEquipment}
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
    userItemEquipment: UserItemEquipment;
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
    userItemEquipment,
}: CharacterPageProps) {
    return (
        <div className="flex w-full flex-col items-center gap-6">
            <SearchBar />
            {/* 캐릭터 */}
            <div className="flex w-full gap-6">
                <Card
                    width="fit"
                    height="fit"
                    align={{ horizontal: EN_ALIGN_OPTION.CENTER }}
                    label="기본정보"
                >
                    <div className="w-full flex-col items-center justify-center">
                        <div className="flex justify-center">
                            <CharacterImg src={userInfo?.character_image as string} />
                        </div>
                        <div className="flex items-baseline justify-center gap-2">
                            <div className="text-xl font-bold">{userInfo?.character_name}</div>
                            <div className="text-sm text-gray-500">{userInfo?.world_name}</div>
                        </div>
                        <div className="flex items-center justify-center gap-3">
                            <div className="text-sm text-gray-500">{userInfo?.character_class}</div>
                            <div className="flex h-3/5">
                                <VerticalLine />
                            </div>
                            <div className="text-sm text-gray-500">
                                Lv.{userInfo?.character_level}
                            </div>
                            <div className="flex h-3/5">
                                <VerticalLine />
                            </div>
                            <div className="text-sm text-gray-500">
                                {userInfo?.character_guild_name}
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Propensity */}
                <Card
                    width="fit"
                    height="fit"
                    label="성향"
                    align={{ horizontal: EN_ALIGN_OPTION.CENTER, vertical: EN_ALIGN_OPTION.CENTER }}
                >
                    <PropensityChart propensity={userPropensity} />
                </Card>
            </div>

            {/* 심볼 */}
            <Card width="full" label="심볼">
                <div className="flex w-full max-w-full flex-wrap justify-center gap-3">
                    {userSymbolicEquipment.symbol.map((symbol, index) => (
                        <Symbol {...symbol} key={index} />
                    ))}
                </div>
            </Card>
        </div>
    );
});
