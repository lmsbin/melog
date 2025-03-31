use crate::api::character::request::{API, request_parser};

use super::character::UserOcid;

use axum::{Extension, http::StatusCode, response::Json};
use serde::{Deserialize, Serialize};
use std::sync::Arc;

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
    pub hyper_stat_preset_1_remain_point: i32,
    pub hyper_stat_preset_2: Vec<HyperStat>,
    pub hyper_stat_preset_2_remain_point: i32,
    pub hyper_stat_preset_3: Vec<HyperStat>,
    pub hyper_stat_preset_3_remain_point: i32,
}

pub async fn get_user_hyper_stat_info(
    Extension(api_key): Extension<Arc<API>>,
    Json(user_ocid): Json<UserOcid>,
) -> Result<Json<UserHyperStatData>, (StatusCode, &'static str)> {
    // POST 요청 보내기
    let response = request_parser(api_key.clone(), "hyper-stat", &user_ocid.ocid).await;

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
            hyper_stat_preset_1_remain_point: user_hyper_stat_data.hyper_stat_preset_1_remain_point,

            hyper_stat_preset_2: user_hyper_stat_data
                .hyper_stat_preset_2
                .into_iter()
                .filter(|stat| stat.stat_point.is_some() && stat.stat_increase.is_some())
                .collect(),
            hyper_stat_preset_2_remain_point: user_hyper_stat_data.hyper_stat_preset_2_remain_point,

            hyper_stat_preset_3: user_hyper_stat_data
                .hyper_stat_preset_3
                .into_iter()
                .filter(|stat| stat.stat_point.is_some() && stat.stat_increase.is_some())
                .collect(),
            hyper_stat_preset_3_remain_point: user_hyper_stat_data.hyper_stat_preset_3_remain_point,
        };

        Ok(Json(filtered_data))
    } else {
        Err((StatusCode::BAD_REQUEST, "Failed to fetch OCID"))
    }
}
