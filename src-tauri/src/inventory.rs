use rusqlite::params;
use serde::Deserialize;
use serde::Serialize;
use crate::db::get_connection;

#[derive(Serialize)]
pub struct Product {
    pub id: String,
    pub name: String,
    pub price: f64,
    pub stock: i32,
    pub minStock: i32,
    pub created_at: String,
}

#[derive(Deserialize)]
pub struct UpdateProduct {
    id: String,
    name: String,
    price: f64,
    stock: i32,
    min_stock: i32,
}

#[tauri::command]
pub fn get_products() -> Result<Vec<Product>, String> {
    let conn = get_connection().map_err(|e| e.to_string())?;

    let mut stmt = conn
        .prepare(
            "SELECT id, name, price, stock, min_stock, created_at FROM products"
        )
        .map_err(|e| e.to_string())?;

    let products = stmt
        .query_map([], |row| {
            Ok(Product {
                id: row.get(0)?,
                name: row.get(1)?,
                price: row.get(2)?,
                stock: row.get(3)?,
                minStock: row.get(4)?,
                created_at: row.get::<_, String>(5).unwrap_or_default(),
            })
        })
        .map_err(|e| e.to_string())?;

    let mut result = Vec::new();

    for p in products {
        match p {
            Ok(product) => result.push(product),
            Err(e) => return Err(e.to_string()),
        }
    }

    Ok(result)
}

#[tauri::command]
pub fn add_product(
    name: String,
    price: f64,
    stock: i32,
    min_stock: i32,
) -> Result<(), String> {

    println!("1");

    let conn = get_connection().map_err(|e| e.to_string())?;

    println!("2");

    let id = uuid::Uuid::new_v4().to_string();

    println!("3");

    let result = conn.execute(
        "INSERT INTO products (id, name, price, stock, min_stock)
         VALUES (?1, ?2, ?3, ?4, ?5)",
        rusqlite::params![id, name, price, stock, min_stock],
    );

    println!("4");

    match result {
        Ok(rows) => {
            println!("Inserted {} row(s)", rows);
            Ok(())
        }
        Err(e) => {
            println!("SQL ERROR: {:?}", e);
            Err(e.to_string())
        }
    }
}

#[tauri::command]
pub fn update_product(data: UpdateProduct) -> Result<(), String> {
    let conn = get_connection().map_err(|e| e.to_string())?;

    conn.execute(
        "UPDATE products 
         SET name = ?1, price = ?2, stock = ?3, minStock = ?4
         WHERE id = ?5",
        rusqlite::params![
            data.name,
            data.price,
            data.stock,
            data.min_stock,
            data.id
        ],
    )
    .map_err(|e| e.to_string())?;

    Ok(())
}

#[tauri::command]
pub fn delete_product(id: String) -> Result<(), String> {
    let conn = get_connection().map_err(|e| e.to_string())?;

    conn.execute(
        "DELETE FROM products WHERE id = ?1",
        params![id],
    )
    .map_err(|e| e.to_string())?;

    Ok(())
}