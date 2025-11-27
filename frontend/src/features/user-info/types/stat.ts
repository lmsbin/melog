/**
 * 유저 스탯 정보 타입 정의
 */

export interface Stat {
	stat_name: string;
	stat_value: string;
}

export interface UserStatInfo {
	final_stat: Stat[];
}

