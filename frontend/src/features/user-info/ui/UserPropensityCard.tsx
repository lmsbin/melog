import { Card, EN_ALIGN_OPTION } from '@/shared';
import { observer } from 'mobx-react-lite';
import { useUserInfo } from '@/hook';
import { PropensityChart } from './PropensityChart';

export const UserPropensityCard = observer(() => {
    const userPropensity = useUserInfo('userPropensity');

    return (
        <Card
            width="fit"
            height="fit"
            label="성향"
            align={{ horizontal: EN_ALIGN_OPTION.CENTER, vertical: EN_ALIGN_OPTION.CENTER }}
        >
            <PropensityChart propensity={userPropensity} />
        </Card>
    );
});
