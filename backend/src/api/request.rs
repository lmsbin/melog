use crate::api::{
    character::{
        character::get_ocid, user_ability::get_user_ability,
        user_android_equipment::get_user_android_equipment,
        user_cashitem_equipment::get_user_cash_item_equipment,
        user_characeter_skill::get_user_characeter_link_skill,
        user_characeter_skill::get_user_characeter_skill, user_default_info::get_user_default_info,
        user_dojang::get_user_dojang, user_hexa_matrix::get_user_hexa_matrix,
        user_hexa_matrix_stat::get_user_hexa_stat_info,
        user_hyper_stat_info::get_user_hyper_stat_info,
        user_item_equipment::get_user_item_equipment, user_propensity::get_user_propensity,
        user_ring_exchange_skill_equipment::get_user_ring_exchange_skill_equipment,
        user_set_effect::get_user_set_effect, user_stat_info::get_user_stat_info,
        user_symbol_equipment::get_user_symbol_equipment, user_v_matrix::get_user_v_matrix,
    },
    guild::{guild::get_guild_ocid, guild_default_info::get_guild_default_info},
    notice::{
        get_cash_shop_notice::get_cash_shop_notice, get_event_notice::get_event_notice,
        get_notice::get_notice, get_update_notice::get_update_notice,
    },
    ranking::{
        get_achievement_ranking::get_achievement_ranking, get_dojang_ranking::get_dojang_ranking,
        get_guild_ranking::get_guild_ranking, get_overall_ranking::get_over_all_ranking,
        get_theseed_ranking::get_theseed_ranking, get_union_ranking::get_union_ranking,
    },
    union::{
        get_union::get_user_union_info, get_union_artifact::get_user_union_artifact_info,
        get_union_champion::get_user_union_champion_info,
        get_union_raider::get_user_union_raider_info,
    },
};
use axum::{Json, Router, http::StatusCode, response::IntoResponse, routing::get, routing::post};
use serde::Serialize;

pub struct API {
    pub key: String,
}

impl API {
    // 생성자
    pub fn new(key: String) -> Self {
        Self { key }
    }
}

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

pub fn get_routes() -> Router {
    Router::new()
        .merge(user_routes())
        .merge(guild_route())
        .merge(notice_route())
        .merge(union_route())
        .merge(ranking_route())
        .fallback(fallback)
}

pub fn user_routes() -> Router {
    route_group(vec![
        ("/getOcid", post(get_ocid)),
        ("/getUserInfo", post(get_user_default_info)),
        ("/getUserStatInfo", post(get_user_stat_info)),
        ("/getUserHyperStatInfo", post(get_user_hyper_stat_info)),
        ("/getUserPropensity", post(get_user_propensity)),
        ("/getUserAbility", post(get_user_ability)),
        ("/getUserSymbolEquipment", post(get_user_symbol_equipment)),
        ("/getUserSetEffect", post(get_user_set_effect)),
        ("/getUserCharacterSkill", post(get_user_characeter_skill)),
        (
            "/getUserCharacterLinkSkill",
            post(get_user_characeter_link_skill),
        ),
        ("/getUserVMatrix", post(get_user_v_matrix)),
        ("/getUserHexaMatrix", post(get_user_hexa_matrix)),
        ("/getUserDojang", post(get_user_dojang)),
        ("/getUserItemEquipment", post(get_user_item_equipment)),
        ("/getUserAndroidEquipment", post(get_user_android_equipment)),
        (
            "/getUserCashItemEquipment",
            post(get_user_cash_item_equipment),
        ),
        ("/getUserHexStatInfo", post(get_user_hexa_stat_info)),
        (
            "/getUserRingExchangeSkillEquipment",
            post(get_user_ring_exchange_skill_equipment),
        ),
    ])
}

pub fn guild_route() -> Router {
    route_group(vec![
        ("/getGuildOcid", post(get_guild_ocid)),
        ("/getGuildInfo", post(get_guild_default_info)),
    ])
}

pub fn notice_route() -> Router {
    route_group(vec![
        ("/getNotice", get(get_notice)),
        ("/getUpdateNotice", get(get_update_notice)),
        ("/getEventNotice", get(get_event_notice)), // 오타 수정
        ("/getCashShopNotice", get(get_cash_shop_notice)),
    ])
}

pub fn union_route() -> Router {
    route_group(vec![
        ("/getUnion", post(get_user_union_info)),
        ("/getUnionRaider", post(get_user_union_raider_info)),
        ("/getUnionArtifact", post(get_user_union_artifact_info)),
        ("/getUnionChampion", post(get_user_union_champion_info)),
    ])
}

pub fn ranking_route() -> Router {
    route_group(vec![
        ("/getOverAllRanking", post(get_over_all_ranking)),
        ("/getUnionRanking", post(get_union_ranking)),
        ("/getGuildRanking", post(get_guild_ranking)),
        ("/getDojangRanking", post(get_dojang_ranking)),
        ("/getTheseedRanking", post(get_theseed_ranking)),
        ("/getAchievementRanking", post(get_achievement_ranking)),
    ])
}

fn route_group(routes: Vec<(&'static str, axum::routing::MethodRouter)>) -> Router {
    routes
        .into_iter()
        .fold(Router::new(), |router, (path, method)| {
            router.route(path, method)
        })
}
