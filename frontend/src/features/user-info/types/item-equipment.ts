/**
 * 유저 장비 아이템 정보 타입 정의
 */

export interface ItemOption {
	str?: string;
	dex?: string;
	int?: string;
	luk?: string;
	max_hp?: string;
	max_mp?: string;
	attack_power?: string;
	magic_power?: string;
	armor?: string;
	speed?: string;
	jump?: string;
	boss_damage?: string;
	ignore_monster_armor?: string;
	all_stat?: string;
	damage?: string;
	equipment_level_decrease?: number;
	max_hp_rate?: string;
	max_mp_rate?: string;
	base_equipment_level?: number;
	exceptional_upgrade?: number;
}

export interface ItemEquipment {
	item_equipment_part: string;
	item_equipment_slot: string;
	item_name: string;
	item_icon: string;
	item_shape_name: string;
	item_shape_icon: string;
	item_total_option: ItemOption;
	item_base_option: ItemOption;
	potential_option_grade?: string;
	additional_potential_option_grade?: string;
	potential_option_1?: string;
	potential_option_2?: string;
	potential_option_3?: string;
	additional_potential_option_1?: string;
	additional_potential_option_2?: string;
	additional_potential_option_3?: string;
	item_exceptional_option?: ItemOption;
	item_add_option?: ItemOption;
	scroll_upgrade?: string;
	cuttable_count?: string;
	golden_hammer_flag?: string;
	scroll_resilience_count?: string;
	scroll_upgradeable_count?: string;
	soul_name?: string;
	soul_option?: string;
	item_etc_option?: ItemOption;
	starforce?: string;
	item_starforce_option?: ItemOption;
	special_ring_level?: number;
}

export interface UserItemEquipment {
	item_equipment: ItemEquipment[];
}

/**
 * 장비 툴팁 표시용 ViewModel
 * - 원본 ItemEquipment(서버 응답)을 기반으로 "표시 문자열"만 미리 만들어둔 형태
 * - 툴팁 컴포넌트는 이 데이터를 그대로 출력만 합니다.
 */
export type ItemEquipmentTooltipOptionLine = {
	label: string;
	/** 합산 결과(+, - 포함 X: 예 "250", "6%") */
	totalText: string;
	/** 분해 결과(예 "(100 +44 +36 +70)") */
	breakdownText: string | null;
};

export type ItemEquipmentTooltipViewModel = {
	itemName: string;
	itemIcon: string | null;
	itemEquipmentPart: string;
	starforce: string | null;
	potentialOptionGrade: string | null;
	additionalPotentialOptionGrade: string | null;
	optionLines: ItemEquipmentTooltipOptionLine[];
	potentialLines: string[];
	additionalPotentialLines: string[];
	soulName: string | null;
	soulOption: string | null;
};
