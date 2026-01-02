use crate::api::character::request::request_parser;
use crate::api::request::API;

use super::character::UserOcid;

use axum::{Extension, http::StatusCode, response::Json};
use serde::{Deserialize, Serialize};
use serde_with::{DefaultOnNull, serde_as};
use std::sync::Arc;

#[serde_as]
#[derive(Deserialize, Serialize, Debug)]
pub struct SymbolInfo {
    symbol_name: String,
    symbol_other_effect_description: String,
    symbol_icon: String,
    symbol_force: String,
    symbol_level: i8,
    symbol_str: String,
    symbol_dex: String,
    symbol_int: String,
    symbol_luk: String,
    symbol_hp: String,
    #[serde_as(deserialize_as = "DefaultOnNull")]
    symbol_drop_rate: String,
    #[serde_as(deserialize_as = "DefaultOnNull")]
    symbol_meso_rate: String,
    #[serde_as(deserialize_as = "DefaultOnNull")]
    symbol_exp_rate: String,
    symbol_growth_count: i32,
    symbol_require_growth_count: i32,
}

#[derive(Deserialize, Serialize, Debug)]
pub struct Symbol {
    symbol: Vec<SymbolInfo>,
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
