use crate::api::character::request::request_parser;
use crate::api::request::API;

use super::character::UserOcid;

use axum::{Extension, http::StatusCode, response::Json};
use serde::{Deserialize, Serialize};
use serde_with::{DefaultOnNull, serde_as};
use std::sync::Arc;

#[derive(Deserialize, Serialize, Debug)]
pub struct CaseItemOption {
    option_type: String,
    option_value: i8,
}

#[serde_as]
#[derive(Deserialize, Serialize, Debug)]
pub struct SymbolInfo {
    cash_item_equipment_part: String,
    cash_item_equipment_slot: String,
    cash_item_name: String,
    cash_item_icon: String,
    #[serde_as(deserialize_as = "DefaultOnNull")]
    cash_item_description: String,
    cash_item_option: Vec<CaseItemOption>,
    #[serde_as(deserialize_as = "DefaultOnNull")]
    date_expire: String,
    #[serde_as(deserialize_as = "DefaultOnNull")]
    date_option_expire: String,
    #[serde_as(deserialize_as = "DefaultOnNull")]
    cash_item_label: String,
    #[serde_as(deserialize_as = "DefaultOnNull")]
    cash_item_coloring_prism: String,
    #[serde_as(deserialize_as = "DefaultOnNull")]
    item_gender: String,
}

#[derive(Deserialize, Serialize, Debug)]
pub struct Symbol {
    cash_item_equipment_base: Vec<SymbolInfo>,
}

pub async fn get_user_cash_item_equipment(
    Extension(api_key): Extension<Arc<API>>,
    Json(user_ocid): Json<UserOcid>,
) -> Result<Json<Symbol>, (StatusCode, &'static str)> {
    // POST 요청 보내기
    let response = request_parser(api_key.clone(), "cashitem-equipment", &user_ocid.ocid).await;

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
