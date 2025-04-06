use crate::api::character::request::request_parser;
use crate::api::request::API;

use super::character::UserOcid;

use axum::{Extension, http::StatusCode, response::Json};
use serde::{Deserialize, Serialize};
use std::sync::Arc;

#[derive(Deserialize, Serialize, Debug)]
pub struct Stat {
    stat_name: String,
    stat_value: String,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct UserStatData {
    final_stat: Vec<Stat>,
}

pub async fn get_user_stat_info(
    Extension(api_key): Extension<Arc<API>>,
    Json(user_ocid): Json<UserOcid>,
) -> Result<Json<UserStatData>, (StatusCode, &'static str)> {
    // POST 요청 보내기
    let response = request_parser(api_key.clone(), "stat", &user_ocid.ocid).await;

    // 응답 결과 확인
    if response.status().is_success() {
        let user_stat_data: UserStatData = response
            .json()
            .await
            .expect("Failed to parse response JSON");

        Ok(Json(user_stat_data))
    } else {
        Err((StatusCode::BAD_REQUEST, "Failed to fetch OCID"))
    }
}
