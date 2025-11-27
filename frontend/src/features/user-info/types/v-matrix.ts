/**
 * 유저 V매트릭스 정보 타입 정의
 */

export interface VCoreEquipment {
	slot_id: string;
	slot_level: number;
	v_core_name: string;
	v_core_type: string;
	v_core_level: number;
	v_core_skill_1: string;
	v_core_skill_2: string;
	v_core_skill_3: string;
}

export interface UserVMatrix {
	character_v_core_equipment: VCoreEquipment[];
	character_v_matrix_remain_slot_upgrade_point: number;
}

