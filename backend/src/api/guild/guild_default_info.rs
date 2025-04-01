use crate::api::request::API;

use axum::{Extension, http::StatusCode, response::Json};
use serde::{Deserialize, Serialize};
use std::sync::Arc;

use super::guild::GuildOcid;

use chrono::{Duration, Utc};
use chrono_tz::Asia::Seoul;
use reqwest::{Client, header};

#[derive(Serialize, Deserialize, Debug)]
pub struct GuildSkillInfo {
    skill_name: String,
    skill_description: String,
    skill_level: u8,
    skill_effect: String,
    skill_icon: String,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct GuildDefaultData {
    guild_name: String,
    guild_level: u8,
    guild_fame: u32,
    guild_point: u64,
    guild_master_name: String,
    guild_member_count: u8,
    guild_member: Vec<String>,
    guild_skill: Vec<GuildSkillInfo>,
}

pub async fn get_guild_default_info(
    Extension(api_key): Extension<Arc<API>>,
    Json(guild_ocid): Json<GuildOcid>,
) -> Result<Json<GuildDefaultData>, (StatusCode, &'static str)> {
    // 요청 헤더 정의
    let mut headers = header::HeaderMap::new();
    headers.insert("x-nxopen-api-key", api_key.key.parse().unwrap());

    let now_time = (Utc::now() - Duration::days(1))
        .with_timezone(&Seoul)
        .format("%Y-%m-%d");

    let url = format!(
        "https://open.api.nexon.com/maplestory/v1/guild/basic?oguild_id={}&date={}",
        guild_ocid.oguild_id, now_time
    );

    // POST 요청 보내기
    let response = Client::new()
        .get(url)
        .headers(headers)
        .send()
        .await
        .expect("Failed to send request");

    // 응답 결과 확인
    if response.status().is_success() {
        let guild_data: GuildDefaultData = response
            .json()
            .await
            .expect("Failed to parse response JSON");

        Ok(Json(guild_data))
    } else {
        Err((StatusCode::BAD_REQUEST, "Failed to fetch OCID"))
    }
}
