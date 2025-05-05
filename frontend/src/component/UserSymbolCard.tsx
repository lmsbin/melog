import { observer } from 'mobx-react-lite';
import { Card } from './Card';
import { Symbol } from './data';
import { useUserInfo } from '@/hook';

export const UserSymbolCard = observer(() => {
    const userSymbolicEquipment = useUserInfo('userSymbolEquipment');

    return (
        <Card width="full" label="심볼">
            <div className="flex w-full max-w-full flex-wrap justify-center gap-3">
                {userSymbolicEquipment.symbol.map((symbol, index) => (
                    <Symbol {...symbol} key={index} />
                ))}
            </div>
        </Card>
    );
});
