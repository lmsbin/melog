use crate::api::character::request::{API, request_parser};

use axum::Extension;
use axum::{
    http::{HeaderMap, StatusCode},
    response::Json,
};
use serde::{Deserialize, Serialize};
use std::sync::Arc;

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
    pub symbol_drop_rate: String,
    pub symbol_meso_rate: String,
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
    header: HeaderMap,
) -> Result<Json<Symbol>, (StatusCode, &'static str)> {
    // POST 요청 보내기
    let response = request_parser(api_key.clone(), header, "symbol-equipment").await;

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
