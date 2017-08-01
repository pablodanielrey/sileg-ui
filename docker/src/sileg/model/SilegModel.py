from sqlalchemy import or_
from sqlalchemy.orm import joinedload
import datetime

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
    def designaciones(cls,
                    offset=None, limit=None,
                    persona=None,
                    lugar=None,
                    historico=False):
        session = Session()
        q = Designacion.find(session)
        if not historico:
            ahora = datetime.datetime.now().date()
            q = q.filter(Designacion.desde <= ahora, Designacion.hasta >= ahora)
        q = q.filter(Designacion.usuario_id == persona) if persona else q
        q = q.filter(Designacion.lugar_id == lugar) if lugar else q
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
