use crate::api::character::request::request_parser;
use crate::api::request::API;

use super::character::UserOcid;

use axum::{Extension, http::StatusCode, response::Json};
use serde::{Deserialize, Serialize};
use std::sync::Arc;

#[derive(Deserialize, Serialize, Debug)]
pub struct RingExchangeSkillEquipment {
    character_class: String,
    special_ring_exchange_name: String,
    special_ring_exchange_level: i8,
    special_ring_exchange_icon: String,
    special_ring_exchange_description: String,
}

pub async fn get_user_ring_exchange_skill_equipment(
    Extension(api_key): Extension<Arc<API>>,
    Json(user_ocid): Json<UserOcid>,
) -> Result<Json<RingExchangeSkillEquipment>, (StatusCode, &'static str)> {
    // POST 요청 보내기
    let response = request_parser(
        api_key.clone(),
        "ring-exchange-skill-equipment",
        &user_ocid.ocid,
    )
    .await;

    println!("{:?}", response);

    // 응답 결과 확인
    if response.status().is_success() {
        let user_propensity: RingExchangeSkillEquipment = response
            .json()
            .await
            .expect("Failed to parse response JSON");

        Ok(Json(user_propensity))
    } else {
        Err((StatusCode::BAD_REQUEST, "Failed to fetch OCID"))
    }
}
