/**
 * 유저 어빌리티 정보 타입 정의
 */

export interface AbilityInfo {
	ability_no: string;
	ability_grade: string;
	ability_value: string;
}

export interface UserAbility {
	date: string;
	ability_grade: string;
	ability_info: AbilityInfo[];
}
