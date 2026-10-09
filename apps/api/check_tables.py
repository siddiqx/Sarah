import sqlite3; conn=sqlite3.connect(\ test.db\); c=conn.cursor(); c.execute(\SELECT name FROM sqlite_master WHERE type=\table\\); print([x[0] for x in c.fetchall()]); conn.close()
