
import sys
import logging
logging.getLogger().setLevel(logging.INFO)
import os
import psycopg2

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from sileg.model.entities import Departamento


engine = create_engine('postgresql://{}:{}@{}:5432/{}'.format(
    os.environ['SILEG_DB_USER'],
    os.environ['SILEG_DB_PASSWORD'],
    os.environ['SILEG_DB_HOST'],
    os.environ['SILEG_DB_NAME']
), echo=True)




"""
from sqlalchemy import create_engine
from sqlalchemy.schema import CreateSchema
from sqlalchemy.orm import sessionmaker

from model_utils import Base

from sileg.model import SilegModel
from sileg.model.entities import Usuario, Designacion, Cargo, Lugar
"""

if __name__ == '__main__':

    """conexion con la base antigua del sileg """
    Session = sessionmaker(bind=engine)
    session = Session();
    
    host = os.environ['SILEG_OLD_DB_HOST']
    dbname = os.environ['SILEG_OLD_DB_NAME']
    user = os.environ['SILEG_OLD_DB_USER']
    password = os.environ['SILEG_OLD_DB_PASSWORD']
    conn = psycopg2.connect(host=host, dbname=dbname, user=user, password=password)
    try:
        cur = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
        try:
            cur.execute('''
              SELECT dpto_id, dpto_nombre FROM departamento;
            ''')
            for d in cur:
                if(d["dpto_nombre"] is not None):
                    departamento = Departamento(nombre=d["dpto_nombre"])
                    session.add(departamento)
                    session.commit()

        finally:
            cur.close()
    finally:
        conn.close()
    
    
    
