use crate::api::request::API;

use axum::{Extension, http::StatusCode, response::Json};
use reqwest::{Client, header};
use serde::{Deserialize, Serialize};
use serde_with::{DefaultOnNull, serde_as};
use std::sync::Arc;

#[serde_as]
#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct CashShopNoticeInfo {
    title: String,
    url: String,
    notice_id: u32,
    date: String,
    #[serde_as(deserialize_as = "DefaultOnNull")]
    date_sale_start: String,
    #[serde_as(deserialize_as = "DefaultOnNull")]
    date_sale_end: String,
}

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct CashShopNotice {
    cashshop_notice: Vec<CashShopNoticeInfo>,
}

pub async fn get_cash_shop_notice(
    Extension(api_key): Extension<Arc<API>>,
) -> Result<Json<CashShopNotice>, (StatusCode, &'static str)> {
    let client = Client::new();

    // 요청할 API의 URL
    let url = format!("https://open.api.nexon.com/maplestory/v1/notice-cashshop");

    // 요청 헤더 정의
    let mut headers = header::HeaderMap::new();
    headers.insert("x-nxopen-api-key", api_key.key.parse().unwrap());

    // POST 요청 보내기
    let response = client
        .get(url)
        .headers(headers)
        .send()
        .await
        .expect("Failed to send request");

    // 응답 결과 확인
    if response.status().is_success() {
        let notice: CashShopNotice = response
            .json()
            .await
            .expect("Failed to parse response JSON");

        Ok(Json(notice))
    } else {
        Err((StatusCode::BAD_REQUEST, "Failed to fetch OCID"))
    }
}
