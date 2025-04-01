use crate::api::character::request::request_parser;
use crate::api::request::API;

use axum::{Extension, http::StatusCode, response::Json};
use serde::{Deserialize, Serialize};
use std::sync::Arc;

use super::character::UserOcid;

#[derive(Deserialize, Serialize, Debug)]
pub struct AbilityInfo {
    pub ability_no: String,
    pub ability_grade: String,
    pub ability_value: String,
}

#[derive(Deserialize, Serialize, Debug)]
pub struct Ability {
    pub ability_grade: String,
    pub ability_info: Vec<AbilityInfo>,
}

pub async fn get_user_ability(
    Extension(api_key): Extension<Arc<API>>,
    Json(user_ocid): Json<UserOcid>,
) -> Result<Json<Ability>, (StatusCode, &'static str)> {
    // POST 요청 보내기
    let response = request_parser(api_key.clone(), "ability", &user_ocid.ocid).await;

    // 응답 결과 확인
    if response.status().is_success() {
        let user_ability: Ability = response
            .json()
            .await
            .expect("Failed to parse response JSON");

        Ok(Json(user_ability))
    } else {
        Err((StatusCode::BAD_REQUEST, "Failed to fetch OCID"))
    }
}
