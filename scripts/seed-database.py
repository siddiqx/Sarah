#!/usr/bin/env python3
\"\"\"
Database Seeding Script

Loads development seed data into the database.
\"\"\"
import asyncio
import sys
from pathlib import Path

# Add parent directory to path
sys.path.insert(0, str(Path(__file__).parent.parent / 'apps' / 'api'))

from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from app.core.config import get_settings
from app.core.database import Base


async def seed_database():
    settings = get_settings()
    
    engine = create_async_engine(settings.DATABASE_URL, echo=True)
    async_session = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)
    
    # Create tables
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    
    # Read and execute seed SQL
    seed_file = Path(__file__).parent.parent / 'database' / 'seeds' / '01_dev_seed.sql'
    if seed_file.exists():
        sql = seed_file.read_text()
        async with async_session() as session:
            # Split by semicolon and execute each statement
            statements = [s.strip() for s in sql.split(';') if s.strip()]
            for stmt in statements:
                if stmt:
                    await session.execute(stmt)
            await session.commit()
        print('Seed data loaded successfully')
    else:
        print(f'Seed file not found: {seed_file}')
    
    await engine.dispose()


if __name__ == '__main__':
    asyncio.run(seed_database())
