use crate::api::character::request::request_parser;
use crate::api::request::API;

use super::character::UserOcid;

use axum::{Extension, http::StatusCode, response::Json};
use serde::{Deserialize, Serialize};
use serde_with::{DefaultOnNull, serde_as};
use std::sync::Arc;

#[serde_as]
#[derive(Deserialize, Serialize, Debug)]
pub struct Dojang {
    dojang_best_floor: i8,
    #[serde_as(deserialize_as = "DefaultOnNull")]
    date_dojang_record: String,
    dojang_best_time: i32,
}

pub async fn get_user_dojang(
    Extension(api_key): Extension<Arc<API>>,
    Json(user_ocid): Json<UserOcid>,
) -> Result<Json<Dojang>, (StatusCode, &'static str)> {
    // POST 요청 보내기
    let response = request_parser(api_key.clone(), "dojang", &user_ocid.ocid).await;

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
