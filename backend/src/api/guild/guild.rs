use crate::api::request::API;

use axum::{Extension, http::StatusCode, response::Json};
use reqwest::{Client, header};
use serde::{Deserialize, Serialize};
use std::sync::Arc;

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct GuildOcid {
    pub oguild_id: String,
}

#[derive(Serialize, Deserialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct Character {
    guild_name: String,
    wolrd_name: String,
}

pub async fn get_guild_ocid(
    Extension(api_key): Extension<Arc<API>>,
    Json(guild): Json<Character>,
) -> Result<Json<GuildOcid>, (StatusCode, &'static str)> {
    let client = Client::new();

    // 요청할 API의 URL
    let url = format!(
        "https://open.api.nexon.com/maplestory/v1/guild/id?guild_name={}&world_name={}",
        guild.guild_name, guild.wolrd_name
    );

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
        let userocid: GuildOcid = response
            .json()
            .await
            .expect("Failed to parse response JSON");

        Ok(Json(userocid))
    } else {
        Err((StatusCode::BAD_REQUEST, "Failed to fetch OCID"))
    }
}
