

"""
    consultas a la base vieja. se sacan los datos de conexion desde :

    SILEG_VIEJO_DB_USER
    SILEG_VIEJO_DB_PASSWORD
    SILEG_VIEJO_DB_NAME
    SILEG_VIEJO_DB_HOST

    se usa psycopg2 para conectarse a la base vieja
    usar SilegModel para generar los cargos.

"""


import sys
import logging
logging.getLogger().setLevel(logging.INFO)
import os
from sqlalchemy import create_engine
from sqlalchemy.schema import CreateSchema
from sqlalchemy.orm import sessionmaker

from model_utils import Base

from sileg.model import SilegModel
from sileg.model.entities import Usuario, Designacion, Cargo, Lugar


if __name__ == '__main__':

    engine = create_engine('postgresql://{}:{}@{}:5432/{}'.format(
        os.environ['SILEG_DB_USER'],
        os.environ['SILEG_DB_PASSWORD'],
        os.environ['SILEG_DB_HOST'],
        os.environ['SILEG_DB_NAME']
    ), echo=False)
    Session = sessionmaker(bind=engine)
    s = Session()



    host = os.environ['SILEG_VIEJO_DB_HOST']
    db = os.environ['SILEG_VIEJO_DB_NAME']
    duser = os.environ['SILEG_VIEJO_DB_USER']
    dbpass = os.environ['SILEG_VIEJO_DB_PASSWORD']
    conn = psycopg2.connect(host=host, db=db, user=dbuser, password=dbpass)
    try:
        cur = conn.cursor()
        try:
            cur.execute('select * from designacion_docente')
            for d in cur:

                cargo = s.query(Cargo).filter_by(name=d[0]).first()

                des = Designation(usuario=u, cargo=cargo, )
                s.add(des)

                s.commit()

        finally:
            cur.close()
    finally:
        conn.close()
