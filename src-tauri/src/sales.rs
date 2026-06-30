// use rusqlite::params;
// use crate::db::get_connection;

// #[tauri::command]
// pub fn create_sale(total: f64, sale_type: String) -> Result<(), String> {
//     let conn = get_connection().map_err(|e| e.to_string())?;

//     conn.execute(
//         "INSERT INTO sales (total, sale_type) VALUES (?1, ?2)",
//         params![total, sale_type],
//     ).map_err(|e| e.to_string())?;

//     Ok(())
// }

// #[tauri::command]
// pub fn reduce_stock(product_id: String, qty: i32) -> Result<(), String> {
//     let conn = get_connection().map_err(|e| e.to_string())?;

//     conn.execute(
//         "UPDATE products SET stock = stock - ?1 WHERE id = ?2",
//         params![qty, product_id],
//     ).map_err(|e| e.to_string())?;

//     Ok(())
// }