/**
 * 유저 V매트릭스 정보 타입 정의
 */

export interface VCoreEquipment {
	slot_id: string;
	v_core_name: string;
	v_core_type: string;
	v_core_level: number;
}

export interface UserVMatrix {
	character_v_core_equipment: VCoreEquipment[];
	character_v_matrix_remain_slot_upgrade_point: number;
}
