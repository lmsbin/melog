use crate::api::character::request::{API, request_parser};

use axum::Extension;
use axum::{
    http::{HeaderMap, StatusCode},
    response::Json,
};
use serde::{Deserialize, Serialize};
use std::sync::Arc;

#[derive(Serialize, Deserialize, Debug)]
pub struct UserDefaultData {
    character_name: String,
    world_name: String,
    character_gender: String,
    character_class: String,
    character_class_level: String,
    character_level: i16,
    character_exp: i64,
    character_exp_rate: String,
    character_guild_name: String,
    character_image: String,
    character_date_create: String,
}

pub async fn get_user_default_info(
    Extension(api_key): Extension<Arc<API>>,
    header: HeaderMap,
) -> Result<Json<UserDefaultData>, (StatusCode, &'static str)> {
    // POST 요청 보내기
    let response = request_parser(api_key.clone(), header, "basic").await;

    // 응답 결과 확인
    if response.status().is_success() {
        let user_data: UserDefaultData = response
            .json()
            .await
            .expect("Failed to parse response JSON");

        Ok(Json(user_data))
    } else {
        Err((StatusCode::BAD_REQUEST, "Failed to fetch OCID"))
    }
}
