import { userStore } from '@/store';
import { observer } from 'mobx-react-lite';
import { Card } from '@/shared';

export const UserAbilityCard = observer(() => {
    const userAbility = userStore.userAbility;

    return (
        <Card label="어빌리티">
            <div className="flex flex-col">
                <div>{userAbility.ability_grade}</div>
                {userAbility.ability_info.map((x) => {
                    return (
                        <ul>
                            <div className={`bg-amber-50`}>{x.ability_grade}</div>
                            <div>{x.ability_value}</div>
                        </ul>
                    );
                })}
            </div>
        </Card>
    );
});
