use crate::api::character::request::request_parser;
use crate::api::request::API;

use super::character::UserOcid;

use axum::{Extension, http::StatusCode, response::Json};
use serde::{Deserialize, Serialize};
use std::sync::Arc;

#[derive(Deserialize, Serialize, Debug)]
pub struct CharacterHexaStatCore {
    slot_id: String,
    main_stat_name: Option<String>,
    sub_stat_name_1: Option<String>,
    sub_stat_name_2: Option<String>,
    main_stat_level: i8,
    sub_stat_level_1: i8,
    sub_stat_level_2: i8,
    stat_grade: i8,
}

#[derive(Deserialize, Serialize, Debug)]
pub struct UserHexaStatData {
    character_hexa_stat_core: Vec<CharacterHexaStatCore>,
    character_hexa_stat_core_2: Vec<CharacterHexaStatCore>,
    character_hexa_stat_core_3: Vec<CharacterHexaStatCore>,
    preset_hexa_stat_core: Vec<CharacterHexaStatCore>,
    preset_hexa_stat_core_2: Vec<CharacterHexaStatCore>,
    preset_hexa_stat_core_3: Vec<CharacterHexaStatCore>,
}

pub async fn get_user_hexa_stat_info(
    Extension(api_key): Extension<Arc<API>>,
    Json(user_ocid): Json<UserOcid>,
) -> Result<Json<UserHexaStatData>, (StatusCode, &'static str)> {
    // POST 요청 보내기
    let response = request_parser(api_key.clone(), "hexamatrix-stat", &user_ocid.ocid).await;

    // 응답 결과 확인
    if response.status().is_success() {
        let user_hexa_stat_data: UserHexaStatData = response
            .json()
            .await
            .expect("Failed to parse response JSON");

        let filtered_data = UserHexaStatData {
            character_hexa_stat_core: user_hexa_stat_data
                .character_hexa_stat_core
                .into_iter()
                .filter(|stat| {
                    stat.main_stat_name.is_some()
                        && stat.sub_stat_name_1.is_some()
                        && stat.sub_stat_name_2.is_some()
                })
                .collect(),

            character_hexa_stat_core_2: user_hexa_stat_data
                .character_hexa_stat_core_2
                .into_iter()
                .filter(|stat| {
                    stat.main_stat_name.is_some()
                        && stat.sub_stat_name_1.is_some()
                        && stat.sub_stat_name_2.is_some()
                })
                .collect(),

            character_hexa_stat_core_3: user_hexa_stat_data
                .character_hexa_stat_core_3
                .into_iter()
                .filter(|stat| {
                    stat.main_stat_name.is_some()
                        && stat.sub_stat_name_1.is_some()
                        && stat.sub_stat_name_2.is_some()
                })
                .collect(),

            preset_hexa_stat_core: user_hexa_stat_data
                .preset_hexa_stat_core
                .into_iter()
                .filter(|stat| {
                    stat.main_stat_name.is_some()
                        && stat.sub_stat_name_1.is_some()
                        && stat.sub_stat_name_2.is_some()
                })
                .collect(),

            preset_hexa_stat_core_2: user_hexa_stat_data
                .preset_hexa_stat_core_2
                .into_iter()
                .filter(|stat| {
                    stat.main_stat_name.is_some()
                        && stat.sub_stat_name_1.is_some()
                        && stat.sub_stat_name_2.is_some()
                })
                .collect(),

            preset_hexa_stat_core_3: user_hexa_stat_data
                .preset_hexa_stat_core_3
                .into_iter()
                .filter(|stat| {
                    stat.main_stat_name.is_some()
                        && stat.sub_stat_name_1.is_some()
                        && stat.sub_stat_name_2.is_some()
                })
                .collect(),
        };

        Ok(Json(filtered_data))
    } else {
        Err((StatusCode::BAD_REQUEST, "Failed to fetch OCID"))
    }
}
