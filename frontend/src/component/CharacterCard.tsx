import { memo } from 'react';
import { UserInfo } from '../type';
import { CharacterImg } from './img/CharacterImg';


const CharacterCardWrapper = memo(function CharacterCardWrapper({ userInfo }: Partial<CharacterCardProps>) {
    if (!userInfo) {
        return <div className="flex min-h-60 w-full min-w-sm flex-col justify-center rounded-2xl bg-white p-4 shadow-md transition duration-500 hover:shadow-lg">Now Loading...</div>
    }

    return <CharacterCard userInfo={userInfo} />
})


export interface CharacterCardProps {
    userInfo: UserInfo;
}

const CharacterCard = memo(function CharacterCard({ userInfo }: CharacterCardProps) {
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

    return (
        <div className="flex min-h-60 w-full min-w-sm flex-col justify-center rounded-2xl bg-white p-4 shadow-md transition duration-500 hover:shadow-lg">
            {userInfo && (
                <>
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
                </>
            )}
        </div>
    );
});

export default CharacterCardWrapper;