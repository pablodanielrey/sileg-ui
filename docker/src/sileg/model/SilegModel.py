import os
from sqlalchemy import create_engine
from sqlalchemy.schema import CreateSchema
from sqlalchemy.orm import sessionmaker

from model_utils import Base

from sileg.model.entities import *

from sileg.model.UsuariosModel import UsuariosModel

engine = create_engine('postgresql://{}:{}@{}:5432/{}'.format(
    os.environ['SILEG_DB_USER'],
    os.environ['SILEG_DB_PASSWORD'],
    os.environ['SILEG_DB_HOST'],
    os.environ['SILEG_DB_NAME']
), echo=True)


Session = sessionmaker(bind=engine)

class UsuarioDatos:

    def __init__(self):
        self.nombre
        self.apellido
        self.correoInstitucional
        self.correoAlternativo


class SilegModel:

    @staticmethod
    def onlyKeys(d, keys):
        return {k: d[k] for k in keys}

    @classmethod
    def obtenerUsuarios(cls):

        s = Session()
        s.query(Usuarios)

    """
    @classmethod
    def designaciones(cls, render):
        session = Session()

        designaciones = Designacion.find(session, render)

        idsUsuarios = [d.usuario.id for d in designaciones]
        usuarios_ = UsuariosModel.usuariosByIds(idsUsuarios)

        usuarios = {}
        for u in usuarios_:
            usuarios[u["id"]] = u


        response = []
        for d in designaciones:
            u = usuarios[d.usuario.id]

            if d.lugar.tipo == "catedra":
                detalle = {"id":d.lugar.materia.id, "nombre":d.lugar.materia.nombre}
            else:
                detalle = {"id":d.lugar.padre.id, "nombre":d.lugar.padre.nombre} if d.lugar.padre else None

            r = {
              "usuario":{"id":u["id"], "nombres":u["name"], "apellidos":u["lastname"], "numero_documento":u["dni"]},
              "lugar":{"id":d.lugar.id, "nombre":d.lugar.nombre, "detalle":detalle},
              "cargo":{"id":d.cargo.id, "nombre":d.cargo.nombre},
              "desde":d.desde,
              "hasta":d.hasta,
              "historico":d.historico,
              "expediente":d.expediente,
              "resolucion":d.resolucion,
              "tipo":d.tipo
            }
            response.append(r)

        return response
    """

    @classmethod
    def designaciones(cls, limit=100):
        session = Session()
        designaciones = Designacion.find(session, limit=limit)
        return designaciones
