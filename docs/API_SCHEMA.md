# API Schema 문서

## 개요

백엔드 API의 요청/응답 스펙을 정의합니다.
이 문서를 기준으로 클라이언트 API를 구현합니다.

-   **기본 URL**: `http://localhost:3000`
-   **공통 헤더**: 모든 API 요청에 `uuid` 헤더 필요
-   **Content-Type**: `application/json`
-   **HTTP 메서드**: 모든 API는 **POST** 메서드를 사용합니다

---

## 중요 사항

### 필드명 규칙

백엔드의 Rust struct는 `#[serde(rename_all = "camelCase")]`를 사용하는 경우가 많습니다.
하지만 실제 필드명은 코드를 확인해야 합니다:

-   `/getOcid`: `Character` struct는 `nick_name` 필드를 가지고 있지만, `#[serde(rename_all = "camelCase")]`가 있으므로 JSON에서는 `nickName`으로 전송해야 합니다.
-   대부분의 다른 API: `UserOcid` struct를 받으며, `{ "ocid": "string" }` 형태입니다.

### 요청 Body 패턴

1. **OCID 조회**: `{ "nickName": "string" }`
2. **유저 정보 조회 (대부분)**: `{ "ocid": "string" }`
3. **스킬 조회**: `{ "user_ocid": { "ocid": "string" }, "level": 0 }` (실제 구조 확인 필요)

---

## 1. 캐릭터 관련 API

### 1.1 POST `/getOcid`

캐릭터 닉네임으로 OCID를 조회합니다.

**요청 헤더:**

```
Content-Type: application/json
uuid: {uuid_value}
```

**요청 Body:**

```json
{
	"nickName": "string"
}
```

**참고**: 백엔드의 `Character` struct는 `#[serde(rename_all = "camelCase")]`를 사용하므로 `nickName`으로 전송합니다.

**응답:**

```json
{
	"ocid": "string"
}
```

**에러 응답:**

-   `400 Bad Request`: 잘못된 요청
-   `404 Not Found`: 캐릭터를 찾을 수 없음

---

### 1.2 POST `/getUserInfo`

유저 기본 정보를 조회합니다.

**요청 헤더:**

```
Content-Type: application/json
uuid: {uuid_value}
```

**요청 Body:**

```json
{
	"ocid": "string"
}
```

**응답:**

```json
{
	"character_name": "string",
	"world_name": "string",
	"character_gender": "string",
	"character_class": "string",
	"character_class_level": "string",
	"character_level": 0,
	"character_exp": 0,
	"character_exp_rate": "string",
	"character_guild_name": "string",
	"character_image": "string",
	"character_date_create": "string"
}
```

---

### 1.3 POST `/getUserStatInfo`

유저 스탯 정보를 조회합니다.

**요청 헤더:**

```
Content-Type: application/json
uuid: {uuid_value}
```

**요청 Body:**

```json
{
	"ocid": "string"
}
```

**응답:**

```json
{
	"final_stat": [
		{
			"stat_name": "최소 스탯 공격력",
			"stat_value": "43.75"
		}
	]
}
```

---

### 1.4 POST `/getUserHyperStatInfo`

유저 하이퍼스탯 정보를 조회합니다.

**요청 헤더:**

```
Content-Type: application/json
uuid: {uuid_value}
```

**요청 Body:**

```json
{
	"ocid": "string"
}
```

**응답:**

```json
{
  "hyper_stat_preset_1": [
    {
      "stat_type": "string",
      "stat_point": 0,
      "stat_level": 0,
      "stat_increase": "string"
    }
  ],
  "hyper_stat_preset_1_remain_point": 0,
  "hyper_stat_preset_2": [...],
  "hyper_stat_preset_2_remain_point": 0,
  "hyper_stat_preset_3": [...],
  "hyper_stat_preset_3_remain_point": 0
}
```

---

### 1.5 POST `/getUserPropensity`

유저 성향 정보를 조회합니다.

**요청 헤더:**

```
Content-Type: application/json
uuid: {uuid_value}
```

**요청 Body:**

```json
{
	"ocid": "string"
}
```

**응답:**

```json
{
	"charisma_level": 0,
	"sensibility_level": 0,
	"insight_level": 0,
	"willingness_level": 0,
	"handicraft_level": 0,
	"charm_level": 0
}
```

---

### 1.6 POST `/getUserAbility`

유저 어빌리티 정보를 조회합니다.

**요청 헤더:**

```
Content-Type: application/json
uuid: {uuid_value}
```

**요청 Body:**

```json
{
	"ocid": "string"
}
```

**응답:**

```json
{
	"date": "2023-12-21T00:00+09:00",
	"ability_grade": "string",
	"ability_info": [
		{
			"ability_no": "string",
			"ability_grade": "string",
			"ability_value": "string"
		}
	]
}
```

---

### 1.7 POST `/getUserSymbolEquipment`

유저 심볼 장비 정보를 조회합니다.

**요청 헤더:**

```
Content-Type: application/json
uuid: {uuid_value}
```

**요청 Body:**

```json
{
	"ocid": "string"
}
```

**응답:**

```json
{
	"symbol": [
		{
			"symbol_name": "string",
			"symbol_icon": "string",
			"symbol_description": "string",
			"symbol_force": "string",
			"symbol_level": 0,
			"symbol_str": "string",
			"symbol_dex": "string",
			"symbol_int": "string",
			"symbol_luk": "string",
			"symbol_hp": "string",
			"symbol_drop_rate": "string",
			"symbol_meso_rate": "string",
			"symbol_exp_rate": "string",
			"symbol_growth_count": 0,
			"symbol_require_growth_count": 0
		}
	]
}
```

---

### 1.8 POST `/getUserSetEffect`

유저 세트 효과 정보를 조회합니다.

**요청 헤더:**

```
Content-Type: application/json
uuid: {uuid_value}
```

**요청 Body:**

```json
{
	"ocid": "string"
}
```

**응답:**

```json
{
	"set_effect": [
		{
			"set_name": "string",
			"total_set_count": 0,
			"set_effect_full_info": [
				{
					"set_count": 0,
					"set_option": "string"
				}
			]
		}
	]
}
```

---

### 1.9 POST `/getUserCharacterSkill`

유저 캐릭터 스킬 정보를 조회합니다.

**요청 헤더:**

```
Content-Type: application/json
uuid: {uuid_value}
```

**요청 Body:**

```json
{
	"user_ocid": {
		"ocid": "string"
	},
	"level": 0
}
```

**참고**: 백엔드의 `CharacterSkilLevel` struct 구조를 확인해야 합니다. 실제 JSON 형태는 테스트 필요.

**응답:**

```json
{
	"character_skill": [
		{
			"skill_name": "string",
			"skill_description": "string",
			"skill_level": 0,
			"skill_effect": "string",
			"skill_effect_next": "string",
			"skill_icon": "string"
		}
	]
}
```

---

### 1.10 POST `/getUserCharacterLinkSkill`

유저 캐릭터 링크 스킬 정보를 조회합니다.

**요청 헤더:**

```
Content-Type: application/json
uuid: {uuid_value}
```

**요청 Body:**

```json
{
	"ocid": "string"
}
```

**응답:**

```json
{
	"character_link_skill": [
		{
			"skill_name": "string",
			"skill_description": "string",
			"skill_level": 0,
			"skill_effect": "string",
			"skill_effect_next": "string",
			"skill_icon": "string"
		}
	]
}
```

---

### 1.11 POST `/getUserVMatrix`

유저 V매트릭스 정보를 조회합니다.

**요청 헤더:**

```
Content-Type: application/json
uuid: {uuid_value}
```

**요청 Body:**

```json
{
	"ocid": "string"
}
```

**응답:**

```json
{
	"character_v_core_equipment": [
		{
			"slot_id": "string",
			"slot_level": 0,
			"v_core_name": "string",
			"v_core_type": "string",
			"v_core_level": 0,
			"v_core_skill_1": "string",
			"v_core_skill_2": "string",
			"v_core_skill_3": "string"
		}
	],
	"character_v_matrix_remain_slot_upgrade_point": 0
}
```

---

### 1.12 POST `/getUserHexaMatrix`

유저 헥사 매트릭스 정보를 조회합니다.

**요청 헤더:**

```
Content-Type: application/json
uuid: {uuid_value}
```

**요청 Body:**

```json
{
	"ocid": "string"
}
```

**응답:**

```json
{
	"character_hexa_core_equipment": [
		{
			"hexa_core_name": "string",
			"hexa_core_level": 0,
			"hexa_core_type": "string",
			"linked_skill": [
				{
					"hexa_skill_id": "string"
				}
			]
		}
	]
}
```

---

### 1.13 POST `/getUserDojang`

유저 무릉도장 정보를 조회합니다.

**요청 헤더:**

```
Content-Type: application/json
uuid: {uuid_value}
```

**요청 Body:**

```json
{
	"ocid": "string"
}
```

**응답:**

```json
{
	"dojang_best_floor": 0,
	"date_dojang_record": "2023-12-21T00:00+09:00",
	"dojang_best_time": 0
}
```

---

### 1.14 POST `/getUserItemEquipment`

유저 장비 아이템 정보를 조회합니다.

**요청 헤더:**

```
Content-Type: application/json
uuid: {uuid_value}
```

**요청 Body:**

```json
{
	"ocid": "string"
}
```

**응답:**

```json
{
  "item_equipment": [
    {
      "item_equipment_part": "string",
      "item_equipment_slot": "string",
      "item_name": "string",
      "item_icon": "string",
      "item_shape_name": "string",
      "item_shape_icon": "string",
      "item_total_option": { ... },
      "item_base_option": { ... },
      "potential_option_grade": "string",
      "additional_potential_option_grade": "string",
      "potential_option_1": "string",
      "potential_option_2": "string",
      "potential_option_3": "string",
      "additional_potential_option_1": "string",
      "additional_potential_option_2": "string",
      "additional_potential_option_3": "string",
      "item_exceptional_option": { ... },
      "item_add_option": { ... },
      "scroll_upgrade": "string",
      "cuttable_count": "string",
      "golden_hammer_flag": "string",
      "scroll_resilience_count": "string",
      "scroll_upgradeable_count": "string",
      "soul_name": "string",
      "soul_option": "string",
      "item_etc_option": { ... },
      "starforce": "string",
      "item_starforce_option": { ... },
      "special_ring_level": 0
    }
  ]
}
```

---

### 1.15 POST `/getUserAndroidEquipment`

유저 안드로이드 장비 정보를 조회합니다.

**요청 헤더:**

```
Content-Type: application/json
uuid: {uuid_value}
```

**요청 Body:**

```json
{
	"ocid": "string"
}
```

**응답:**

```json
{
	// 안드로이드 장비 정보 (구조 확인 필요)
}
```

---

### 1.16 POST `/getUserCashItemEquipment`

유저 캐시 아이템 장비 정보를 조회합니다.

**요청 헤더:**

```
Content-Type: application/json
uuid: {uuid_value}
```

**요청 Body:**

```json
{
	"ocid": "string"
}
```

**응답:**

```json
{
	// 캐시 아이템 장비 정보 (구조 확인 필요)
}
```

---

### 1.17 POST `/getUserHexStatInfo`

유저 헥사 스탯 정보를 조회합니다.

**요청 헤더:**

```
Content-Type: application/json
uuid: {uuid_value}
```

**요청 Body:**

```json
{
	"ocid": "string"
}
```

**응답:**

```json
{
	// 헥사 스탯 정보 (구조 확인 필요)
}
```

---

## 공통 사항

### HTTP 메서드

**모든 API는 POST 메서드를 사용합니다.**

### 에러 응답

모든 API는 다음 에러 코드를 반환할 수 있습니다:

-   **400 Bad Request**: 잘못된 요청
-   **401 Unauthorized**: 인증 실패
-   **404 Not Found**: 리소스를 찾을 수 없음
-   **500 Internal Server Error**: 서버 오류

### UUID 헤더

모든 API 요청에는 `uuid` 헤더가 필요합니다.
현재 테스트용 UUID: `abcdefghijklmn`

### Content-Type

모든 POST 요청에는 `Content-Type: application/json` 헤더가 필요합니다.

### 요청 Body 패턴

1. **OCID 조회** (`/getOcid`): `{ "nickName": "string" }`
2. **유저 정보 조회 (대부분)**: `{ "ocid": "string" }`
3. **스킬 조회** (`/getUserCharacterSkill`): 구조 확인 필요

---

## 참고사항

이 문서는 백엔드 코드를 기반으로 작성되었습니다.
실제 구현 시 백엔드 코드(`backend/src/api/`)를 참고하여 정확한 요청/응답 구조를 확인하세요.

특히 다음 사항은 실제 테스트를 통해 확인이 필요합니다:

-   `/getUserCharacterSkill`의 요청 body 구조
-   일부 API의 상세 응답 구조
