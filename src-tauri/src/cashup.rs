// use rusqlite::params;
// use crate::db::get_connection;

// #[tauri::command]
// pub fn cash_up(total: f64) -> Result<(), String> {
//     let conn = get_connection().map_err(|e| e.to_string())?;

//     conn.execute(
//         "INSERT INTO cashups (total) VALUES (?1)",
//         params![total],
//     )
//     .map_err(|e| e.to_string())?;

//     Ok(())
// }

// #[tauri::command]
// pub fn reset_sales() -> Result<(), String> {
//     let conn = get_connection().map_err(|e| e.to_string())?;

//     conn.execute("DELETE FROM sales", [])
//         .map_err(|e| e.to_string())?;

//     Ok(())
// }