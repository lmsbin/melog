import { EN_ALIGN_OPTION } from '@/shared';
import { observer } from 'mobx-react-lite';
import { Card } from './Card';
import { PropensityChart } from './chart';
import { userStore } from '@/store';

export const UserPropensityCard = observer(() => {
    const userPropensity = userStore.userPropensity;

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
