import { memo } from 'react';
import { EN_ALIGN_OPTION, UserStatInfo } from '../shared';
import { CharacterImg } from './img/CharacterImg';
import { Grid, GridLayout } from './Grid';
import { Card } from './Card';

const UserStatInfoCardWrapper = memo(function UserStatInfoCardWrapper({
    userStatInfo,
}: Partial<UserStatInfoProps>) {
    if (!userStatInfo) {
        return (
            <Card>
                <div className="flex items-center justify-center">Now Loading...</div>
            </Card>
        );
    }

    return <UserInfoCard userStatInfo={userStatInfo} />;
});

export interface UserStatInfoProps {
    userStatInfo: UserStatInfo;
}

const UserInfoCard = memo(function UserInfoCard({ userStatInfo }: UserStatInfoProps) {
    const data = userStatInfo;

    const layout = {
        rows: 20,
        cols: 8,
        cells: data.final_stat.map((x, index) => ({
            row: Math.floor(index / 8),
            col: index % 8,
            render: (index % 4) % 2 === 0 ? x.stat_name : x.stat_value,
        })),
    } as GridLayout;

    return (
        <Card align={{ horizontal: EN_ALIGN_OPTION.CENTER, vertical: EN_ALIGN_OPTION.CENTER }}>
            <Grid data={data} layout={layout} />
        </Card>
    );
});

export default UserStatInfoCardWrapper;
