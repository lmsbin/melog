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

pub async fn request_parser(api_key: Arc<API>, kind: &str) -> reqwest::Response {
    // 요청 헤더 정의
    let mut headers = header::HeaderMap::new();
    headers.insert(
        "x-nxopen-api-key",
        api_key.key.lock().unwrap().parse().unwrap(),
    );

    let now_time = (Utc::now() - Duration::days(1))
        .with_timezone(&Seoul)
        .format("%Y-%m-%d");

    let url = format!(
        "https://open.api.nexon.com/maplestory/v1/character/{}?ocid={}&date={}",
        kind,
        api_key.ocid.lock().unwrap().to_string(),
        now_time
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

pub async fn get_user_default_info(
    Extension(api_key): Extension<Arc<API>>,
) -> Result<Json<UserDefaultData>, (StatusCode, &'static str)> {
    // POST 요청 보내기
    let response = request_parser(api_key.clone(), "basic").await;

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

#[derive(Deserialize, Serialize, Debug)]
pub struct Stat {
    pub stat_name: String,
    pub stat_value: String,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct UserStatData {
    pub final_stat: Vec<Stat>,
}

pub async fn get_user_stat_info(
    Extension(api_key): Extension<Arc<API>>,
) -> Result<Json<UserStatData>, (StatusCode, &'static str)> {
    // POST 요청 보내기
    let response = request_parser(api_key.clone(), "stat").await;

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

pub async fn get_user_hyper_stat_info(
    Extension(api_key): Extension<Arc<API>>,
) -> Result<Json<UserHyperStatData>, (StatusCode, &'static str)> {
    // POST 요청 보내기
    let response = request_parser(api_key.clone(), "hyper-stat").await;

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

#[derive(Deserialize, Serialize, Debug)]
pub struct Propensity {
    pub charisma_level: i8,
    pub sensibility_level: i8,
    pub insight_level: i8,
    pub willingness_level: i8,
    pub handicraft_level: i8,
    pub charm_level: i8,
}

pub async fn get_user_propensity(
    Extension(api_key): Extension<Arc<API>>,
) -> Result<Json<Propensity>, (StatusCode, &'static str)> {
    // POST 요청 보내기
    let response = request_parser(api_key.clone(), "propensity").await;

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

#[derive(Deserialize, Serialize, Debug)]
pub struct AbilityInfo {
    pub ability_no: String,
    pub ability_grade: String,
    pub ability_value: String,
}

#[derive(Deserialize, Serialize, Debug)]
pub struct Ability {
    pub ability_grade: String,
    pub ability_info: Vec<AbilityInfo>,
}

pub async fn get_user_ability(
    Extension(api_key): Extension<Arc<API>>,
) -> Result<Json<Ability>, (StatusCode, &'static str)> {
    // POST 요청 보내기
    let response = request_parser(api_key.clone(), "ability").await;

    // 응답 결과 확인
    if response.status().is_success() {
        let user_ability: Ability = response
            .json()
            .await
            .expect("Failed to parse response JSON");

        Ok(Json(user_ability))
    } else {
        Err((StatusCode::BAD_REQUEST, "Failed to fetch OCID"))
    }
}

#[derive(Deserialize, Serialize, Debug)]
pub struct ItemEquipment {}

// TODO : 사용자 착용 아이템 정보
// pub async fn get_user_item_equipment(
//     Extension(api_key): Extension<Arc<API>>,
// ) -> Result<Json<ItemEquipment>, (StatusCode, &'static str)> {
//     // POST 요청 보내기
//     let response = request_parser(api_key.clone(), "item-equipment").await;

//     // 응답 결과 확인
//     if response.status().is_success() {
//         let user_ability: ItemEquipment = response
//             .json()
//             .await
//             .expect("Failed to parse response JSON");

//         Ok(Json(user_ability))
//     } else {
//         Err((StatusCode::BAD_REQUEST, "Failed to fetch OCID"))
//     }
// }

#[derive(Deserialize, Serialize, Debug)]
pub struct CashItemEquipment {}

// TODO : 캐시 사용자 착용 아이템 정보
// pub async fn get_user_cash_item_equipment(
//     Extension(api_key): Extension<Arc<API>>,
// ) -> Result<Json<CashItemEquipment>, (StatusCode, &'static str)> {
//     // POST 요청 보내기
//     let response = request_parser(api_key.clone(), "cashitem-equipment").await;

//     // 응답 결과 확인
//     if response.status().is_success() {
//         let user_ability: CashItemEquipment = response
//             .json()
//             .await
//             .expect("Failed to parse response JSON");

//         Ok(Json(user_ability))
//     } else {
//         Err((StatusCode::BAD_REQUEST, "Failed to fetch OCID"))
//     }
// }

#[derive(Deserialize, Serialize, Debug)]
pub struct SymbolInfo {
    pub symbol_name: String,
    pub symbol_icon: String,
    pub symbol_force: String,
    pub symbol_level: i8,
    pub symbol_str: String,
    pub symbol_dex: String,
    pub symbol_int: String,
    pub symbol_luk: String,
    pub symbol_hp: String,
    pub symbol_drop_rate: String,
    pub symbol_meso_rate: String,
    pub symbol_exp_rate: String,
    pub symbol_growth_count: i32,
    pub symbol_require_growth_count: i32,
}

#[derive(Deserialize, Serialize, Debug)]
pub struct Symbol {
    pub symbol: Vec<SymbolInfo>,
}

pub async fn get_user_symbol_equipment(
    Extension(api_key): Extension<Arc<API>>,
) -> Result<Json<Symbol>, (StatusCode, &'static str)> {
    // POST 요청 보내기
    let response = request_parser(api_key.clone(), "symbol-equipment").await;

    // 응답 결과 확인
    if response.status().is_success() {
        let user_symbol: Symbol = response
            .json()
            .await
            .expect("Failed to parse response JSON");

        Ok(Json(user_symbol))
    } else {
        Err((StatusCode::BAD_REQUEST, "Failed to fetch OCID"))
    }
}

#[derive(Deserialize, Serialize, Debug, Clone)]
pub struct SetEffectInfoFull {
    pub set_count: i8,
    pub set_option: String,
}

#[derive(Deserialize, Serialize, Debug, Clone)]
pub struct SetEffectInfo {
    pub set_name: String,
    pub total_set_count: i8,
    pub set_option_full: Vec<SetEffectInfoFull>,
}

#[derive(Deserialize, Serialize, Debug)]
pub struct SetEffect {
    pub set_effect: Vec<SetEffectInfo>,
}

pub async fn get_user_set_effect(
    Extension(api_key): Extension<Arc<API>>,
) -> Result<Json<SetEffect>, (StatusCode, &'static str)> {
    // POST 요청 보내기
    let response = request_parser(api_key.clone(), "set-effect").await;

    // 응답 결과 확인
    if response.status().is_success() {
        let user_effect: SetEffect = response
            .json()
            .await
            .expect("Failed to parse response JSON");

        let filtered_data = SetEffect {
            set_effect: user_effect
                .set_effect
                .into_iter()
                .filter_map(|set_info| {
                    let matched_options: Vec<SetEffectInfoFull> = set_info
                        .set_option_full
                        .into_iter()
                        .filter(|option| option.set_count == set_info.total_set_count)
                        .collect();

                    if matched_options.is_empty() {
                        None
                    } else {
                        Some(SetEffectInfo {
                            set_name: set_info.set_name,
                            total_set_count: set_info.total_set_count,
                            set_option_full: matched_options,
                        })
                    }
                })
                .collect(),
        };

        Ok(Json(filtered_data))
    } else {
        Err((StatusCode::BAD_REQUEST, "Failed to fetch OCID"))
    }
}
