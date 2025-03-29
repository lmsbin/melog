mod api;

use api::character::{character::get_ocid, request::API};
use api::request::user_routes;
use axum::{Router, extract::Extension, http::HeaderValue, routing::post};
use std::sync::Arc;
use tower_http::cors::{Any, CorsLayer};

#[tokio::main]
async fn main() {
    let args: Vec<String> = std::env::args().collect();

    if args.len() < 2 {
        println!("사용법: cargo run <arg>");
        return;
    }

    let api_key = Arc::new(API::new(args[1].clone()));

    let allowed_origin = HeaderValue::from_static("http://localhost:5173");

    let cors = CorsLayer::new()
        .allow_origin(allowed_origin)
        .allow_methods([axum::http::Method::GET, axum::http::Method::POST])
        .allow_headers(Any);

    // TODO : VEC 형식으로 가져오는 값 자체가 null인 경우 예외처리 하기
    let app = Router::new()
        .route("/getOcid", post(get_ocid))
        .merge(user_routes())
        .layer(Extension(api_key))
        .layer(cors);

    let listener = tokio::net::TcpListener::bind("0.0.0.0:3000").await.unwrap();
    axum::serve(listener, app).await.unwrap();
}
