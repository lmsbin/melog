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
    UserAbilityCard,
    UserInfoCard,
    UserPropensityCard,
    UserSymbolCard,
    VerticalLine,
} from '../component';
import { useFetch, useFetchUserInfo } from '../hook';
import { abilityMapper } from '../util';

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
                <UserInfoCard />
                <UserPropensityCard />
                <UserAbilityCard />
            </div>
            <UserSymbolCard />
            <Card label="스탯"></Card>
            <Card label="하이퍼스탯"></Card>
            <Card label="장비"></Card>
        </div>
    );
});
