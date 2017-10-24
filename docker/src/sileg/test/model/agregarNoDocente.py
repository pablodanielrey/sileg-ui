import logging
logging.getLogger().setLevel(logging.DEBUG)

import sys
import os
from sqlalchemy import create_engine
from sqlalchemy.schema import CreateSchema
from sqlalchemy.orm import sessionmaker

from model_utils import Base

from sileg.model.entities import Lugar, Direccion, CumpleFunciones

if __name__ == '__main__':


    engine = create_engine('postgresql://{}:{}@{}:5432/{}'.format(
        os.environ['SILEG_DB_USER'],
        os.environ['SILEG_DB_PASSWORD'],
        os.environ['SILEG_DB_HOST'],
        os.environ['SILEG_DB_NAME']
    ), echo=True)

    Session = sessionmaker(bind=engine)

    s = Session()

    if len(sys.argv) <= 2:
        logging.warn('Debe especificar el id del lugar')
        for l in s.query(Lugar).all():
            logging.info(l.__json__())
        sys.exit(1)

    uid = sys.argv[1]
    lid = sys.argv[2]

    cf = s.query(CumpleFunciones).one_or_none()
    if not cf:
        cf = CumpleFunciones()
        s.add(cf)
        s.commit()

    cf = s.query(CumpleFunciones).one()

    l = s.query(Lugar.id == lid).one()

    u = s.query(Usuario.id == uid).one()

    d = Designacion()
    d.usuario = u
    d.cargo = cf
    d.lugar = l
    s.add(d)
    s.commit()

    for d in s.query(Designacion.usuario.id == uid).all():
        logging.info(d.__json__())
