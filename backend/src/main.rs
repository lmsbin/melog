use axum::{
    Router, extract::Extension, http::StatusCode, response::Json, routing::get, routing::post,
};
use chrono::{Duration, Utc};
use chrono_tz::Asia::Seoul;
use once_cell::sync::Lazy;
use reqwest::{Client, header};
use serde::{Deserialize, Serialize};
use std::sync::{Arc, Mutex};

#[derive(Serialize, Deserialize, Debug)]
struct UserData {
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
struct UserOcid {
    ocid: String,
}

#[derive(Serialize, Deserialize, Clone)]
#[serde(rename_all = "camelCase")]
struct Character {
    nick_name: String,
}

struct API {
    key: Mutex<String>,
}

// 전역 변수 선언 (Mutex로 안전하게 보호)
static GLOBAL_OCID: Lazy<Mutex<Option<UserOcid>>> = Lazy::new(|| Mutex::new(None));

#[tokio::main]
async fn main() {
    let args: Vec<String> = std::env::args().collect();

    if args.len() < 2 {
        println!("사용법: cargo run <arg>");
        return;
    }

    let api_key = Arc::new(API {
        key: Mutex::new(args[1].clone()),
    });

    let app = Router::new()
        .route("/getOcid", post(get_ocid))
        .route("/getUserInfo", get(get_user_info))
        .layer(Extension(api_key));

    let listener = tokio::net::TcpListener::bind("0.0.0.0:3000").await.unwrap();
    axum::serve(listener, app).await.unwrap();
}

async fn get_ocid(
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
        let mut global_ocid = GLOBAL_OCID.lock().unwrap();
        *global_ocid = Some(userocid.clone());

        Ok(Json(userocid))
    } else {
        Err((StatusCode::BAD_REQUEST, "Failed to fetch OCID"))
    }
}

async fn get_user_info(
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
        "{ocid}".to_string(),
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
