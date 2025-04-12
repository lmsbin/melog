import { memo } from 'react';
import { UserInfo } from '../type';
import { CharacterImg } from './img/CharacterImg';
import { Grid, GridLayout } from './Grid';

const CharacterCardWrapper = memo(function CharacterCardWrapper({
    userInfo,
}: Partial<CharacterCardProps>) {
    if (!userInfo) {
        return (
            <div className="flex min-h-60 w-full min-w-sm flex-col justify-center rounded-2xl bg-white p-4 shadow-md transition duration-500 hover:shadow-lg">
                <div className="flex items-center justify-center">Now Loading...</div>
            </div>
        );
    }

    return <CharacterCard userInfo={userInfo} />;
});

export interface CharacterCardProps {
    userInfo: UserInfo;
}

const CharacterCard = memo(function CharacterCard({ userInfo }: CharacterCardProps) {
    const data = userInfo;
    const {
        character_class,
        character_class_level,
        character_date_create,
        character_exp,
        character_exp_rate,
        character_gender,
        character_guild_name,
        character_image,
        character_level,
        character_name,
        world_name,
    } = userInfo;

    const layout = {
        rows: 5,
        cols: 2,
        cells: [
            {
                row: 0,
                col: 0,
                rowSpan: 4,
                dataKey: 'character_image',
                render: () => <CharacterImg src={data.character_image} />,
            },
            {
                row: 0,
                col: 1,
                dataKey: 'character_name',
            },
            {
                row: 1,
                col: 1,
                dataKey: 'world_name',
            },
            {
                row: 2,
                col: 1,
                dataKey: 'character_class',
            },
            {
                row: 3,
                col: 1,
                render: () => `LV. ${data.character_level}`,
            },
            {
                row: 4,
                col: 1,
                colSpan: 2,
                render: () => '그리드 테스트 컴포넌트',
            },
        ],
    } as GridLayout;

    // @TODO - GridCell 인터페이스 dataKey 사용않고 render로 통일

    return (
        <>
            <div className="flex min-h-60 w-full min-w-sm flex-col justify-center rounded-2xl bg-white p-4 shadow-md transition duration-500 hover:shadow-lg">
                <Grid data={data} layout={layout} />
            </div>

            <div className="flex min-h-60 w-full min-w-sm flex-col justify-center rounded-2xl bg-white p-4 shadow-md transition duration-500 hover:shadow-lg">
                <div className="flex items-center">
                    <CharacterImg src={character_image} />
                    <div className="ml-4">
                        <h2 className="text-lg font-bold">{character_name}</h2>
                        <p className="text-gray-600">{world_name}</p>
                        <p className="text-gray-600">{character_class}</p>
                        <p className="font-semibold text-gray-800">Lv. {character_level}</p>
                    </div>
                </div>
                <div className="mt-4 text-sm text-gray-500">
                    <p>EXP: {character_exp_rate}%</p>
                    <p>길드: {character_guild_name}</p>
                    <p>생성일: {character_date_create}</p>
                </div>
            </div>
        </>
    );
});

export default CharacterCardWrapper;
