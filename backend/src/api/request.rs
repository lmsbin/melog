use crate::api::character::{
    user_ability::get_user_ability, user_android_equipment::get_user_android_equipment,
    user_characeter_skill::get_user_characeter_link_skill,
    user_characeter_skill::get_user_characeter_skill, user_default_info::get_user_default_info,
    user_dojang::get_user_dojang, user_hexa_matrix::get_user_hexa_matrix,
    user_hyper_stat_info::get_user_hyper_stat_info, user_item_equipment::get_user_item_equipment,
    user_propensity::get_user_propensity, user_set_effect::get_user_set_effect,
    user_stat_info::get_user_stat_info, user_symbol_equipment::get_user_symbol_equipment,
    user_v_matrix::get_user_v_matrix,
};
use axum::{
    Json, Router,
    http::StatusCode,
    response::IntoResponse,
    routing::{get, post},
};
use serde::Serialize;

#[derive(Serialize)]
struct ErrorResponse {
    message: &'static str,
}

async fn fallback() -> impl IntoResponse {
    (
        StatusCode::BAD_REQUEST,
        Json(ErrorResponse {
            message: "Not Found",
        }),
    )
}

pub fn user_routes() -> Router {
    Router::new()
        .route("/getUserInfo", get(get_user_default_info))
        .route("/getUserStatInfo", get(get_user_stat_info))
        .route("/getUserHyperStatInfo", get(get_user_hyper_stat_info))
        .route("/getUserPropensity", get(get_user_propensity))
        .route("/getUserAbility", get(get_user_ability))
        .route("/getUserSymbolEquipment", get(get_user_symbol_equipment))
        .route("/getUserSetEffect", get(get_user_set_effect))
        .route("/getUserCharacterSkill", post(get_user_characeter_skill))
        .route(
            "/getUserCharacterLinkSkill",
            get(get_user_characeter_link_skill),
        )
        .route("/getUserVMatrix", get(get_user_v_matrix))
        .route("/getUserHexaMatrix", get(get_user_hexa_matrix))
        .route("/getUserDojang", get(get_user_dojang))
        .route("/getUserItemEquipment", get(get_user_item_equipment))
        .route("/getUserAndroidEquipment", get(get_user_android_equipment))
        .fallback(fallback)
}
