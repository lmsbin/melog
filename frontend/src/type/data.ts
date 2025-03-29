export interface SearchData {
    inputData: string;
}

export interface RecentHistory {}

export interface UserInfo {
    date: Date;
    character_name: string;
    world_name: string;
    character_gender: string;
    character_class: string;
    character_class_level: string;
    character_exp: number;
    character_exp_rate: string;
    character_guild_name: string;
    character_image: string;
    character_date_create: Date;
}

export interface UserStatInfo {
    final_stat: { stat_name: string; stat_value: string }[];
}
