from sqlalchemy import or_
from sqlalchemy.orm import joinedload
import datetime
import requests
import os

from .entities import *
from . import Session


class SilegModel:

    usuarios_url = os.environ['USER_REST_URL']

    @staticmethod
    def api(api):
        r = requests.get(api)
        if not r.ok:
            return None
        return r.json()


    @classmethod
    def usuarios(cls, usuario=None, dni=None, offset=None, limit=None):
        session = Session()
        try:
            usr = None
            if dni and not usuario:
                usr = cls.api(cls.usuarios_url + '/usuarios/?d=' + dni)
                if not usr:
                    return []
                usr = usr[0]

            q = session.query(Usuario)
            q = q.filter(Usuario.id == usuario) if usuario else q
            q = q.filter(Usuario.id == usr['id']) if usr else q
            q = cls._agregar_filtros_comunes(q, offset=offset, limit=limit)
            usuarios = []
            for u in q:
                if not usr:
                    usr = cls.api(cls.usuarios_url + '/usuarios/' + u.id)
                if not usr:
                    continue
                usuarios.append({
                    'usuario':usr,
                    'sileg':u
                })
                usr = None
            return usuarios
        finally:
            session.close()

    @classmethod
    def _agregar_filtros_comunes(cls, q, persona=None, lugar=None, offset=None, limit=None):
        q = q.filter(Designacion.usuario_id == persona) if persona else q
        q = q.filter(Designacion.lugar_id == lugar) if lugar else q
        q = q.offset(offset) if offset else q
        q = q.limit(limit) if limit else q
        return q

    @classmethod
    def prorrogas(cls, designacion,
                    persona=None,
                    lugar=None,
                    historico=False,
                    offset=None, limit=None):

        session = Session()
        try:
            q = Designacion.find(session)
            q = q.filter(Designacion.designacion_id == designacion, Designacion.tipo == 'prorroga')

            if not historico:
                ahora = datetime.datetime.now().date()
                q = q.filter(or_(Designacion.hasta == None, Designacion.hasta >= ahora))

            q = cls._agregar_filtros_comunes(q, persona, lugar, offset, limit)
            q = q.options(joinedload('usuario'), joinedload('lugar'), joinedload('cargo'))
            q = q.order_by(Designacion.desde.desc())
            return q.all()

        finally:
            session.close()

    @classmethod
    def designaciones(cls,
                    offset=None, limit=None,
                    persona=None,
                    lugar=None,
                    historico=False):
        session = Session()

        q = Designacion.find(session)
        q = q.filter(Designacion.designacion_id == None, Designacion.tipo == 'original')

        if not historico:
            ahora = datetime.datetime.now().date()
            q = q.filter(or_(Designacion.hasta == None, Designacion.hasta >= ahora))

        q = cls._agregar_filtros_comunes(q, offset, limit, persona, lugar)
        #q = q.options(joinedload('usuario'), joinedload('cargo'))
        #q = q.options(joinedload('lugar').joinedload('padre'))
        q = q.order_by(Designacion.desde.desc())
        return q.all()


    @classmethod
    def cargos(cls):
        session = Session()
        try:
            return session.query(Cargo).all()
        finally:
            session.close()

    @classmethod
    def lugares(cls):
        session = Session()
        try:
            return Lugar.find(session).all()
        finally:
            session.close()

    @classmethod
    def departamentos(cls):
        session = Session()
        try:
            return Departamento.find(session).all()
        finally:
            session.close()


    @classmethod
    def materias(cls, materia=None, catedra=None, departamento=None):
        session = Session()
        try:
            q = Materia.find(session)
            q = q.filter(Materia.id == materia) if materia else q
            q = q.join(Catedra).filter(Catedra.id == catedra) if catedra else q
            q = q.join(Catedra).filter(Catedra.padre_id == departamento) if departamento else q
            return q.all()
        finally:
            session.close()

    @classmethod
    def catedras(cls, catedra=None, materia=None, departamento=None):
        session = Session()
        try:
            q = Catedra.find(session)
            q = q.filter(Catedra.id == catedra) if catedra else q
            q = q.filter(Catedra.materia_id == materia) if materia else q
            q = q.filter(Catedra.padre_id == departamento) if departamento else q
            return q.options(joinedload('materia'), joinedload('padre')).all()
        finally:
            session.close()
