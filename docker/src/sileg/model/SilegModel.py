import os
from sqlalchemy import create_engine
from sqlalchemy.schema import CreateSchema
from sqlalchemy.orm import sessionmaker, joinedload

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

    @classmethod
    def designaciones(cls, offset=None, limit=None):
        session = Session()
        q = Designacion.find(session)
        q = q.offset(offset) if offset else q
        q = q.limit(limit) if limit else q
        return q.all()

    @classmethod
    def lugares(cls):
        session = Session()
        return Lugar.find(session).all()

    @classmethod
    def departamentos(cls):
        session = Session()
        return Departamento.find(session).all()

    @classmethod
    def materias(cls, departamento=None):
        session = Session()
        q = Catedra.find(session)
        q = q.filter(Catedra.padre_id == departamento) if departamento else q
        return q.options(joinedload('materia')).all()
