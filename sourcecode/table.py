from flask import Flask, g
import sqlite3
from flask import Flask
app = Flask(__name__)
db_location = 'var/test.db'

def get_db():
        db = getattr(g, 'db', None)
        if db is None:
                db = sqlite3.connect(db_location)
                g.db = db
        return db
@app.teardown_appcontext
def close_db_connection(exception):
        db = getattr(g, 'db', None)
        if db is not None:
                db.close()
def mk_db():
        with app.app_context():
                db = get_db()
                with app.open_resource('scehma.sql', mode='r') as f:
                        db.cursor().executescript(f.read())
                db.commit()

Base = declarative_base()
########################################################################
class User(Base):
    """"""
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    username = Column(String)
    password = Column(String)

    #----------------------------------------------------------------------
    def __init__(self, username, password):
        """"""
        self.username = username
        self.password = password

DROP TABLE if EXISTS users

CREATE TABLE users(
    username text,
    password text,

);
