use crate::api::character::request::{API, request_parser};

use axum::Extension;
use axum::{
    http::{HeaderMap, StatusCode},
    response::Json,
};
use serde::{Deserialize, Serialize};
use std::sync::Arc;

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
    header: HeaderMap,
) -> Result<Json<SetEffect>, (StatusCode, &'static str)> {
    // POST 요청 보내기
    let response = request_parser(api_key.clone(), header, "set-effect").await;

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
                        .filter(|option| option.set_count <= set_info.total_set_count)
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
