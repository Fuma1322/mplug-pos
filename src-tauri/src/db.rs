use rusqlite::{Connection, Result};
use std::path::PathBuf;

pub fn get_connection() -> Result<Connection, rusqlite::Error> {
    let mut path = dirs::data_dir().unwrap_or(std::env::current_dir().unwrap());
    path.push("mplug-pos");
    std::fs::create_dir_all(&path).unwrap();
    path.push("pos.db");

    println!("USING PRODUCTION DB: {:?}", path);

    let conn = Connection::open(path)?;

    conn.execute("PRAGMA foreign_keys = ON;", [])?;
    // conn.execute("PRAGMA journal_mode = WAL;", [])?;
    conn.execute("PRAGMA synchronous = NORMAL;", [])?;

    // -----------------------------
    // PRODUCTS (Inventory)
    // -----------------------------
    conn.execute(
        "CREATE TABLE IF NOT EXISTS products (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            price REAL NOT NULL,
            stock INTEGER NOT NULL,
            min_stock INTEGER DEFAULT 0,
            created_at TEXT NOT NULL DEFAULT (datetime('now'))
        )",
        [],
    )?;

    // -----------------------------
    // SALES (Cash transactions)
    // -----------------------------
    conn.execute(
        "CREATE TABLE IF NOT EXISTS sales (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            total REAL NOT NULL,
            sale_type TEXT NOT NULL, -- CASH | CREDIT
            created_at TEXT DEFAULT CURRENT_TIMESTAMP
        )",
        [],
    )?;

    conn.execute(
        "CREATE INDEX IF NOT EXISTS idx_sales_created_at ON sales(created_at)",
        [],
    )?;

    // -----------------------------
    // CREDIT SYSTEM (Tabs / Debtors)
    // -----------------------------
    conn.execute(
        "CREATE TABLE IF NOT EXISTS credit (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            customer_name TEXT NOT NULL,
            product TEXT NOT NULL,
            amount REAL NOT NULL,
            paid INTEGER DEFAULT 0, -- 0 = unpaid, 1 = paid
            created_at TEXT DEFAULT CURRENT_TIMESTAMP
        )",
        [],
    )?;

    conn.execute(
        "CREATE INDEX IF NOT EXISTS idx_credit_paid ON credit(paid)",
        [],
    )?;

    // -----------------------------
    // CASH UPS (End of day)
    // -----------------------------
    conn.execute(
        "CREATE TABLE IF NOT EXISTS cashups (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            total REAL NOT NULL,
            created_at TEXT DEFAULT CURRENT_TIMESTAMP
        )",
        [],
    )?;

    conn.execute(
        "CREATE INDEX IF NOT EXISTS idx_cashups_created_at ON cashups(created_at)",
        [],
    )?;

    Ok(conn)
}