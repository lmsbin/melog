/**
 * 유저 하이퍼스탯 정보 타입 정의
 */

export interface HyperStatDetail {
	stat_type: string;
	stat_point: number;
	stat_level: number;
	stat_increase: string;
}

export interface UserHyperStatInfo {
	hyper_stat_preset_1: HyperStatDetail[];
	hyper_stat_preset_1_remain_point: number;
	hyper_stat_preset_2: HyperStatDetail[];
	hyper_stat_preset_2_remain_point: number;
	hyper_stat_preset_3: HyperStatDetail[];
	hyper_stat_preset_3_remain_point: number;
}

