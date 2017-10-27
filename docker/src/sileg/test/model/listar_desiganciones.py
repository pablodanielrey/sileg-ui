import sys
import logging
logging.getLogger().setLevel(logging.INFO)
import os
import json
from sqlalchemy import create_engine
from sqlalchemy.schema import CreateSchema
from sqlalchemy.orm import sessionmaker, joinedload

from model_utils import Base

from sileg.model.entities import Usuario, Designacion, Cargo, Lugar


def resolverUltima(d):
    did = d.id
    desig = s.query(Designacion).filter(Designacion.id == did).options(joinedload('designacion')).one()
    if desig.designacion == None:
        return desig
    else:
        return resolverUltima(d.designacion)


if __name__ == '__main__':

    if len(sys.argv) <= 1:
        sys.exit(1)

    engine = create_engine('postgresql://{}:{}@{}:5432/{}'.format(
        os.environ['SILEG_DB_USER'],
        os.environ['SILEG_DB_PASSWORD'],
        os.environ['SILEG_DB_HOST'],
        os.environ['SILEG_DB_NAME']
    ), echo=False)
    Session = sessionmaker(bind=engine)
    s = Session()

    """
    logging.info('------------------------------------------')
    ''' listo las designaciones con sus datos asociados '''
    for l in s.query(Designacion).all():
        logging.info(l.__json__())
        logging.info(l.cargo.__json__())
        logging.info(l.lugar.__json__())
        logging.info(l.usuario.__json__())
    """

    """
    logging.info('------------------------------------------')
    ''' listo los usuarios con sus designaciones '''
    for u in s.query(Usuario).all():
        logging.info('\n\n-------------------------------------\n\n')
        juser = json.loads(u.resolveUser())
        user = juser['nombre'] + ' ' + juser['apellido']
        logging.info(u.resolveUser())
        #logging.info(u.__json__())
        for d in u.designaciones:
            logging.info(d.cargo.nombre)
            logging.info(d.__json__())
        logging.info('\n\n-------------------------------------\n\n')
    """

    """
    logging.info('------------------------------------------')
    ''' listo los usuarios con sus cargos '''
    for u in s.query(Usuario).all():
        logging.info(u.__json__())
        for d in u.designaciones:
            logging.info(d.cargo.__json__())
    """


    logging.info('------------------------------------------')
    ''' listo los usuarios con sus designaciones '''
    for u in s.query(Usuario).options(joinedload('designaciones')).all():
        logging.info('\n\n-------------------------------------\n\n')
        juser = u.resolveUser()
        user = juser['dni'] + ' ' + juser['nombre'] + ' ' + juser['apellido']
        logging.info(user)
        #logging.info(u.__json__())
        for d in u.designaciones:
            logging.info("""{:10};{:50};{};{}""".format(
                d.cargo.nombre,
                d.lugar.getNombre if d.lugar else '',
                d.desde,
                d.hasta))
        logging.info('\n\n-------------------------------------\n\n')
