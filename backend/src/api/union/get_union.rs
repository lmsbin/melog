use crate::api::character::character::UserOcid;
use crate::api::request::API;
use crate::api::union::request::request_parser;

use axum::{Extension, http::StatusCode, response::Json};
use serde::{Deserialize, Serialize};
use std::sync::Arc;

#[derive(Serialize, Deserialize, Debug)]
pub struct UnionInfo {
    union_level: u16,
    union_grade: String,
    union_artifact_level: u16,
    union_artifact_exp: u32,
    union_artifact_point: u32,
}

pub async fn get_user_union_info(
    Extension(api_key): Extension<Arc<API>>,
    Json(user_ocid): Json<UserOcid>,
) -> Result<Json<UnionInfo>, (StatusCode, &'static str)> {
    // POST 요청 보내기
    let response = request_parser(api_key.clone(), "union", &user_ocid.ocid).await;

    // 응답 결과 확인
    if response.status().is_success() {
        let user_data: UnionInfo = response
            .json()
            .await
            .expect("Failed to parse response JSON");

        Ok(Json(user_data))
    } else {
        Err((StatusCode::BAD_REQUEST, "Failed to fetch OCID"))
    }
}
