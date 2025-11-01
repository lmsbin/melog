mod api;

use api::request::API;
use api::request::get_routes;
use axum::{Router, extract::Extension, http::HeaderValue};
use std::env;
use std::sync::Arc;
use tower_http::cors::{Any, CorsLayer};

#[tokio::main]
async fn main() {
    let api_key = match env::args().nth(1).or_else(|| env::var("API_KEY").ok()) {
        Some(key) => key,
        None => {
            eprintln!("❌ API Key가 필요합니다. 사용법: cargo run <API_KEY> 또는 환경 변수로 설정");
            std::process::exit(1);
        }
    };

    let api_state = Arc::new(API::new(api_key));

    let allowed_origin = HeaderValue::from_static("http://localhost:5173");

    let cors = CorsLayer::new()
        .allow_origin(allowed_origin)
        .allow_methods([axum::http::Method::GET, axum::http::Method::POST])
        .allow_headers(Any);

    // TODO : VEC 형식으로 가져오는 값 자체가 null인 경우 예외처리 하기
    let app = Router::new()
        .merge(get_routes())
        .layer(Extension(api_state))
        .layer(cors);

    let listener = tokio::net::TcpListener::bind("0.0.0.0:3000").await.unwrap();
    axum::serve(listener, app).await.unwrap();
}
