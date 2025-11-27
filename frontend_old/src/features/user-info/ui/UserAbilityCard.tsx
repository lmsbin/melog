import { userStore } from '@/store';
import { observer } from 'mobx-react-lite';
import { Card, badgeVariants, cn } from '@/shared';

export const UserAbilityCard = observer(() => {
    const userAbility = userStore.userAbility;

    const getAbilityVariant = (grade: string): keyof typeof badgeVariants.ability => {
        switch (grade) {
            case '레전드리':
                return 'legendary';
            case '유니크':
                return 'unique';
            case '에픽':
                return 'epic';
            default:
                return 'rare';
        }
    };

    return (
        <Card label="어빌리티" width="full">
            <div className="flex w-full min-w-0 flex-col gap-2">
                {userAbility.ability_info.map((x, index) => {
                    const variant = getAbilityVariant(x.ability_grade);
                    return (
                        <div key={index} className="flex flex-col gap-1">
                            <div className={cn(badgeVariants.base, badgeVariants.ability[variant])}>
                                {x.ability_grade}
                            </div>
                            <div className="px-2.5 text-sm text-gray-700">{x.ability_value}</div>
                        </div>
                    );
                })}
            </div>
        </Card>
    );
});
