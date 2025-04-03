use crate::api::request::API;

use axum::{Extension, http::StatusCode, response::Json};
use serde::{Deserialize, Serialize};
use std::sync::Arc;

use chrono::{Duration, Utc};
use chrono_tz::Asia::Seoul;

use super::request::request_parser;

#[derive(Serialize, Deserialize, Debug)]
pub struct Achievement {
    #[serde(default)]
    ocid: Option<String>,
    #[serde(default)]
    page: Option<i32>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct RankingInfo {
    ranking: u32,
    trophy_score: u32,
    trophy_grade: String,
    character_name: String,
    world_name: String,
    class_name: String,
    sub_class_name: String,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct Ranking {
    ranking: Vec<RankingInfo>,
}

pub async fn get_achievement_ranking(
    Extension(api_key): Extension<Arc<API>>,
    Json(achievement): Json<Achievement>,
) -> Result<Json<Ranking>, (StatusCode, &'static str)> {
    let now_time = (Utc::now() - Duration::days(1))
        .with_timezone(&Seoul)
        .format("%Y-%m-%d");

    // 요청할 API의 URL
    let mut url = format!(
        "https://open.api.nexon.com/maplestory/v1/ranking/achievement?date={}",
        now_time,
    );

    {
        // 값이 존재하는 경우에만 파라미터 추가
        if let Some(ref ocid_val) = achievement.ocid {
            url.push_str(&format!("&ocid={ocid_val}"));
        }
        if let Some(page) = achievement.page {
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
