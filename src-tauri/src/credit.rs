// use rusqlite::params;
// use crate::db::get_connection;

// #[tauri::command]
// pub fn add_credit(customer_name: String, product: String, amount: f64) -> Result<(), String> {
//     let conn = get_connection().map_err(|e| e.to_string())?;

//     conn.execute(
//         "INSERT INTO credit (customer_name, product, amount, paid) VALUES (?1, ?2, ?3, 0)",
//         params![customer_name, product, amount],
//     ).map_err(|e| e.to_string())?;

//     Ok(())
// }

// #[tauri::command]
// pub fn pay_credit(id: i32) -> Result<(), String> {
//     let conn = get_connection().map_err(|e| e.to_string())?;

//     conn.execute(
//         "UPDATE credit SET paid = 1 WHERE id = ?1",
//         params![id],
//     ).map_err(|e| e.to_string())?;

//     Ok(())
// }