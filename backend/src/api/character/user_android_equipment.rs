use crate::api::character::request::request_parser;
use crate::api::request::API;

use super::character::UserOcid;

use axum::{Extension, http::StatusCode, response::Json};
use serde::{Deserialize, Serialize};
use std::sync::Arc;

#[derive(Deserialize, Serialize, Debug)]
pub struct AndroidEquipment {
    android_name: String,
    android_nickname: String,
    android_icon: String,
    android_description: String,
}

pub async fn get_user_android_equipment(
    Extension(api_key): Extension<Arc<API>>,
    Json(user_ocid): Json<UserOcid>,
) -> Result<Json<AndroidEquipment>, (StatusCode, &'static str)> {
    // POST 요청 보내기
    let response = request_parser(api_key.clone(), "android-equipment", &user_ocid.ocid).await;

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
