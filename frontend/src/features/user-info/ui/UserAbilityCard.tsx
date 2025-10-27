import { userStore } from '@/store';
import { observer } from 'mobx-react-lite';
import { Card } from '@/shared';

export const UserAbilityCard = observer(() => {
    const userAbility = userStore.userAbility;

    const getGradeColor = (grade: string) => {
        switch (grade) {
            case '레전드리':
                return 'bg-purple-50 text-purple-700 border-purple-200';
            case '유니크':
                return 'bg-yellow-50 text-yellow-700 border-yellow-200';
            case '에픽':
                return 'bg-blue-50 text-blue-700 border-blue-200';
            default:
                return 'bg-gray-50 text-gray-700 border-gray-200';
        }
    };

    return (
        <Card label="어빌리티" width="fit">
            <div className="flex w-full flex-col gap-2">
                {userAbility.ability_info.map((x, index) => (
                    <div key={index} className="flex flex-col gap-1">
                        <div
                            className={`rounded-lg border px-2.5 py-1 ${getGradeColor(x.ability_grade)} text-sm font-semibold`}
                        >
                            {x.ability_grade}
                        </div>
                        <div className="px-2.5 text-sm text-gray-700">{x.ability_value}</div>
                    </div>
                ))}
            </div>
        </Card>
    );
});
