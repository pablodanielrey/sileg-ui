

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
import psycopg2

    
    
def departamento(con, data):
    #definir "place" del tipo "departamento" a partir del campo dpto_nombre
    if(data["dpto_nombre"] is not None):
        lugar = Lugar()
        lugar.nombre = data["dpto_nombre"]
        #lugar.tipo = "Centro Universitario" if any(x in data["dpto_nombre"].lower() for x in ["c.u", "c. u"]) else "Departamento"
        
        lugar.id = place.findByUnique(con = con, description = place.description, type = place.type)
        
        

    return None


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
    
    
    host = os.environ['SILEG_OLD_DB_HOST']
    dbname = os.environ['SILEG_OLD_DB_NAME']
    user = os.environ['SILEG_OLD_DB_USER']
    password = os.environ['SILEG_OLD_DB_PASSWORD']
    conn = psycopg2.connect(host=host, dbname=dbname, user=user, password=password)
    try:
        cur = conn.cursor()
        try:
            cur.execute('''
              SELECT dpto_id, dpto_nombre FROM departamento;
            ''')
            for d in cur:
                if(data["dpto_nombre"] is not None):
                   print(data["dpto_nombre"])
                #cargo = s.query(Cargo).filter_by(name=d[0]).first()
                #des = Designation(usuario=u, cargo=cargo, )
                #s.add(des)
                #s.commit()

        finally:
            cur.close()
    finally:
        conn.close()
    
    
    
