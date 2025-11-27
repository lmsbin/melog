/**
 * 유저 세트 효과 정보 타입 정의
 */

export interface SetEffectFullInfo {
	set_count: number;
	set_option: string;
}

export interface SetEffect {
	set_name: string;
	total_set_count: number;
	set_effect_full_info: SetEffectFullInfo[];
}

export interface UserSetEffect {
	set_effect: SetEffect[];
}

