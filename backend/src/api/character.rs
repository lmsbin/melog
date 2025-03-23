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
pub struct UserDefaultData {
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
    character_date_create: String,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct UserStatData {
    pub final_stat: Vec<Stat>,
}

#[derive(Deserialize, Serialize, Debug)]
pub struct Stat {
    pub stat_name: String,
    pub stat_value: String,
}

#[derive(Deserialize, Serialize, Debug)]
pub struct HyperStat {
    pub stat_type: String,
    pub stat_point: Option<u32>, // null을 허용하기 위해 Option 사용
    pub stat_level: u32,
    pub stat_increase: Option<String>,
}

#[derive(Deserialize, Serialize, Debug)]
pub struct UserHyperStatData {
    pub hyper_stat_preset_1: Vec<HyperStat>,
}

#[derive(Deserialize, Serialize, Debug)]
pub struct Propensity {
    pub charisma_level: i8,
    pub sensibility_level: i8,
    pub insight_level: i8,
    pub willingness_level: i8,
    pub handicraft_level: i8,
    pub charm_level: i8,
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

pub async fn request_parser(api_key: Arc<API>, url: String) -> reqwest::Response {
    // 요청 헤더 정의
    let mut headers = header::HeaderMap::new();
    headers.insert(
        "x-nxopen-api-key",
        api_key.key.lock().unwrap().parse().unwrap(),
    );

    // POST 요청 보내기
    let response = Client::new()
        .get(url)
        .headers(headers)
        .send()
        .await
        .expect("Failed to send request");

    return response;
}

pub async fn get_user_default_info(
    Extension(api_key): Extension<Arc<API>>,
) -> Result<Json<UserDefaultData>, (StatusCode, &'static str)> {
    let now_time = (Utc::now() - Duration::days(1))
        .with_timezone(&Seoul)
        .format("%Y-%m-%d")
        .to_string();

    // POST 요청 보내기
    let response = request_parser(
        api_key.clone(),
        format!(
            "https://open.api.nexon.com/maplestory/v1/character/basic?ocid={}&date={}",
            api_key.ocid.lock().unwrap().to_string(),
            now_time.to_string()
        ),
    )
    .await;

    // 응답 결과 확인
    if response.status().is_success() {
        let user_data: UserDefaultData = response
            .json()
            .await
            .expect("Failed to parse response JSON");

        Ok(Json(user_data))
    } else {
        Err((StatusCode::BAD_REQUEST, "Failed to fetch OCID"))
    }
}

pub async fn get_user_stat_info(
    Extension(api_key): Extension<Arc<API>>,
) -> Result<Json<UserStatData>, (StatusCode, &'static str)> {
    let now_time = (Utc::now() - Duration::days(1))
        .with_timezone(&Seoul)
        .format("%Y-%m-%d")
        .to_string();

    // POST 요청 보내기
    let response = request_parser(
        api_key.clone(),
        format!(
            "https://open.api.nexon.com/maplestory/v1/character/stat?ocid={}&date={}",
            api_key.ocid.lock().unwrap().to_string(),
            now_time.to_string()
        ),
    )
    .await;

    // 응답 결과 확인
    if response.status().is_success() {
        let user_stat_data: UserStatData = response
            .json()
            .await
            .expect("Failed to parse response JSON");

        Ok(Json(user_stat_data))
    } else {
        Err((StatusCode::BAD_REQUEST, "Failed to fetch OCID"))
    }
}

pub async fn get_user_hyper_stat_info(
    Extension(api_key): Extension<Arc<API>>,
) -> Result<Json<UserHyperStatData>, (StatusCode, &'static str)> {
    let now_time = (Utc::now() - Duration::days(1))
        .with_timezone(&Seoul)
        .format("%Y-%m-%d")
        .to_string();

    // POST 요청 보내기
    let response = request_parser(
        api_key.clone(),
        format!(
            "https://open.api.nexon.com/maplestory/v1/character/hyper-stat?ocid={}&date={}",
            api_key.ocid.lock().unwrap().to_string(),
            now_time.to_string()
        ),
    )
    .await;

    // 응답 결과 확인
    if response.status().is_success() {
        let user_hyper_stat_data: UserHyperStatData = response
            .json()
            .await
            .expect("Failed to parse response JSON");

        let filtered_data = UserHyperStatData {
            hyper_stat_preset_1: user_hyper_stat_data
                .hyper_stat_preset_1
                .into_iter()
                .filter(|stat| stat.stat_point.is_some() && stat.stat_increase.is_some())
                .collect(),
        };

        Ok(Json(filtered_data))
    } else {
        Err((StatusCode::BAD_REQUEST, "Failed to fetch OCID"))
    }
}

pub async fn get_user_propensity(
    Extension(api_key): Extension<Arc<API>>,
) -> Result<Json<Propensity>, (StatusCode, &'static str)> {
    let now_time = (Utc::now() - Duration::days(1))
        .with_timezone(&Seoul)
        .format("%Y-%m-%d")
        .to_string();

    // POST 요청 보내기
    let response = request_parser(
        api_key.clone(),
        format!(
            "https://open.api.nexon.com/maplestory/v1/character/propensity?ocid={}&date={}",
            api_key.ocid.lock().unwrap().to_string(),
            now_time.to_string()
        ),
    )
    .await;

    // 응답 결과 확인
    if response.status().is_success() {
        let user_propensity: Propensity = response
            .json()
            .await
            .expect("Failed to parse response JSON");

        Ok(Json(user_propensity))
    } else {
        Err((StatusCode::BAD_REQUEST, "Failed to fetch OCID"))
    }
}
