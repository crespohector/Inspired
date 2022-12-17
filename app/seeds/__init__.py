from flask.cli import AppGroup
from .users import seed_users, undo_users
from .collections import seed_collections, undo_collections
from .quotes import seed_quotes, undo_quotes
from .collections_quotes import seed_collections_quotes, undo_collections_quotes
from .favorites import seed_favorites, undo_favorites

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')

# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():

    # In case that records are already defined in production db, then we want to remove them first.
    if environment == 'production':
        # Before seeding, truncate all tables prefixed with schema name
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.collections RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.quotes RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.collections_quotes RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.favorites RESTART IDENTITY CASCADE;")
        # Add a truncate command here for every table that will be seeded.
        db.session.commit()

    # Seed data
    seed_users()
    seed_collections()
    seed_quotes()
    seed_collections_quotes()
    seed_favorites()
    # Add other seed functions here

# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_collections()
    undo_quotes()
    undo_collections_quotes()
    undo_favorites()
    # Add other undo functions here
