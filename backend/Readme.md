# API 문서

## 개요

API의 목적과 주요 기능에 대한 간단한 설명입니다.

- **버전**: 1.0
- **기본 URL**: `https://{{ip}}:{{port}}/`

---

## 1. 리소스

### 1.1 POST `/getOcid`

캐릭터 닉네임에 따른 고유 정보인 OCID 값을 가져옵니다.

- **Method**: POST
- **쿼리 파라미터**:
  - `nickName` (필수)

**예시 요청**:

```bash
curl -X POST "https://{{ip}}:{{port}}/getOcid" -d '{"nickName": "nickName"}'
```

**응답**:

```json
{
  "ocid": "{ocid}"
}
```

## 2. 사용자

### 2.1 GET `/getUserInfo`

새로운 리소스를 생성합니다.

- **Method**: GET

**예시 요청**:

```bash
curl -X GET "https://{{ip}}:{{port}}/getUserInfo"
```

**응답**:

```json
{
  "date": "2023-12-21T00:00+09:00",
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
  "character_date_create": "2023-12-21T00:00+09:00"
}
```

### 2.2 GET `/getUserStatInfo`

새로운 리소스를 생성합니다.

- **Method**: GET

**예시 요청**:

```bash
curl -X GET "https://{{ip}}:{{port}}/getUserStatInfo"
```

**응답**:

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

### 2.3 GET `/getUserHyperStatInfo`

새로운 리소스를 생성합니다.

- **Method**: GET

**예시 요청**:

```bash
curl -X GET "https://{{ip}}:{{port}}/getUserHyperStatInfo"
```

**응답**:

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
  "hyper_stat_preset_2": [
    {
      "stat_type": "string",
      "stat_point": 0,
      "stat_level": 0,
      "stat_increase": "string"
    }
  ],
  "hyper_stat_preset_2_remain_point": 0,
  "hyper_stat_preset_3": [
    {
      "stat_type": "string",
      "stat_point": 0,
      "stat_level": 0,
      "stat_increase": "string"
    }
  ],
  "hyper_stat_preset_3_remain_point": 0
}
```

### 2.4 GET `/getUserPropensity`

새로운 리소스를 생성합니다.

- **Method**: GET

**예시 요청**:

```bash
curl -X GET "https://{{ip}}:{{port}}/getUserPropensity"
```

**응답**:

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

### 2.5 GET `/getUserAbility`

새로운 리소스를 생성합니다.

- **Method**: GET

**예시 요청**:

```bash
curl -X GET "https://{{ip}}:{{port}}/getUserAbility"
```

**응답**:

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

### 2.6 GET `/getUserSymbolEquipment`

새로운 리소스를 생성합니다.

- **Method**: GET

**예시 요청**:

```bash
curl -X GET "https://{{ip}}:{{port}}/getUserSymbolEquipment"
```

**응답**:

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

### 2.7 GET `/getUserSetEffect`

새로운 리소스를 생성합니다.

- **Method**: GET

**예시 요청**:

```bash
curl -X GET "https://{{ip}}:{{port}}/getUserSetEffect"
```

**응답**:

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

### 2.8 POST `/getUserCharacterSkill`

새로운 리소스를 생성합니다.

- **Method**: POST
- **쿼리 파라미터**:
  - `nickName` (필수)

**예시 요청**:

```bash
curl -X POST "https://{{ip}}:{{port}}/getUserCharacterSkill" -d '{"level": level}'
```

**응답**:

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

### 2.9 GET `/getUserCharacterLinkSkill`

새로운 리소스를 생성합니다.

- **Method**: GET

**예시 요청**:

```bash
curl -X GET "https://{{ip}}:{{port}}/getUserCharacterLinkSkill"
```

**응답**:

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

### 2.10 GET `/getUserVMatrix`

새로운 리소스를 생성합니다.

- **Method**: GET

**예시 요청**:

```bash
curl -X GET "https://{{ip}}:{{port}}/getUserVMatrix"
```

**응답**:

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

### 2.11 GET `/getUserHexaMatrix`

새로운 리소스를 생성합니다.

- **Method**: GET

**예시 요청**:

```bash
curl -X GET "https://{{ip}}:{{port}}/getUserHexaMatrix"
```

**응답**:

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

### 2.12 GET `/getUserDojang`

새로운 리소스를 생성합니다.

- **Method**: GET

**예시 요청**:

```bash
curl -X GET "https://{{ip}}:{{port}}/getUserDojang"
```

**응답**:

```json
{
  "dojang_best_floor": 0,
  "date_dojang_record": "2023-12-21T00:00+09:00",
  "dojang_best_time": 0
}
```

---

## 공통 오류

- **400 Bad Request**: 잘못된 입력입니다.
- **401 Unauthorized**: 인증에 실패했습니다.
- **404 Not Found**: 리소스를 찾을 수 없습니다.
- **500 Internal Server Error**: 서버 오류가 발생했습니다.

---
