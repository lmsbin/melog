use crate::api::character::request::{API, request_parser};

use axum::Extension;
use axum::{
    http::{HeaderMap, StatusCode},
    response::Json,
};
use chrono::{Duration, Utc};
use chrono_tz::Asia::Seoul;
use reqwest::{Client, header};
use serde::{Deserialize, Serialize};
use serde_with::{DefaultOnNull, serde_as};
use std::sync::Arc;

#[serde_as]
#[derive(Deserialize, Serialize, Debug)]
pub struct SkillInfo {
    pub skill_name: String,
    pub skill_description: String,
    pub skill_level: i8,
    #[serde_as(deserialize_as = "DefaultOnNull")]
    pub skill_effect: String,
    pub skill_icon: String,
    #[serde_as(deserialize_as = "DefaultOnNull")]
    pub skill_effect_next: String,
}

#[derive(Deserialize, Serialize, Debug)]
pub struct CharacterSkill {
    pub character_skill: Vec<SkillInfo>,
}

#[derive(Deserialize, Serialize, Debug)]
pub struct CharacterSkilLevel {
    pub level: i8,
}

pub async fn get_user_characeter_skill(
    Extension(api_key): Extension<Arc<API>>,
    header: HeaderMap,
    Json(character_skil_level): Json<CharacterSkilLevel>,
) -> Result<Json<CharacterSkill>, (StatusCode, &'static str)> {
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
        "https://open.api.nexon.com/maplestory/v1/character/skill?ocid={}&date={}&character_skill_grade={}",
        api_key.get_ocid_uuid(uuid).unwrap_or_default(),
        now_time,
        character_skil_level.level
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
        let user_character_skill: CharacterSkill = response
            .json()
            .await
            .expect("Failed to parse response JSON");

        Ok(Json(user_character_skill))
    } else {
        Err((StatusCode::BAD_REQUEST, "Failed to fetch OCID"))
    }
}

#[derive(Deserialize, Serialize, Debug)]
pub struct CharacterLinkSkill {
    pub character_link_skill: Vec<SkillInfo>,
}

pub async fn get_user_characeter_link_skill(
    Extension(api_key): Extension<Arc<API>>,
    header: HeaderMap,
) -> Result<Json<CharacterLinkSkill>, (StatusCode, &'static str)> {
    // POST 요청 보내기
    let response = request_parser(api_key.clone(), header, "link-skill").await;

    // 응답 결과 확인
    if response.status().is_success() {
        let user_character_link_skill: CharacterLinkSkill = response
            .json()
            .await
            .expect("Failed to parse response JSON");

        Ok(Json(user_character_link_skill))
    } else {
        Err((StatusCode::BAD_REQUEST, "Failed to fetch OCID"))
    }
}
