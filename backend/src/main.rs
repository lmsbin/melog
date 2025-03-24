mod api;

use api::character::{
    API, get_ocid, get_user_ability, get_user_characeter_link_skill, get_user_characeter_skill,
    get_user_default_info, get_user_dojang, get_user_hexa_matrix, get_user_hyper_stat_info,
    get_user_propensity, get_user_set_effect, get_user_stat_info, get_user_symbol_equipment,
    get_user_v_matrix,
};
use axum::{Router, extract::Extension, routing::get, routing::post};
use std::sync::{Arc, Mutex};

#[tokio::main]
async fn main() {
    let args: Vec<String> = std::env::args().collect();

    if args.len() < 2 {
        println!("사용법: cargo run <arg>");
        return;
    }

    let api_key = Arc::new(API {
        key: Mutex::new(args[1].clone()),
        ocid: Mutex::new("".to_string()),
    });

    // TODO : VEC 형식으로 가져오는 값 자체가 null인 경우 예외처리 하기
    let app = Router::new()
        .route("/getOcid", post(get_ocid))
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
        .layer(Extension(api_key));

    let listener = tokio::net::TcpListener::bind("0.0.0.0:3000").await.unwrap();
    axum::serve(listener, app).await.unwrap();
}
