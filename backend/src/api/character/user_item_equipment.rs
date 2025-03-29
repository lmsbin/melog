use crate::api::character::request::{API, request_parser};

use axum::{
    Extension,
    http::{HeaderMap, StatusCode},
    response::Json,
};
use serde::{Deserialize, Serialize};
use serde_with::{DefaultOnNull, serde_as};
use std::sync::Arc;

#[derive(Deserialize, Serialize, Debug)]
pub struct ItemEquipmentInfoOption {
    pub str: String,
    pub dex: String,
    pub int: String,
    pub luk: String,
    pub max_hp: String,
    pub max_mp: String,
    pub attack_power: String,
    pub magic_power: String,
    pub armor: String,
    pub speed: String,
    pub jump: String,
    pub boss_damage: String,
    pub ignore_monster_armor: String,
    pub all_stat: String,
    #[serde(default)]
    pub damage: String,
    #[serde(default)]
    pub equipment_level_decrease: i8,
    pub max_hp_rate: String,
    pub max_mp_rate: String,
    #[serde(default)]
    pub base_equipment_level: i16,
}

#[serde_as]
#[derive(Deserialize, Serialize, Debug)]
pub struct ItemEquipmentInfoExceptionalOption {
    pub str: String,
    pub dex: String,
    pub int: String,
    pub luk: String,
    pub max_hp: String,
    pub max_mp: String,
    pub attack_power: String,
    pub magic_power: String,
    #[serde(default)]
    #[serde_as(deserialize_as = "DefaultOnNull")]
    pub exceptional_upgrade: i16,
    #[serde(default)]
    pub armor: String,
    #[serde(default)]
    pub speed: String,
    #[serde(default)]
    pub jump: String,
    #[serde(default)]
    pub damage: String,
    #[serde(default)]
    pub all_stat: String,
    #[serde(default)]
    pub equipment_level_decrease: i16,
}

#[derive(Deserialize, Serialize, Debug)]
pub struct ItemEquipmentStatOption {
    pub str: String,
    pub dex: String,
    pub int: String,
    pub luk: String,
    pub max_hp: String,
    pub max_mp: String,
    pub attack_power: String,
    pub magic_power: String,
    pub armor: String,
    pub speed: String,
    pub jump: String,
}

#[serde_as]
#[derive(Deserialize, Serialize, Debug)]
pub struct ItemEquipmentInfo {
    pub item_equipment_part: String,
    pub item_equipment_slot: String,
    pub item_name: String,
    pub item_icon: String,
    pub item_shape_name: String,
    pub item_shape_icon: String,
    pub item_total_option: ItemEquipmentInfoOption,
    pub item_base_option: ItemEquipmentInfoOption,
    #[serde_as(deserialize_as = "DefaultOnNull")]
    pub potential_option_grade: String, // null 가능
    #[serde_as(deserialize_as = "DefaultOnNull")]
    pub additional_potential_option_grade: String, // null 가능
    #[serde_as(deserialize_as = "DefaultOnNull")]
    pub potential_option_1: String, // null 가능
    #[serde_as(deserialize_as = "DefaultOnNull")]
    pub potential_option_2: String, // null 가능
    #[serde_as(deserialize_as = "DefaultOnNull")]
    pub potential_option_3: String, // null 가능
    #[serde_as(deserialize_as = "DefaultOnNull")]
    pub additional_potential_option_1: String, // null 가능
    #[serde_as(deserialize_as = "DefaultOnNull")]
    pub additional_potential_option_2: String, // null 가능
    #[serde_as(deserialize_as = "DefaultOnNull")]
    pub additional_potential_option_3: String, // null 가능
    pub item_exceptional_option: ItemEquipmentInfoExceptionalOption,
    pub item_add_option: ItemEquipmentInfoExceptionalOption,
    pub scroll_upgrade: String,
    pub cuttable_count: String,
    pub golden_hammer_flag: String,
    pub scroll_resilience_count: String,
    pub scroll_upgradeable_count: String,
    #[serde_as(deserialize_as = "DefaultOnNull")]
    pub soul_name: String, // null 가능
    #[serde_as(deserialize_as = "DefaultOnNull")]
    pub soul_option: String, // null 가능
    pub starforce: String,
    pub item_etc_option: ItemEquipmentStatOption,
    pub item_starforce_option: ItemEquipmentStatOption,
    pub special_ring_level: i8,
}

#[derive(Deserialize, Serialize, Debug)]
pub struct ItemEquipment {
    pub item_equipment: Vec<ItemEquipmentInfo>,
}

pub async fn get_user_item_equipment(
    Extension(api_key): Extension<Arc<API>>,
    header: HeaderMap,
) -> Result<Json<ItemEquipment>, (StatusCode, &'static str)> {
    // POST 요청 보내기
    let response = request_parser(api_key.clone(), header, "item-equipment").await;

    // 응답 결과 확인
    if response.status().is_success() {
        let user_item_equipment: ItemEquipment = response
            .json()
            .await
            .expect("Failed to parse response JSON");

        Ok(Json(user_item_equipment))
    } else {
        Err((StatusCode::BAD_REQUEST, "Failed to fetch OCID"))
    }
}
