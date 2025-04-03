use crate::api::request::API;

use axum::{Extension, http::StatusCode, response::Json};
use serde::{Deserialize, Serialize};
use std::sync::Arc;

use chrono::{Duration, Utc};
use chrono_tz::Asia::Seoul;

use super::request::request_parser;

#[derive(Serialize, Deserialize, Debug)]
pub struct TheSeed {
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
    theseed_floor: u8,
    theseed_time_record: u16,
    character_name: String,
    world_name: String,
    class_name: String,
    sub_class_name: String,
    character_level: u16,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct Ranking {
    ranking: Vec<RankingInfo>,
}

pub async fn get_theseed_ranking(
    Extension(api_key): Extension<Arc<API>>,
    Json(the_seed): Json<TheSeed>,
) -> Result<Json<Ranking>, (StatusCode, &'static str)> {
    let now_time = (Utc::now() - Duration::days(1))
        .with_timezone(&Seoul)
        .format("%Y-%m-%d");

    // 요청할 API의 URL
    let mut url = format!(
        "https://open.api.nexon.com/maplestory/v1/ranking/theseed?date={}",
        now_time,
    );

    {
        // 값이 존재하는 경우에만 파라미터 추가
        if let Some(ref world_name) = the_seed.world_name {
            url.push_str(&format!("&world_name={world_name}"));
        }
        if let Some(ref ocid_val) = the_seed.ocid {
            url.push_str(&format!("&ocid={ocid_val}"));
        }
        if let Some(page) = the_seed.page {
            url.push_str(&format!("&page={page}"));
        }
    }

    // POST 요청 보내기
    let response = request_parser(api_key, &url).await;

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
