use crate::api::request::API;

use axum::{Extension, http::StatusCode, response::Json};
use serde::{Deserialize, Serialize};
use std::sync::Arc;

use chrono::{Duration, Utc};
use chrono_tz::Asia::Seoul;

use super::request::request_parser;

#[derive(Serialize, Deserialize, Debug)]
pub struct Guild {
    #[serde(default)]
    world_name: Option<String>,
    ranking_type: u8,
    #[serde(default)]
    guild_name: Option<String>,
    #[serde(default)]
    page: Option<i32>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct RankingInfo {
    world_name: String,
    guild_name: String,
    guild_level: u8,
    guild_mark: String,
    guild_point: u32,
    ranking: u32,
    guild_master_name: String,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct Ranking {
    ranking: Vec<RankingInfo>,
}

pub async fn get_guild_ranking(
    Extension(api_key): Extension<Arc<API>>,
    Json(guild): Json<Guild>,
) -> Result<Json<Ranking>, (StatusCode, &'static str)> {
    let now_time = (Utc::now() - Duration::days(1))
        .with_timezone(&Seoul)
        .format("%Y-%m-%d");

    // 요청할 API의 URL
    let mut url = format!(
        "https://open.api.nexon.com/maplestory/v1/ranking/guild?date={}&ranking_type={}",
        now_time, guild.ranking_type
    );

    {
        // 값이 존재하는 경우에만 파라미터 추가
        if let Some(ref world_name) = guild.world_name {
            url.push_str(&format!("&world_name={world_name}"));
        }
        if let Some(ref guild_name) = guild.guild_name {
            url.push_str(&format!("&guild_name={guild_name}"));
        }
        if let Some(page) = guild.page {
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
