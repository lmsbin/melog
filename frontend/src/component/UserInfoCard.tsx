import { userStore } from '../store';
import { observer } from 'mobx-react-lite';
import { VerticalLine } from './line';
import { CharacterImg } from './img/CharacterImg';
import { EN_ALIGN_OPTION } from '../shared';
import { Card } from './Card';
import { useUserInfo } from '@/hook';

export const UserInfoCard = observer(() => {
    const userInfo = useUserInfo('userInfo');

    return (
        <Card
            width="fit"
            height="fit"
            align={{ horizontal: EN_ALIGN_OPTION.CENTER }}
            label="기본정보"
        >
            <div className="w-full flex-col items-center justify-center">
                <div className="flex justify-center">
                    <CharacterImg src={userInfo.character_image as string} />
                </div>
                <div className="flex items-baseline justify-center gap-2">
                    <div className="text-xl font-bold">{userInfo.character_name}</div>
                    <div className="text-sm text-gray-500">{userInfo.world_name}</div>
                </div>
                <div className="flex items-center justify-center gap-3">
                    <div className="text-sm text-gray-500">{userInfo.character_class}</div>
                    <div className="flex h-3/5">
                        <VerticalLine />
                    </div>
                    <div className="text-sm text-gray-500">Lv.{userInfo.character_level}</div>
                    <div className="flex h-3/5">
                        <VerticalLine />
                    </div>
                    <div className="text-sm text-gray-500">{userInfo.character_guild_name}</div>
                </div>
            </div>
        </Card>
    );
});
