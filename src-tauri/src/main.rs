mod db;
mod inventory;
mod sales;

use inventory::{get_products, add_product, delete_product, update_product};
// use sales::{create_sale, reduce_stock};

fn main() {
    tauri::Builder::default()
        .setup(|_app| {
            let _ = db::get_connection();
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            get_products,
            add_product,
            delete_product,
            update_product
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}