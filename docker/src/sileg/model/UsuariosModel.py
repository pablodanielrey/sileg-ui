import sys
import logging
logging.getLogger().setLevel(logging.INFO)
import os
import psycopg2
import psycopg2.extras


host = os.environ['SILEG_DB_HOST']
dbname = os.environ['SILEG_DB_NAME']
user = os.environ['SILEG_DB_USER']
password = os.environ['SILEG_DB_PASSWORD']




class UsuariosModel:

    @classmethod
    def usuariosByIds(cls, usuario=None):
        conn = psycopg2.connect(host=host, dbname=dbname, user=user, password=password)
        try:
            cur = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
            try:
                if usuario:
                    cur.execute('SELECT * FROM profile.users WHERE id = %s', (usuario,))
                else:
                    cur.execute('SELECT * FROM profile.users')
                return cur.fetchall()
            finally:
              cur.close()

        finally:
            conn.close()
