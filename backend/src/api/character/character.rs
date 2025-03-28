use crate::api::character::request::API;

use axum::Extension;
use axum::{
    http::{HeaderMap, StatusCode},
    response::Json,
};
use reqwest::{Client, header};
use serde::{Deserialize, Serialize};
use std::sync::Arc;

#[derive(Serialize, Deserialize, Clone)]
pub struct UserOcid {
    ocid: String,
}

#[derive(Serialize, Deserialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct Character {
    nick_name: String,
}

pub async fn get_ocid(
    Extension(api_key): Extension<Arc<API>>,
    header: HeaderMap,
    Json(character): Json<Character>,
) -> Result<Json<UserOcid>, (StatusCode, &'static str)> {
    let uuid = header
        .get("uuid")
        .and_then(|value| value.to_str().ok())
        .ok_or((StatusCode::BAD_REQUEST, "Missing or invalid uuid header"))?;

    let client = Client::new();

    // 요청할 API의 URL
    let url = format!(
        "https://open.api.nexon.com/maplestory/v1/id?character_name={}",
        character.nick_name
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
        let userocid: UserOcid = response
            .json()
            .await
            .expect("Failed to parse response JSON");

        // 전역 변수 업데이트
        api_key.set_ocid_uuid(uuid.to_string(), userocid.ocid.clone());

        Ok(Json(userocid))
    } else {
        Err((StatusCode::BAD_REQUEST, "Failed to fetch OCID"))
    }
}

// TODO : 캐시 사용자 착용 아이템 정보
// TODO : 장착 헤어, 성형, 피부 정보 조회
// TODO : 장착 안드로이드 조회
// TODO : 장착 펫 정보 조회

// TODO : Hexa 매트릭스 설정 정보 조회
