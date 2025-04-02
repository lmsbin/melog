use crate::api::character::character::UserOcid;
use crate::api::request::API;
use crate::api::union::request::request_parser;

use axum::{Extension, http::StatusCode, response::Json};
use serde::{Deserialize, Serialize};
use std::sync::Arc;

#[derive(Serialize, Deserialize, Debug)]
pub struct UnionArtifactEffectInfo {
    name: String,
    level: u8,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct UnionArtifactCrystalInfo {
    name: String,
    level: u8,
    crystal_option_name_1: String,
    crystal_option_name_2: String,
    crystal_option_name_3: String,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct UnionArtifactInfo {
    union_artifact_effect: Vec<UnionArtifactEffectInfo>,
    union_artifact_crystal: Vec<UnionArtifactCrystalInfo>, // 블럭 좌표는 불필요
}

pub async fn get_user_union_artifact_info(
    Extension(api_key): Extension<Arc<API>>,
    Json(user_ocid): Json<UserOcid>,
) -> Result<Json<UnionArtifactInfo>, (StatusCode, &'static str)> {
    // POST 요청 보내기
    let response = request_parser(api_key.clone(), "union-artifact", &user_ocid.ocid).await;

    // 응답 결과 확인
    if response.status().is_success() {
        let user_data: UnionArtifactInfo = response
            .json()
            .await
            .expect("Failed to parse response JSON");

        Ok(Json(user_data))
    } else {
        Err((StatusCode::BAD_REQUEST, "Failed to fetch OCID"))
    }
}
