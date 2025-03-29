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

export interface UserHyperStatInfo {
    hyper_stat_preset_1: HyperStatDetail[];
    hyper_stat_preset_1_remain_point: number;
    hyper_stat_preset_2: HyperStatDetail[];
    hyper_stat_preset_2_remain_point: number;
    hyper_stat_preset_3: HyperStatDetail[];
    hyper_stat_preset_3_remain_point: number;
}

export interface HyperStatDetail {
    stat_type: string;
    stat_point: number;
    stat_level: number;
    stat_increase: string;
}

export interface UserPropensity {
    charisma_level: number;
    sensibility_level: number;
    insight_level: number;
    willingness_level: number;
    handicraft_level: number;
    charm_level: number;
}
