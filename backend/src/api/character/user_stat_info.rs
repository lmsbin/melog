use crate::api::character::request::{API, request_parser};

use axum::Extension;
use axum::{
    http::{HeaderMap, StatusCode},
    response::Json,
};
use serde::{Deserialize, Serialize};
use std::sync::Arc;

#[derive(Deserialize, Serialize, Debug)]
pub struct Stat {
    pub stat_name: String,
    pub stat_value: String,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct UserStatData {
    pub final_stat: Vec<Stat>,
}

pub async fn get_user_stat_info(
    Extension(api_key): Extension<Arc<API>>,
    header: HeaderMap,
) -> Result<Json<UserStatData>, (StatusCode, &'static str)> {
    // POST 요청 보내기
    let response = request_parser(api_key.clone(), header, "stat").await;

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
