import { observer } from 'mobx-react-lite';
import { Card, CharacterImg, EN_ALIGN_OPTION, VerticalDivider } from '@/shared';
import { useUserInfo } from '@/hook';

export const UserInfoCard = observer(() => {
    const userInfo = useUserInfo('userInfo');

    return (
        <Card
            width="full"
            height="fit"
            align={{ horizontal: EN_ALIGN_OPTION.CENTER }}
            label="기본정보"
        >
            <div className="flex w-full min-w-0 flex-col items-center justify-center gap-2">
                <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-lg">
                    <CharacterImg src={userInfo.character_image as string} scale={200} />
                </div>
                <div className="flex items-baseline justify-center gap-2">
                    <div className="text-xl font-semibold text-gray-900">
                        {userInfo.character_name}
                    </div>
                    <div className="text-sm font-medium text-gray-400">{userInfo.world_name}</div>
                </div>
                <div className="flex items-center justify-center gap-3">
                    <div className="text-sm text-gray-600">{userInfo.character_class}</div>
                    <div className="flex h-3/5">
                        <VerticalDivider />
                    </div>
                    <div className="text-sm font-medium text-gray-600">
                        Lv.{userInfo.character_level}
                    </div>
                    <div className="flex h-3/5">
                        <VerticalDivider />
                    </div>
                    <div className="text-sm text-gray-500">{userInfo.character_guild_name}</div>
                </div>
            </div>
        </Card>
    );
});
