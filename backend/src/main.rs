mod api;

use api::character::{
    API, get_ocid, get_user_default_info, get_user_hyper_stat_info, get_user_propensity,
    get_user_stat_info,
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

    let app = Router::new()
        .route("/getOcid", post(get_ocid))
        .route("/getUserInfo", get(get_user_default_info))
        .route("/getUserStatInfo", get(get_user_stat_info))
        .route("/getUserHyperStatInfo", get(get_user_hyper_stat_info))
        .route("/getUserPropensity", get(get_user_propensity))
        .layer(Extension(api_key));

    let listener = tokio::net::TcpListener::bind("0.0.0.0:3000").await.unwrap();
    axum::serve(listener, app).await.unwrap();
}
