import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { Card, EN_ALIGN_OPTION, UserHyperStatInfo } from '@/shared';
import { useUserInfo } from '@/hook';

// 하이퍼 스탯 프리셋 정보를 별도의 카드로 보여주는 컴포넌트
export const UserHyperStatCard = observer(() => {
    const userHyperStatInfo = useUserInfo('userHyperStatInfo') as UserHyperStatInfo | undefined;

    if (!userHyperStatInfo) {
        return (
            <Card
                width="full"
                height="fit"
                label="하이퍼 스탯"
                align={{ horizontal: EN_ALIGN_OPTION.CENTER, vertical: EN_ALIGN_OPTION.CENTER }}
            >
                <div className="py-6 text-sm text-gray-500">
                    하이퍼 스탯 정보를 불러오는 중입니다...
                </div>
            </Card>
        );
    }

    const hyperPresets = [
        {
            id: 1,
            label: '프리셋 1',
            list: userHyperStatInfo.hyper_stat_preset_1 ?? [],
            remain: userHyperStatInfo.hyper_stat_preset_1_remain_point,
        },
        {
            id: 2,
            label: '프리셋 2',
            list: userHyperStatInfo.hyper_stat_preset_2 ?? [],
            remain: userHyperStatInfo.hyper_stat_preset_2_remain_point,
        },
        {
            id: 3,
            label: '프리셋 3',
            list: userHyperStatInfo.hyper_stat_preset_3 ?? [],
            remain: userHyperStatInfo.hyper_stat_preset_3_remain_point,
        },
    ];

    const defaultPresetIndex =
        hyperPresets.findIndex((preset) => preset.list.length > 0) !== -1
            ? hyperPresets.findIndex((preset) => preset.list.length > 0)
            : 0;

    const [activePresetIndex, setActivePresetIndex] = useState<number>(defaultPresetIndex);

    const activePreset = hyperPresets[activePresetIndex] ?? hyperPresets[0];
    const displayHyper = activePreset.list.slice(0, 8);

    return (
        <Card
            width="full"
            height="fit"
            label="하이퍼 스탯"
            align={{ horizontal: EN_ALIGN_OPTION.START, vertical: EN_ALIGN_OPTION.START }}
        >
            <div className="flex w-full flex-col gap-3">
                {/* 프리셋 정보 헤더 + 버튼 */}
                <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between text-xs font-semibold tracking-wide text-gray-400">
                        <span>하이퍼 스탯 ({activePreset.label})</span>
                        <span className="text-[10px] font-normal text-gray-400">
                            남은 포인트 {activePreset.remain}
                        </span>
                    </div>
                    <div className="flex gap-2 text-[11px]">
                        {hyperPresets.map((preset, index) => (
                            <button
                                key={preset.id}
                                type="button"
                                className={`rounded-full border px-2 py-0.5 transition ${
                                    index === activePresetIndex
                                        ? 'border-indigo-500 bg-indigo-50 text-indigo-600'
                                        : 'border-gray-200 bg-white text-gray-500 hover:border-indigo-200 hover:text-indigo-500'
                                }`}
                                onClick={() => setActivePresetIndex(index)}
                            >
                                {preset.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* 하이퍼 스탯 리스트 */}
                <div className="rounded-lg bg-gray-50 px-3 py-2">
                    {displayHyper.length === 0 ? (
                        <div className="text-xs text-gray-500">설정된 하이퍼 스탯이 없습니다.</div>
                    ) : (
                        <div className="flex flex-col gap-1 text-xs">
                            {displayHyper.map((stat) => (
                                <div
                                    key={stat.stat_type}
                                    className="flex items-center justify-between gap-2"
                                >
                                    <span className="truncate text-gray-700">{stat.stat_type}</span>
                                    <span className="text-gray-500">
                                        Lv.{stat.stat_level} / {stat.stat_increase}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </Card>
    );
});
