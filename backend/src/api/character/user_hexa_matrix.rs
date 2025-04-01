use crate::api::character::request::request_parser;
use crate::api::request::API;

use super::character::UserOcid;

use axum::{Extension, http::StatusCode, response::Json};
use serde::{Deserialize, Serialize};
use std::sync::Arc;

#[derive(Deserialize, Serialize, Debug)]
pub struct HexaSkillInfo {
    pub hexa_skill_id: String,
}

#[derive(Deserialize, Serialize, Debug)]
pub struct HexaMatrixInfo {
    pub hexa_core_name: String,
    pub hexa_core_level: i8,
    pub hexa_core_type: String,
    pub linked_skill: Vec<HexaSkillInfo>,
}

#[derive(Deserialize, Serialize, Debug)]
pub struct HexaMatrix {
    pub character_hexa_core_equipment: Vec<HexaMatrixInfo>,
}

pub async fn get_user_hexa_matrix(
    Extension(api_key): Extension<Arc<API>>,
    Json(user_ocid): Json<UserOcid>,
) -> Result<Json<HexaMatrix>, (StatusCode, &'static str)> {
    // POST 요청 보내기
    let response = request_parser(api_key.clone(), "hexamatrix", &user_ocid.ocid).await;

    // 응답 결과 확인
    if response.status().is_success() {
        let user_hexa_matrix: HexaMatrix = response
            .json()
            .await
            .expect("Failed to parse response JSON");

        Ok(Json(user_hexa_matrix))
    } else {
        Err((StatusCode::BAD_REQUEST, "Failed to fetch OCID"))
    }
}
