import os
import aiohttp
import json
from datetime import datetime

# Upstash REST API credentials
REDIS_URL = os.environ.get('UPSTASH_REDIS_REST_URL')
REDIS_TOKEN = os.environ.get('UPSTASH_REDIS_REST_TOKEN')

# Session for sending requests to Upstash REST API
session = None

# Initialize HTTP session
def init_db():
    global session
    session = aiohttp.ClientSession()
    # Upstash REST API doesn't require creating table structures

# Close HTTP session
async def close_db():
    if session:
        await session.close()

# Execute Redis commands via REST API
async def execute_command(command, *args):
    if not session:
        init_db()
    
    url = f"{REDIS_URL}/{command}/{'/'.join(args)}"
    headers = {
        "Authorization": f"Bearer {REDIS_TOKEN}"
    }
    
    async with session.get(url, headers=headers) as response:
        if response.status == 200:
            result = await response.json()
            return result.get('result')
        else:
            error_text = await response.text()
            raise Exception(f"Redis REST API error: {error_text}")

# Save current query time
async def save_query_time():
    now = datetime.utcnow().isoformat()
    # Use SET command to save the time
    await execute_command('set', 'last_query_time', now)
    return True

# Get the last recorded query time
async def get_last_query_time():
    # Use GET command to retrieve the time
    time_str = await execute_command('get', 'last_query_time')
    if time_str:
        return datetime.fromisoformat(time_str)
    return None