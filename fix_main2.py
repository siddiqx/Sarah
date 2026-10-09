import pathlib; p = pathlib.Path('D:/02_Projects/Sarah/database/seeds/seed_curriculum.py'); c = p.read_text(); idx = c.find('async def main():'); c = c[:idx] + '''async def main():
    base_path = Path(__file__).parent.parent.parent / \
curriculum\

    phases_dir = base_path / \phases\
    days_dir = base_path / \days\
    topics_dir = base_path / \topics\
    lessons_dir = base_path / \lessons\
    assessments_dir = base_path / \assessments\

    from app.core.config import get_settings
    settings = get_settings()
    database_url = settings.DATABASE_URL.replace(\postgresql+psycopg2\, \postgresql+asyncpg\)

    print(f\Connecting
to
database...\)
    print(f\Database
URL:
database_url[:50]
...\)

    engine = create_async_engine(database_url, echo=False)
    async_session_maker = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    async with async_session_maker() as session:
        try:
            phase_map = await seed_phases(session, phases_dir)
            day_map = await seed_days(session, days_dir, phase_map)
            lesson_to_topic = await build_lesson_to_topic_map(topics_dir)
            topic_map = await seed_topics(session, topics_dir, lesson_to_topic)
            await update_topic_day_numbers(session, days_dir, topic_map)
            await seed_lessons(session, lessons_dir, topic_map, lesson_to_topic)
            await seed_assessments(session, assessments_dir)

            print(\\\nSeeding
completed
successfully!\)
        except Exception as e:
            print(f\ERROR:
e
\)
            await session.rollback()
            raise
        finally:
            await session.close()

    await engine.dispose()'''; p.write_text(c); print('Fixed')
