import {
    UserAbility,
    UserCharacterLinkSkill,
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
} from '@/shared';
import { makeAutoObservable } from 'mobx';

class UserStore {
    userInfo: UserInfo;
    userStatInfo: UserStatInfo;
    userHyperStatInfo: UserHyperStatInfo;
    userPropensity: UserPropensity;
    userAbility: UserAbility;
    userSymbolEquipment: UserSymbolEquipment;
    userSetEffect: UserSetEffect;
    userCharacterLinkSkill: UserCharacterLinkSkill;
    userVMatrix: UserVMatrix;
    userHexaMatrix: UserHexaMatrix;
    userDojang: UserDojang;
    userItemEquipment: UserItemEquipment;

    constructor() {
        makeAutoObservable(this);
    }

    setUserInfo(userInfo: UserInfo) {
        this.userInfo = userInfo;
    }

    setUserStatInfo(userStatInfo: UserStatInfo) {
        this.userStatInfo = userStatInfo;
    }

    setUserHyperStatInfo(userHyperStatInfo: UserHyperStatInfo) {
        this.userHyperStatInfo = userHyperStatInfo;
    }

    setUserPropensity(userPropensity: UserPropensity) {
        this.userPropensity = userPropensity;
    }

    setUserAbility(userAbility: UserAbility) {
        this.userAbility = userAbility;
    }

    setUserSymbolEquipment(userSymbolEquipment: UserSymbolEquipment) {
        this.userSymbolEquipment = userSymbolEquipment;
    }

    setUserSetEffect(userSetEffect: UserSetEffect) {
        this.userSetEffect = userSetEffect;
    }

    setUserCharacterLinkSkill(userCharacterLinkSkill: UserCharacterLinkSkill) {
        this.userCharacterLinkSkill = userCharacterLinkSkill;
    }

    setUserVMatrix(userVMatrix: UserVMatrix) {
        this.userVMatrix = userVMatrix;
    }

    setUserHexaMatrix(userHexaMatrix: UserHexaMatrix) {
        this.userHexaMatrix = userHexaMatrix;
    }

    setUserDojang(userDojang: UserDojang) {
        this.userDojang = userDojang;
    }

    setUserItemEquipment(userItemEquipment: UserItemEquipment) {
        this.userItemEquipment = userItemEquipment;
    }

    setPartial(userData: Partial<UserStore>) {
        Object.assign(this, userData);
    }
}

export const userStore = new UserStore();
