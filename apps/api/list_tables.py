import os
os.environ['DATABASE_URL'] = 'sqlite+aiosqlite:///./test.db'
os.environ['SECRET_KEY'] = 'test-secret-key-for-development-only'
import app.models
from app.core.database import Base
print([t.name for t in Base.metadata.sorted_tables])
