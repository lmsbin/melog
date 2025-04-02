export interface SearchData {
    inputData: string;
}

export interface RecentHistory {}

export interface UserInfo {
    character_name: string;
    world_name: string;
    character_level: number;
    character_gender: string;
    character_class: string;
    character_class_level: string;
    character_exp: number;
    character_exp_rate: string;
    character_guild_name: string;
    character_image: string;
    character_date_create: string;
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

export interface UserAbility {
    date: Date;
    ability_grade: string;
    ability_info: {
        ability_no: string;
        ability_grade: string;
        ability_value: string;
    }[];
}

export interface UserSymbolEquipment {
    symbol: Symbol[];
}

export interface Symbol {
    symbol_name: string;
    symbol_icon: string;
    symbol_description: string;
    symbol_force: string;
    symbol_level: number;
    symbol_str: string;
    symbol_dex: string;
    symbol_int: string;
    symbol_luk: string;
    symbol_hp: string;
    symbol_drop_rate: string;
    symbol_meso_rate: string;
    symbol_exp_rate: string;
    symbol_growth_count: number;
    symbol_require_growth_count: number;
}

export interface UserSetEffect {
    set_effect: {
        set_name: string;
        total_set_count: number;
        set_effect_full_info: {
            set_count: number;
            set_option: string;
        }[];
    }[];
}

export interface UserCharacterSkill {
    character_skill: {
        skill_name: string;
        skill_description: string;
        skill_level: number;
        skill_effect: string;
        skill_effect_next: string;
        skill_icon: string;
    };
}

export interface UserCharacterLinkSkill {
    character_link_skill: {
        skill_name: string;
        skill_description: string;
        skill_level: number;
        skill_effect: string;
        skill_effect_next: string;
        skill_icon: string;
    };
}
