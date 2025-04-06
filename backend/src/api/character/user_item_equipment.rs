use crate::api::character::request::request_parser;
use crate::api::request::API;

use super::character::UserOcid;

use axum::{Extension, http::StatusCode, response::Json};
use serde::{Deserialize, Serialize};
use serde_with::{DefaultOnNull, serde_as};
use std::sync::Arc;

#[derive(Deserialize, Serialize, Debug)]
pub struct ItemEquipmentInfoOption {
    str: String,
    dex: String,
    int: String,
    luk: String,
    max_hp: String,
    max_mp: String,
    attack_power: String,
    magic_power: String,
    armor: String,
    speed: String,
    jump: String,
    boss_damage: String,
    ignore_monster_armor: String,
    all_stat: String,
    #[serde(default)]
    damage: String,
    #[serde(default)]
    equipment_level_decrease: i8,
    max_hp_rate: String,
    max_mp_rate: String,
    #[serde(default)]
    base_equipment_level: i16,
}

#[serde_as]
#[derive(Deserialize, Serialize, Debug)]
pub struct ItemEquipmentInfoExceptionalOption {
    str: String,
    dex: String,
    int: String,
    luk: String,
    max_hp: String,
    max_mp: String,
    attack_power: String,
    magic_power: String,
    #[serde(default)]
    #[serde_as(deserialize_as = "DefaultOnNull")]
    exceptional_upgrade: i16,
    #[serde(default)]
    armor: String,
    #[serde(default)]
    speed: String,
    #[serde(default)]
    jump: String,
    #[serde(default)]
    damage: String,
    #[serde(default)]
    all_stat: String,
    #[serde(default)]
    equipment_level_decrease: i16,
}

#[derive(Deserialize, Serialize, Debug)]
pub struct ItemEquipmentStatOption {
    str: String,
    dex: String,
    int: String,
    luk: String,
    max_hp: String,
    max_mp: String,
    attack_power: String,
    magic_power: String,
    armor: String,
    speed: String,
    jump: String,
}

#[serde_as]
#[derive(Deserialize, Serialize, Debug)]
pub struct ItemEquipmentInfo {
    item_equipment_part: String,
    item_equipment_slot: String,
    item_name: String,
    item_icon: String,
    item_shape_name: String,
    item_shape_icon: String,
    item_total_option: ItemEquipmentInfoOption,
    item_base_option: ItemEquipmentInfoOption,
    #[serde_as(deserialize_as = "DefaultOnNull")]
    potential_option_grade: String, // null 가능
    #[serde_as(deserialize_as = "DefaultOnNull")]
    additional_potential_option_grade: String, // null 가능
    #[serde_as(deserialize_as = "DefaultOnNull")]
    potential_option_1: String, // null 가능
    #[serde_as(deserialize_as = "DefaultOnNull")]
    potential_option_2: String, // null 가능
    #[serde_as(deserialize_as = "DefaultOnNull")]
    potential_option_3: String, // null 가능
    #[serde_as(deserialize_as = "DefaultOnNull")]
    additional_potential_option_1: String, // null 가능
    #[serde_as(deserialize_as = "DefaultOnNull")]
    additional_potential_option_2: String, // null 가능
    #[serde_as(deserialize_as = "DefaultOnNull")]
    additional_potential_option_3: String, // null 가능
    item_exceptional_option: ItemEquipmentInfoExceptionalOption,
    item_add_option: ItemEquipmentInfoExceptionalOption,
    scroll_upgrade: String,
    cuttable_count: String,
    golden_hammer_flag: String,
    scroll_resilience_count: String,
    scroll_upgradeable_count: String,
    #[serde_as(deserialize_as = "DefaultOnNull")]
    soul_name: String, // null 가능
    #[serde_as(deserialize_as = "DefaultOnNull")]
    soul_option: String, // null 가능
    starforce: String,
    item_etc_option: ItemEquipmentStatOption,
    item_starforce_option: ItemEquipmentStatOption,
    special_ring_level: i8,
}

#[derive(Deserialize, Serialize, Debug)]
pub struct ItemEquipment {
    item_equipment: Vec<ItemEquipmentInfo>,
}

pub async fn get_user_item_equipment(
    Extension(api_key): Extension<Arc<API>>,
    Json(user_ocid): Json<UserOcid>,
) -> Result<Json<ItemEquipment>, (StatusCode, &'static str)> {
    // POST 요청 보내기
    let response = request_parser(api_key.clone(), "item-equipment", &user_ocid.ocid).await;

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
