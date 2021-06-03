from flask.cli import AppGroup
from .users import seed_users, undo_users
from .collections import seed_collections, undo_collections
from .quotes import seed_quotes, undo_quotes
from .collections_quotes import seed_collections_quotes, undo_collections_quotes
from .favorites import seed_favorites, undo_favorites
from .dislikes import seed_dislikes, undo_dislikes

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')

# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_collections()
    seed_quotes()
    seed_collections_quotes()
    seed_favorites()
    seed_dislikes()
    # Add other seed functions here

# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_collections()
    undo_quotes()
    undo_collections_quotes()
    undo_favorites()
    undo_dislikes()
    # Add other undo functions here
