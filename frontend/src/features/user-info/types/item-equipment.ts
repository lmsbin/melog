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

