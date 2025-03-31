use std::sync::Arc;

use chrono::{Duration, Utc};
use chrono_tz::Asia::Seoul;
use reqwest::{Client, header};

pub struct API {
    pub key: String,
}

impl API {
    // 생성자
    pub fn new(key: String) -> Self {
        Self { key }
    }
}

pub async fn request_parser(api_key: Arc<API>, kind: &str, user_ocid: &str) -> reqwest::Response {
    // 요청 헤더 정의
    let mut headers = header::HeaderMap::new();
    headers.insert("x-nxopen-api-key", api_key.key.parse().unwrap());

    let now_time = (Utc::now() - Duration::days(1))
        .with_timezone(&Seoul)
        .format("%Y-%m-%d");

    let url = format!(
        "https://open.api.nexon.com/maplestory/v1/character/{}?ocid={}&date={}",
        kind, user_ocid, now_time
    );

    println!("{}", url);

    // POST 요청 보내기
    let response = Client::new()
        .get(url)
        .headers(headers)
        .send()
        .await
        .expect("Failed to send request");

    return response;
}
