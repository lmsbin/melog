import { observer } from 'mobx-react-lite';
import {
    Card,
    CharacterImg,
    EN_ALIGN_OPTION,
    VerticalDivider,
    UserInfo,
    UserStatInfo,
    UserItemEquipment,
} from '@/shared';
import { useUserInfo } from '@/hook';
import { UserOverviewStat } from './UserOverviewStat';
import { UserOverviewEquipment } from './UserOverviewEquipment';

// 기본 정보 + 스탯 + 장비 정보를 하나의 카드 안에서 가로로 보여주는 컴포넌트
export const UserOverviewCard = observer(() => {
    const userInfo = useUserInfo('userInfo') as UserInfo | undefined;
    const userStatInfo = useUserInfo('userStatInfo') as UserStatInfo | undefined;
    const userItemEquipment = useUserInfo('userItemEquipment') as UserItemEquipment | undefined;

    const isLoading = !userInfo || !userStatInfo || !userItemEquipment;

    if (isLoading) {
        return (
            <Card
                width="full"
                height="fit"
                align={{ horizontal: EN_ALIGN_OPTION.CENTER, vertical: EN_ALIGN_OPTION.CENTER }}
                label="캐릭터 정보"
            >
                <div className="py-8 text-sm text-gray-500">캐릭터 정보를 불러오는 중입니다...</div>
            </Card>
        );
    }

    const [mainStat, ...restStats] = userStatInfo.final_stat;
    const subStats = restStats.slice(0, 5);

    const equipments = userItemEquipment.item_equipment.slice(0, 6);

    return (
        <Card
            width="full"
            height="fit"
            label="캐릭터 요약"
            align={{ horizontal: EN_ALIGN_OPTION.START, vertical: EN_ALIGN_OPTION.START }}
        >
            <div className="flex w-full min-w-0 flex-col gap-6 md:flex-row">
                {/* 좌측 - 기본 정보 영역 */}
                <div className="flex w-full flex-col items-center gap-3 border-b border-gray-100 pb-4 md:w-1/3 md:border-r md:border-b-0 md:pr-4 md:pb-0">
                    <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-lg bg-gray-50">
                        <CharacterImg src={userInfo.character_image as string} scale={200} />
                    </div>
                    <div className="flex items-baseline justify-center gap-2">
                        <div className="truncate text-xl font-semibold text-gray-900">
                            {userInfo.character_name}
                        </div>
                        <div className="text-sm font-medium text-gray-400">
                            {userInfo.world_name}
                        </div>
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-gray-600">
                        <span>{userInfo.character_class}</span>
                        <div className="flex h-3/5">
                            <VerticalDivider />
                        </div>
                        <span className="font-medium">Lv.{userInfo.character_level}</span>
                        {userInfo.character_guild_name && (
                            <>
                                <div className="flex h-3/5">
                                    <VerticalDivider />
                                </div>
                                <span className="text-gray-500">
                                    {userInfo.character_guild_name}
                                </span>
                            </>
                        )}
                    </div>
                </div>

                {/* 우측 - 스탯 / 장비 요약 */}
                <div className="flex w-full flex-1 flex-col gap-4 md:flex-row md:pl-4">
                    {/* 스탯 */}
                    <UserOverviewStat>
                        <UserOverviewStat.Header title="기본 스탯" />
                        <div className="rounded-lg bg-gray-50 px-3 py-2">
                            <UserOverviewStat.MainValue
                                name={mainStat?.stat_name}
                                value={mainStat?.stat_value}
                            />
                            <UserOverviewStat.Grid>
                                {subStats.map((stat) => (
                                    <UserOverviewStat.Item
                                        key={stat.stat_name}
                                        name={stat.stat_name}
                                        value={stat.stat_value}
                                    />
                                ))}
                            </UserOverviewStat.Grid>
                        </div>
                    </UserOverviewStat>

                    {/* 장비 */}
                    <UserOverviewEquipment>
                        <UserOverviewEquipment.Header title="장비" />
                        <UserOverviewEquipment.List>
                            {equipments.length === 0 ? (
                                <UserOverviewEquipment.Empty message="장비 정보가 없습니다." />
                            ) : (
                                <UserOverviewEquipment.Grid>
                                    {equipments.map((item) => (
                                        <UserOverviewEquipment.Item
                                            key={`${item.item_equipment_part}-${item.item_name}`}
                                            equipment={item}
                                        />
                                    ))}
                                </UserOverviewEquipment.Grid>
                            )}
                        </UserOverviewEquipment.List>
                    </UserOverviewEquipment>
                </div>
            </div>
        </Card>
    );
});
