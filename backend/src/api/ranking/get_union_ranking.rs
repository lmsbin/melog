use crate::api::request::API;

use axum::{Extension, http::StatusCode, response::Json};
use reqwest::{Client, header};
use serde::{Deserialize, Serialize};
use std::sync::Arc;

use chrono::{Duration, Utc};
use chrono_tz::Asia::Seoul;

#[derive(Serialize, Deserialize, Debug)]
pub struct Union {
    #[serde(default)]
    world_name: Option<String>,
    #[serde(default)]
    ocid: Option<String>,
    #[serde(default)]
    page: Option<i32>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct RankingInfo {
    ranking: u32,
    character_name: String,
    world_name: String,
    class_name: String,
    sub_class_name: String,
    union_level: u32,
    union_power: u64,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct Ranking {
    ranking: Vec<RankingInfo>,
}

pub async fn get_union_ranking(
    Extension(api_key): Extension<Arc<API>>,
    Json(union): Json<Union>,
) -> Result<Json<Ranking>, (StatusCode, &'static str)> {
    let client = Client::new();

    let now_time = (Utc::now() - Duration::days(1))
        .with_timezone(&Seoul)
        .format("%Y-%m-%d");

    // 요청할 API의 URL
    let mut url = format!(
        "https://open.api.nexon.com/maplestory/v1/ranking/union?date={}",
        now_time
    );

    {
        // 값이 존재하는 경우에만 파라미터 추가
        if let Some(ref world_name) = union.world_name {
            url.push_str(&format!("&world_name={world_name}"));
        }
        if let Some(ref ocid_val) = union.ocid {
            url.push_str(&format!("&ocid={ocid_val}"));
        }
        if let Some(page) = union.page {
            url.push_str(&format!("&page={page}"));
        }
    }

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
        let ranking: Ranking = response
            .json()
            .await
            .expect("Failed to parse response JSON");

        Ok(Json(ranking))
    } else {
        Err((StatusCode::BAD_REQUEST, "Failed to fetch OCID"))
    }
}
