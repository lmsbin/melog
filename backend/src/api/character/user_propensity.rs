use crate::api::character::request::request_parser;
use crate::api::request::API;

use super::character::UserOcid;

use axum::{Extension, http::StatusCode, response::Json};
use serde::{Deserialize, Serialize};
use std::sync::Arc;

#[derive(Deserialize, Serialize, Debug)]
pub struct Propensity {
    charisma_level: i8,
    sensibility_level: i8,
    insight_level: i8,
    willingness_level: i8,
    handicraft_level: i8,
    charm_level: i8,
}

pub async fn get_user_propensity(
    Extension(api_key): Extension<Arc<API>>,
    Json(user_ocid): Json<UserOcid>,
) -> Result<Json<Propensity>, (StatusCode, &'static str)> {
    // POST 요청 보내기
    let response = request_parser(api_key.clone(), "propensity", &user_ocid.ocid).await;

    // 응답 결과 확인
    if response.status().is_success() {
        let user_propensity: Propensity = response
            .json()
            .await
            .expect("Failed to parse response JSON");

        Ok(Json(user_propensity))
    } else {
        Err((StatusCode::BAD_REQUEST, "Failed to fetch OCID"))
    }
}
