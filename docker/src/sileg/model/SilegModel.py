from sqlalchemy.orm import joinedload
from .entities import *
from . import Session
from .UsuariosModel import UsuariosModel



class UsuarioDatos:

    def __init__(self):
        self.nombre
        self.apellido
        self.correoInstitucional
        self.correoAlternativo


class SilegModel:

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
