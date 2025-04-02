use crate::api::character::character::UserOcid;
use crate::api::request::API;
use crate::api::union::request::request_parser;

use axum::{Extension, http::StatusCode, response::Json};
use serde::{Deserialize, Serialize};
use std::sync::Arc;

#[derive(Serialize, Deserialize, Debug)]
pub struct UnionChampionStatInfo {
    stat: String,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct UnionChampionInfo {
    champion_name: String,
    champion_slot: u8,
    champion_grade: String,
    champion_class: String,
    champion_badge_info: Vec<UnionChampionStatInfo>,
}
#[derive(Serialize, Deserialize, Debug)]
pub struct UnionChampiontInfo {
    union_champion: Vec<UnionChampionInfo>,
    champion_badge_total_info: Vec<UnionChampionStatInfo>, // 블럭 좌표는 불필요
}

pub async fn get_user_union_champion_info(
    Extension(api_key): Extension<Arc<API>>,
    Json(user_ocid): Json<UserOcid>,
) -> Result<Json<UnionChampiontInfo>, (StatusCode, &'static str)> {
    // POST 요청 보내기
    let response = request_parser(api_key.clone(), "union-champion", &user_ocid.ocid).await;

    // 응답 결과 확인
    if response.status().is_success() {
        let user_data: UnionChampiontInfo = response
            .json()
            .await
            .expect("Failed to parse response JSON");

        Ok(Json(user_data))
    } else {
        Err((StatusCode::BAD_REQUEST, "Failed to fetch OCID"))
    }
}
