import { userStore } from '@/store';

export const useUserInfo = <K extends keyof typeof userStore>(key: K): (typeof userStore)[K] => {
    const userInfo = userStore[key];

    return userInfo;
};
