use crate::api::request::API;

use reqwest::{Client, header};
use std::sync::Arc;

pub async fn request_parser(api_key: Arc<API>, url: &str) -> reqwest::Response {
    // 요청 헤더 정의
    let mut headers = header::HeaderMap::new();
    headers.insert("x-nxopen-api-key", api_key.key.parse().unwrap());

    // POST 요청 보내기
    let response = Client::new()
        .get(url)
        .headers(headers)
        .send()
        .await
        .expect("Failed to send request");

    return response;
}
