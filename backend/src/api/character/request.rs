use std::sync::Arc;

use axum::http::HeaderMap;
use chrono::{Duration, Utc};
use chrono_tz::Asia::Seoul;
use dashmap::DashMap;
use reqwest::{Client, header};

pub struct API {
    pub key: String,
    pub ocid: DashMap<String, String>,
}

impl API {
    // 생성자
    pub fn new(key: String) -> Self {
        Self {
            key,
            ocid: DashMap::new(),
        }
    }

    // uuid에 해당하는 ocid 값을 가져옵니다.
    pub fn get_ocid_uuid(&self, uuid: &str) -> Option<String> {
        self.ocid.get(uuid).map(|entry| entry.value().clone())
    }

    // uuid에 해당하는 ocid 값을 설정합니다.
    pub fn set_ocid_uuid(&self, uuid: String, ocid: String) {
        self.ocid.insert(uuid, ocid);
    }
}

pub async fn request_parser(api_key: Arc<API>, header: HeaderMap, kind: &str) -> reqwest::Response {
    let uuid = header
        .get("uuid")
        .and_then(|value| value.to_str().ok())
        .unwrap_or_default();

    // 요청 헤더 정의
    let mut headers = header::HeaderMap::new();
    headers.insert("x-nxopen-api-key", api_key.key.parse().unwrap());

    let now_time = (Utc::now() - Duration::days(1))
        .with_timezone(&Seoul)
        .format("%Y-%m-%d");

    let url = format!(
        "https://open.api.nexon.com/maplestory/v1/character/{}?ocid={}&date={}",
        kind,
        api_key.get_ocid_uuid(uuid).unwrap_or_default(),
        now_time
    );

    // POST 요청 보내기
    let response = Client::new()
        .get(url)
        .headers(headers)
        .send()
        .await
        .expect("Failed to send request");

    return response;
}
