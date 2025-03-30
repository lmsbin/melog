use crate::api::character::request::{API, request_parser};

use axum::{
    Extension,
    http::{HeaderMap, StatusCode},
    response::Json,
};
use serde::{Deserialize, Serialize};
use std::sync::Arc;

#[derive(Deserialize, Serialize, Debug)]
pub struct AndroidEquipment {
    pub android_name: String,
    pub android_nickname: String,
    pub android_icon: String,
    pub android_description: String,
}

pub async fn get_user_android_equipment(
    Extension(api_key): Extension<Arc<API>>,
    header: HeaderMap,
) -> Result<Json<AndroidEquipment>, (StatusCode, &'static str)> {
    // POST 요청 보내기
    let response = request_parser(api_key.clone(), header, "android-equipment").await;

    // 응답 결과 확인
    if response.status().is_success() {
        let user_item_equipment: AndroidEquipment = response
            .json()
            .await
            .expect("Failed to parse response JSON");

        Ok(Json(user_item_equipment))
    } else {
        Err((StatusCode::BAD_REQUEST, "Failed to fetch OCID"))
    }
}
