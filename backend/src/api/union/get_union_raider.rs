use crate::api::character::character::UserOcid;
use crate::api::request::API;
use crate::api::union::request::request_parser;

use axum::{Extension, http::StatusCode, response::Json};
use serde::{Deserialize, Serialize};
use std::sync::Arc;

#[derive(Serialize, Deserialize, Debug)]
pub struct UnionBlockInfo {
    block_type: String,
    block_class: String,
    block_level: String,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct UnionRaiderInfo {
    union_raider_stat: Vec<String>,
    union_occupied_stat: Vec<String>,
    union_block: Vec<UnionBlockInfo>,
    // 블럭 좌표는 불필요
}

pub async fn get_user_union_raider_info(
    Extension(api_key): Extension<Arc<API>>,
    Json(user_ocid): Json<UserOcid>,
) -> Result<Json<UnionRaiderInfo>, (StatusCode, &'static str)> {
    // POST 요청 보내기
    let response = request_parser(api_key.clone(), "union-raider", &user_ocid.ocid).await;

    // 응답 결과 확인
    if response.status().is_success() {
        let user_data: UnionRaiderInfo = response
            .json()
            .await
            .expect("Failed to parse response JSON");

        Ok(Json(user_data))
    } else {
        Err((StatusCode::BAD_REQUEST, "Failed to fetch OCID"))
    }
}
