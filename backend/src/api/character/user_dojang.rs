use crate::api::character::request::{API, request_parser};

use axum::{
    Extension,
    http::{HeaderMap, StatusCode},
    response::Json,
};
use serde::{Deserialize, Serialize};
use serde_with::{DefaultOnNull, serde_as};
use std::sync::Arc;

#[serde_as]
#[derive(Deserialize, Serialize, Debug)]
pub struct Dojang {
    pub dojang_best_floor: i8,
    #[serde_as(deserialize_as = "DefaultOnNull")]
    pub date_dojang_record: String,
    pub dojang_best_time: i32,
}

pub async fn get_user_dojang(
    Extension(api_key): Extension<Arc<API>>,
    header: HeaderMap,
) -> Result<Json<Dojang>, (StatusCode, &'static str)> {
    // POST 요청 보내기
    let response = request_parser(api_key.clone(), header, "dojang").await;

    // 응답 결과 확인
    if response.status().is_success() {
        let user_dojang: Dojang = response
            .json()
            .await
            .expect("Failed to parse response JSON");

        Ok(Json(user_dojang))
    } else {
        Err((StatusCode::BAD_REQUEST, "Failed to fetch OCID"))
    }
}
