import aiosqlite
from datetime import datetime
import os

DB_PATH = "/data/timer.db"  # SQLite database path (Render supports writing to /data)

# Initialize the database and create the table if it doesn't exist
async def init_db():
    os.makedirs("/data", exist_ok=True)  # Ensure /data directory exists
    async with aiosqlite.connect(DB_PATH) as db:
        await db.execute("""
            CREATE TABLE IF NOT EXISTS query_limit (
                id INTEGER PRIMARY KEY,
                last_query_time TEXT
            )
        """)  # Create table to store last query time
        await db.commit()

# Save the current query time (called on successful trigger)
async def save_query_time():
    now = datetime.utcnow().isoformat()  # Get current UTC time as ISO string
    async with aiosqlite.connect(DB_PATH) as db:
        await db.execute("DELETE FROM query_limit")  # Remove existing entry (only store one)
        await db.execute("INSERT INTO query_limit (last_query_time) VALUES (?)", (now,))
        await db.commit()

# Retrieve the last recorded query time
async def get_last_query_time():
    async with aiosqlite.connect(DB_PATH) as db:
        async with db.execute("SELECT last_query_time FROM query_limit") as cursor:
            row = await cursor.fetchone()
            if row:
                return datetime.fromisoformat(row[0])  # Convert ISO string to datetime object
    return None  # If no record found
