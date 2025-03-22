use axum::Extension;
use axum::{http::StatusCode, response::Json};
use chrono::{Duration, Utc};
use chrono_tz::Asia::Seoul;
use reqwest::{Client, header};
use serde::{Deserialize, Serialize};
use std::sync::{Arc, Mutex};

#[derive(Serialize, Deserialize, Clone)]
pub struct UserOcid {
    ocid: String,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct UserData {
    character_name: String,
    world_name: String,
    character_gender: String,
    character_class: String,
    character_class_level: String,
    character_level: i16,
    character_exp: i64,
    character_exp_rate: String,
    character_guild_name: String,
    character_image: String,
}

#[derive(Serialize, Deserialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct Character {
    nick_name: String,
}

pub struct API {
    pub key: Mutex<String>,
    pub ocid: Mutex<String>,
}

pub async fn get_ocid(
    Extension(api_key): Extension<Arc<API>>,
    Json(character): Json<Character>,
) -> Result<Json<UserOcid>, (StatusCode, &'static str)> {
    let client = Client::new();

    // 요청할 API의 URL
    let url = format!(
        "https://open.api.nexon.com/maplestory/v1/id?character_name={}",
        character.nick_name
    );
    // 요청 헤더 정의
    let mut headers = header::HeaderMap::new();
    headers.insert(
        "x-nxopen-api-key",
        api_key.key.lock().unwrap().parse().unwrap(),
    );

    // POST 요청 보내기
    let response = client
        .get(url)
        .headers(headers)
        .send()
        .await
        .expect("Failed to send request");

    // 응답 결과 확인
    if response.status().is_success() {
        let userocid: UserOcid = response
            .json()
            .await
            .expect("Failed to parse response JSON");

        // 전역 변수 업데이트
        let mut ocid = api_key.ocid.lock().unwrap();
        *ocid = userocid.ocid.clone();

        Ok(Json(userocid))
    } else {
        Err((StatusCode::BAD_REQUEST, "Failed to fetch OCID"))
    }
}

pub async fn get_user_info(
    Extension(api_key): Extension<Arc<API>>,
) -> Result<Json<UserData>, (StatusCode, &'static str)> {
    let client = Client::new();
    let now_time = (Utc::now() - Duration::days(1))
        .with_timezone(&Seoul)
        .format("%Y-%m-%d")
        .to_string();

    // 요청할 API의 URL
    let url = format!(
        "https://open.api.nexon.com/maplestory/v1/character/basic?ocid={}&date={}",
        api_key.ocid.lock().unwrap().to_string(),
        now_time.to_string()
    );

    // 요청 헤더 정의
    let mut headers = header::HeaderMap::new();
    headers.insert(
        "x-nxopen-api-key",
        api_key.key.lock().unwrap().parse().unwrap(),
    );

    // POST 요청 보내기
    let response = client
        .get(url)
        .headers(headers)
        .send()
        .await
        .expect("Failed to send request");

    // 응답 결과 확인
    if response.status().is_success() {
        let user_data: UserData = response
            .json()
            .await
            .expect("Failed to parse response JSON");

        Ok(Json(user_data))
    } else {
        Err((StatusCode::BAD_REQUEST, "Failed to fetch OCID"))
    }
}
