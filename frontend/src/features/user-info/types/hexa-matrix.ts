/**
 * 유저 헥사 매트릭스 정보 타입 정의
 */

export interface HexaSkill {
	hexa_skill_id: string;
}

export interface HexaCoreEquipment {
	hexa_core_name: string;
	hexa_core_level: number;
	hexa_core_type: string;
	linked_skill: HexaSkill[];
}

export interface UserHexaMatrix {
	character_hexa_core_equipment: HexaCoreEquipment[];
}

