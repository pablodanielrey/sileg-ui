from sqlalchemy import or_
from sqlalchemy.orm import joinedload
import datetime
import requests
import os

from .entities import *
from . import Session


class SilegModel:

    usuarios_url = os.environ['USERS_API_URL']

    @staticmethod
    def api(api):
        r = requests.get(api)
        if not r.ok:
            return None
        return r.json()

    @classmethod
    def usuario(cls, uid, retornarClave=False):
        query = cls.usuarios_url + '/usuarios/' + uid
        query = query + '?c=True' if retornarClave else query
        usr = cls.api(query)
        if not usr:
            return []

        session = Session()
        try:
            susr = session.query(Usuario).filter(Usuario.id == uid).one_or_none()
            if susr:
                return {
                    'usuario': usr,
                    'sileg': susr
                }
            else:
                return {
                    'usuario': usr
                }

        finally:
            session.close()


    @classmethod
    def usuarios(cls, search=None, retornarClave=False, offset=0, limit=10):
        if search is None:
            return []

        query = cls.usuarios_url + '/usuarios/?q=' + search
        query = query + '&c=True' if retornarClave else query
        query = query + '&offset={}'.format(offset) if offset else query
        query = query + '&limit={}'.format(limit) if limit else query
        usrs = cls.api(query)
        if not usrs:
            return []

        session = Session()
        try:
            rusers = []
            for u in usrs:
                uid = u['id']
                surs = session.query(Usuario).filter(Usuario.id == uid).one_or_none()
                if surs:
                    rusers.append({
                        'usuario': u,
                        'sileg': surs
                    })
                else:
                    rusers.append({
                        'usuario': u
                    })
            return rusers

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
