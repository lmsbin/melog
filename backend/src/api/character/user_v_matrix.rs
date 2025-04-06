use crate::api::character::request::request_parser;
use crate::api::request::API;

use super::character::UserOcid;

use axum::{Extension, http::StatusCode, response::Json};
use serde::{Deserialize, Serialize};
use serde_with::{DefaultOnNull, serde_as};
use std::sync::Arc;

#[serde_as]
#[derive(Deserialize, Serialize, Debug)]
pub struct VMatrixInfo {
    slot_id: String,
    slot_level: i8,
    #[serde_as(deserialize_as = "DefaultOnNull")]
    v_core_name: String,
    v_core_level: i8,
    #[serde_as(deserialize_as = "DefaultOnNull")]
    v_core_skill_1: String,
    #[serde_as(deserialize_as = "DefaultOnNull")]
    v_core_skill_2: String,
    #[serde_as(deserialize_as = "DefaultOnNull")]
    v_core_skill_3: String,
    #[serde_as(deserialize_as = "DefaultOnNull")]
    v_core_type: String,
}

#[derive(Deserialize, Serialize, Debug)]
pub struct VMatrix {
    character_v_core_equipment: Vec<VMatrixInfo>,
    character_v_matrix_remain_slot_upgrade_point: i8,
}

pub async fn get_user_v_matrix(
    Extension(api_key): Extension<Arc<API>>,
    Json(user_ocid): Json<UserOcid>,
) -> Result<Json<VMatrix>, (StatusCode, &'static str)> {
    // POST 요청 보내기
    let response = request_parser(api_key.clone(), "vmatrix", &user_ocid.ocid).await;

    // 응답 결과 확인
    if response.status().is_success() {
        let user_v_matrix: VMatrix = response
            .json()
            .await
            .expect("Failed to parse response JSON");

        Ok(Json(user_v_matrix))
    } else {
        Err((StatusCode::BAD_REQUEST, "Failed to fetch OCID"))
    }
}
