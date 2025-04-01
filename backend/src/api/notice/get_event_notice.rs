use crate::api::request::API;

use axum::{Extension, http::StatusCode, response::Json};
use reqwest::{Client, header};
use serde::{Deserialize, Serialize};
use std::sync::Arc;

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct EventNoticeInfo {
    title: String,
    url: String,
    notice_id: u32,
    date: String,
    date_event_start: String,
    date_event_end: String,
}

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct EvnetNotice {
    event_notice: Vec<EventNoticeInfo>,
}

pub async fn get_event_notice(
    Extension(api_key): Extension<Arc<API>>,
) -> Result<Json<EvnetNotice>, (StatusCode, &'static str)> {
    let client = Client::new();

    // 요청할 API의 URL
    let url = format!("https://open.api.nexon.com/maplestory/v1/notice-event");

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
        let notice: EvnetNotice = response
            .json()
            .await
            .expect("Failed to parse response JSON");

        Ok(Json(notice))
    } else {
        Err((StatusCode::BAD_REQUEST, "Failed to fetch OCID"))
    }
}
