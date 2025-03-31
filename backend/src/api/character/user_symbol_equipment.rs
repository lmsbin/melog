use crate::api::character::request::{API, request_parser};

use super::character::UserOcid;

use axum::{Extension, http::StatusCode, response::Json};
use serde::{Deserialize, Serialize};
use serde_with::{DefaultOnNull, serde_as};
use std::sync::Arc;

#[serde_as]
#[derive(Deserialize, Serialize, Debug)]
pub struct SymbolInfo {
    pub symbol_name: String,
    pub symbol_icon: String,
    pub symbol_force: String,
    pub symbol_level: i8,
    pub symbol_str: String,
    pub symbol_dex: String,
    pub symbol_int: String,
    pub symbol_luk: String,
    pub symbol_hp: String,
    #[serde_as(deserialize_as = "DefaultOnNull")]
    pub symbol_drop_rate: String,
    #[serde_as(deserialize_as = "DefaultOnNull")]
    pub symbol_meso_rate: String,
    #[serde_as(deserialize_as = "DefaultOnNull")]
    pub symbol_exp_rate: String,
    pub symbol_growth_count: i32,
    pub symbol_require_growth_count: i32,
}

#[derive(Deserialize, Serialize, Debug)]
pub struct Symbol {
    pub symbol: Vec<SymbolInfo>,
}

pub async fn get_user_symbol_equipment(
    Extension(api_key): Extension<Arc<API>>,
    Json(user_ocid): Json<UserOcid>,
) -> Result<Json<Symbol>, (StatusCode, &'static str)> {
    // POST 요청 보내기
    let response = request_parser(api_key.clone(), "symbol-equipment", &user_ocid.ocid).await;

    // 응답 결과 확인
    if response.status().is_success() {
        let user_symbol: Symbol = response
            .json()
            .await
            .expect("Failed to parse response JSON");

        Ok(Json(user_symbol))
    } else {
        Err((StatusCode::BAD_REQUEST, "Failed to fetch OCID"))
    }
}
