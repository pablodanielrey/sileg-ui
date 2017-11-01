import logging
logging.getLogger().setLevel(logging.DEBUG)

import sys
import os
from sqlalchemy import create_engine
from sqlalchemy.schema import CreateSchema
from sqlalchemy.orm import sessionmaker

from model_utils import Base

from sileg.model.entities import *

if __name__ == '__main__':

    engine = create_engine('postgresql://{}:{}@{}:5432/{}'.format(
        os.environ['SILEG_DB_USER'],
        os.environ['SILEG_DB_PASSWORD'],
        os.environ['SILEG_DB_HOST'],
        os.environ['SILEG_DB_NAME']
    ), echo=True)

    Session = sessionmaker(bind=engine)

    s = Session()

    with open('usuarios.csv','r') as f:
        for line in f:
            row = line.split(',')
            uid = row[0]
            dni = row[1]
            oficina = row[4]
            oficinaId = row[5].rstrip('\n')
            # logging.info("Procesando -> Dni: {} Oficina: {} id oficina: {}".format(dni, oficina, oficinaId))
            l = s.query(Lugar).filter(Lugar.id == oficinaId).one_or_none()

            # creo los lugares que no existen
            if l is None:
                logging.info('la oficina {} no existe'.format(oficina))

                if 'departamento' in oficina.strip().lower():
                    lugar = Departamento(nombre=oficina)
                    lugar.id = oficinaId
                    s.add(lugar)
                    s.commit()
                    logging.info("Se creo el departamento: {} id: {}".format(oficina, oficinaId))

                elif 'dirección' in oficina.strip().lower():
                    lugar = Direccion(nombre=oficina)
                    lugar.id = oficinaId
                    s.add(lugar)
                    s.commit()
                    logging.info("Se crea la dirección: {} id: {}".format(oficina, oficinaId))

                elif 'secretaría' in oficina.strip().lower():
                    lugar = Secretaria(nombre=oficina)
                    lugar.id = oficinaId
                    s.add(lugar)
                    s.commit()
                    logging.info("Se crea la secretaría: {} id: {}".format(oficina, oficinaId))
                else:
                    lugar = Lugar(nombre=oficina)
                    lugar.id = oficinaId
                    s.add(lugar)
                    s.commit()
                    logging.info("Se crea el lugar: {} id: {}".format(oficina, oficinaId))

            l = s.query(Lugar).filter(Lugar.id == oficinaId).one()

            print("==========================================================")
            cf = s.query(CumpleFunciones).one_or_none()
            print("==========================================================")
            if cf is None:
                print('No existe el cargo')
            else:
                print(cf.nombre)

            u = s.query(Usuario).filter(Usuario.id == uid).one_or_none()
            if u is None:
                logging.info('Creando al usuario {} con id {}'.format(row[2] + ', ' + row[3], uid))
                u = Usuario()
                u.id = uid
                s.add(u)
                s.commit()

            u = s.query(Usuario).filter(Usuario.id == uid).one()
